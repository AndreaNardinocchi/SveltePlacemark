import axios from "axios";
import type { Placemark, Session, User } from "../types/placemark-types";
// import type Category from "../../../routes/category/Category.svelte";
import type { Category } from "../types/placemark-types";
// import { goto } from "$app/navigation";
import { category, currentCategories, currentPlacemarks, loggedInUser } from "$lib/runes.svelte";
import { computeByCountry, computeByVisited } from "./placemark-utils";

axios.defaults.withCredentials = true;

export const placemarkService = {
  baseUrl: "http://localhost:3000",

  // async signup(user: User): Promise<boolean> {
  //   try {
  //     const response = await axios.post(`${this.baseUrl}/api/users`, user);
  //     console.log("Signup response:", response.data); // Log full response to inspect
  //     return response.data.success === true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // },

  async signup(user: User): Promise<User | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      console.log("Signup response:", response.data); // Should contain _id and more
      return response.data; // Return the full user object
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
        email,
        password
      });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          email: response.data.email,
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        this.saveSession(session, email);
        await this.refreshPlacemarksInfo();
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async waitForCategoriesToLoad(): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        if (currentCategories.categories.length > 0) {
          resolve();
        } else {
          setTimeout(check, 50); // Poll every 50ms
        }
      };
      check();
    });
  },

  async refreshPlacemarksInfo() {
    const token = axios.defaults.headers.common["Authorization"];
    if (!token || !loggedInUser._id) {
      // this.restoreSession();
      // token = axios.defaults.headers.common["Authorization"];
      // await this.refreshPlacemarksInfo();
      console.warn("Session is not ready, skipping refresh");
      return;
    }

    console.log("Token:", loggedInUser.token);

    const allCategories = await this.getAllCategories(loggedInUser.token);
    currentCategories.categories = allCategories.filter((cat) => cat.userid === loggedInUser._id);

    // Wait until categories are loaded || This will bring about ISSUES WITH FIRST LOG IN AFTER SIGN UP
    // await this.waitForCategoriesToLoad();

    const categoryId = localStorage.getItem("categoryId");
    if (!categoryId) {
      console.warn("No categoryId in localStorage.");
      return;
    }

    const validCategory = currentCategories.categories.find((cat) => cat._id === categoryId);

    if (!validCategory) {
      console.warn("categoryId from localStorage is not valid.");
      return;
    }

    // ✅ Set global category state
    category.title = validCategory.title;
    category._id = validCategory._id;
    category.userId = validCategory.userid;
    category.image = validCategory.image;
    category.notes = validCategory.notes;

    const fetchedCategory = await this.getCategoryById(categoryId);
    if (!fetchedCategory?.placemarks) {
      console.warn("Could not retrieve placemarks for category.");
      return;
    }

    currentPlacemarks.placemarks = [...fetchedCategory.placemarks];
    console.log("Updated placemarks:", currentPlacemarks.placemarks);

    computeByCountry(currentPlacemarks.placemarks);
    computeByVisited(currentPlacemarks.placemarks);
  },

  // // This is a waiter for the category to load when refreshing the page
  // async waitForCategoriesToLoad(): Promise<void> {
  //   return new Promise((resolve) => {
  //     const check = () => {
  //       if (currentCategories.categories.length > 0) {
  //         resolve();
  //       } else {
  //         // https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
  //         setTimeout(check, 50); // Poll every 50ms
  //       }
  //     };
  //     check();
  //   });
  // },

  // async refreshPlacemarksInfo() {
  //   if (!loggedInUser.token || !loggedInUser._id) {
  //     console.warn("Session is not ready, skipping refresh");
  //     return;
  //   }
  //   console.log("Token:", loggedInUser.token);

  //   const allCategories = await this.getAllCategories(loggedInUser.token);

  //   // Retrieving the categories belonging to this user
  //   currentCategories.categories = allCategories.filter((cat) => cat.userid === loggedInUser._id);
  //   // Wait until categories are loaded
  //   await this.waitForCategoriesToLoad();

  //   const categoryId = localStorage.getItem("categoryId");
  //   const categoryTitle = localStorage.getItem("categoryTitle");
  //   if (!categoryId && !categoryTitle) {
  //     console.warn("No categoryId and categoryTitle in localStorage.");
  //     return;
  //   }

  //   // Retrieving the category of the page the user is in on the /category/[id]/ page after refresh, pulling it from the localStorage
  //   const thisUserCategory = currentCategories.categories.find((cat) => cat._id === categoryId);
  //   if (!thisUserCategory) {
  //     console.warn("categoryId from localStorage is not valid.");
  //     return;
  //   }

  //   // Retrieving placemarks from this user category
  //   if (thisUserCategory?.placemarks) {
  //     console.warn("Could not retrieve placemarks for category.");
  //     return;
  //   }

  //   // The spread operator is used to unpack elements from an array (or properties from an object) into another array or object.
  //   // Esssentially, it takes all placemarks from thisUserCategory.placemarks and assign a shallow copy of that array to currentPlacemarks.placemarks
  //   currentPlacemarks.placemarks = [...thisUserCategory.placemarks];
  //   console.log("Updated placemarks:", currentPlacemarks.placemarks);

  //   computeByCountry(currentPlacemarks.placemarks);
  //   computeByVisited(currentPlacemarks.placemarks);
  // },

  disconnect() {
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("placemark");
    localStorage.removeItem("categoryTitle");
    localStorage.removeItem("categoryId");
  },

  saveSession(session: Session, email: string) {
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    localStorage.placemark = JSON.stringify(loggedInUser);
  },

  async restoreSession() {
    const savedLoggedInUser = localStorage.placemark;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;

      // Ensure axios has the token again. If I remove it I won't be able to open the category page
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;

      const categoryTitle = localStorage.getItem("categoryTitle");
      if (categoryTitle) {
        console.log("Using stored categoryTitle:", categoryTitle);
      } else {
        console.log("No categoryId found. You may need to select one.");
      }

      // Refresh placemarks with no categoryId passed
      await this.refreshPlacemarksInfo(); // This method should now look for the categoryId internally
    }
  },

  clearSession() {
    currentCategories.categories = [];
    currentPlacemarks.placemarks = [];
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("placemark");
    localStorage.removeItem("categoryTitle");
    localStorage.removeItem("categoryId");
  },

  // This is the function to update the user, but it WON'T Work because of a CORS error
  async updateUser(updatedUser: User, token: string) {
    console.log(`This is the fetch: ${this.baseUrl}/api/users/${updatedUser._id}`);
    console.log(`Token: ${token}`);

    const response = await fetch(`${this.baseUrl}/api/users/${updatedUser._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify(updatedUser)
    });

    // Directly check if the response is ok and parse the JSON
    if (!response.ok) {
      // If not, throw an error with the status text
      const errorText = await response.text(); // Optionally, read the text to debug
      throw new Error(`Failed to update user: ${errorText}`);
    }

    // Since the response is OK, parse the JSON
    return await response.json();
  },

  // This is to delete a user by their user ID, but it WON'T Work because of a CORS error
  async deleteUser(userId: string): Promise<boolean> {
    try {
      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.error("No Authorization token found.");
        return false;
      }

      const response = await axios.delete(`${this.baseUrl}/api/users/${userId}`, {
        headers: {
          Authorization: token
        }
      });

      console.log("User deleted:", response.data);
      return response.data.success === true; // adjust if your API returns differently
    } catch (error: any) {
      if (error.response) {
        console.error("Error deleting user:", error.response.status, error.response.data);
      } else {
        console.error("Error deleting user:", error.message);
      }
      return false;
    }
  },

  // This is the function that enables the user to add a new category
  async addCategory(category: Category): Promise<Category | null> {
    try {
      const token = axios.defaults.headers.common["Authorization"];
      // The token verification will ensure the user is logged in
      if (!token) {
        this.restoreSession();
        await this.refreshPlacemarksInfo();
        console.log("User is not logged in. No Authorization token found.");
        return null;
      }

      /* Include the logged-in user's _id as the `userid` field, this will ensure the
      userid is being sent with the Request*/
      const categoryWithUserId = {
        ...category, // Spread existing category properties
        userid: loggedInUser._id // Add the `userid` field here
      };
      const response = await axios.post(`${this.baseUrl}/api/categories`, categoryWithUserId, {
        headers: {
          Authorization: token
        }
      });
      await this.refreshPlacemarksInfo();

      console.log("Category added:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Error adding category:", error.response.status, error.response.data);
      } else {
        console.error("Error adding category:", error.message);
      }
      return null;
    }
  },

  // This is to delete a category, we call in the category id to delete as a parameter
  async deleteCategory(categoryId: string): Promise<boolean> {
    try {
      // The token verification will ensure the user is logged in
      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        this.restoreSession();
        await this.refreshPlacemarksInfo();
        console.warn("No Authorization token found.");
        return false;
      }

      const response = await axios.delete(`${this.baseUrl}/api/categories/${categoryId}`, {
        headers: {
          Authorization: token
        }
      });
      await this.refreshPlacemarksInfo();

      console.log("Category deleted:", response.data);
      return response.data.success === true; // Adjust depending on your API response
    } catch (error: any) {
      if (error.response) {
        console.error("Error deleting category:", error.response.status, error.response.data);
      } else {
        console.error("Error deleting category:", error.message);
      }
      return false;
    }
  },

  // This is the function to retrieve all categories
  async getAllCategories(token: string): Promise<Category[]> {
    try {
      if (!token) {
        //   token = axios.defaults.headers.common["Authorization"];
        this.restoreSession();
        token = axios.defaults.headers.common["Authorization"];
        await this.refreshPlacemarksInfo();
      }

      const response = await axios.get(this.baseUrl + "/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  // This is to fetch all users, NEEDS REVISITING, but probably I will no longer needd it
  async getAllUsers(token: string): Promise<User[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/users");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  // This is to fetch a category by id, and we call in the id string
  async getCategoryById(id: string): Promise<Category | null> {
    try {
      // The token verification will ensure the user is logged in
      let token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        this.restoreSession();
        token = axios.defaults.headers.common["Authorization"];
        await this.refreshPlacemarksInfo();
        // console.warn("No Authorization token found.");
        // return null;
      }

      const response = await axios.get(`${this.baseUrl}/api/categories/${id}`, {
        headers: {
          Authorization: token
        }
      });

      console.log("Fetched category:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Error fetching category:", error.response.status, error.response.data);
      } else {
        console.error("Error fetching category:", error.message);
      }
      return null;
    }
  },

  // This is to retrieve all placemarks of a specific category, but it WON'T ALWAYS WORK
  async getPlacemarksByCategoryId(categoryId: string, token: string) {
    try {
      if (!categoryId) {
        console.error("No categoryId provided!");
        return [];
      }

      if (!token) {
        this.restoreSession();
        token = axios.defaults.headers.common["Authorization"];
        await this.refreshPlacemarksInfo();

        // console.warn("No Authorization token provided.");
        // return [];
      }

      const url = `${this.baseUrl}/api/categories/${categoryId}/placemarks`; // <- Correct endpoint based on RESTful design
      console.log("Requesting placemarks from URL:", url);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log(`Fetched placemarks for categoryId ${categoryId}:`, response.data);
        return response.data;
      } else {
        console.error(`Unexpected status code: ${response.status}`);
        return [];
      }
    } catch (error: any) {
      if (error.response) {
        console.error(
          `Error fetching placemarks for categoryId: ${categoryId}. Status: ${error.response.status}`,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response received while fetching placemarks:", error.request);
      } else {
        console.error("Unexpected error:", error.message);
      }
      return [];
    }
  },

  // This is to add a placemark to a category, and we pass in the category id and placemark object
  async addPlacemark(categoryId: string, placemark: Placemark): Promise<Placemark | null> {
    try {
      // The token verification will ensure the user is logged in
      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.warn("No Authorization token found.");
        return null;
      }

      const response = await axios.post(
        `${this.baseUrl}/api/categories/${categoryId}/placemarks`,
        placemark,
        {
          headers: {
            Authorization: token
          }
        }
      );
      await this.refreshPlacemarksInfo();

      console.log("Placemark added:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Error adding placemark:", error.response.status, error.response.data);
      } else {
        console.error("Error adding placemark:", error.message);
      }
      return null;
    }
  },

  // This is to delete a placemark, and we call in the placemark id
  async deletePlacemark(placemarkId: string): Promise<boolean> {
    try {
      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.warn("No Authorization token found.");
        return false;
      }

      const response = await axios.delete(`${this.baseUrl}/api/placemarks/${placemarkId}`, {
        headers: {
          Authorization: token
        }
      });
      await this.refreshPlacemarksInfo();

      console.log("Placemark deleted:", response.data);
      return response.data.success === true; // Adjust based on your backend response
    } catch (error: any) {
      if (error.response) {
        console.error("Error deleting placemark:", error.response.status, error.response.data);
      } else {
        console.error("Error deleting placemark:", error.message);
      }
      return false;
    }
  },

  async updatePlacemark(
    placemarkId: string,
    categoryId: string,
    placemark: unknown
  ): Promise<boolean> {
    try {
      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.warn("No Authorization token found.");
        return false;
      }

      console.log(
        `This is the placemark being updated: ${this.baseUrl}/api/category/${categoryId}/updateplacemark/${placemarkId}`
      );

      const response = await axios.post(
        `${this.baseUrl}/category/${categoryId}/updateplacemark/${placemarkId}`,
        placemark,
        {
          headers: {
            Authorization: token
          },
          withCredentials: true,
          maxRedirects: 0, // Prevent Axios from following redirects
          validateStatus: (status) => status >= 200 && status < 400 // Treat 3xx as successful
        }
      );

      // At this point, the update worked — backend is redirecting
      console.log("Placemark updated, redirecting manually...", response);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Error updating placemark:", error.response.status, error.response.data);
      } else {
        console.error("Unexpected error:", error.message);
      }
      return false;
    }
  },

  // This is to fetch a single placemark by its ID (and optionally the category ID, if your API requires it)
  async getPlacemarkById(categoryId: string, placemarkId: string) {
    try {
      let token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        this.restoreSession();
        token = axios.defaults.headers.common["Authorization"];
        await this.refreshPlacemarksInfo();
        console.warn("No Authorization token found.");
        return null;
      }
      //////////////////////// NEED TO CHECK WHY WE ARE NOT ADDING ${CATEGORYId} ////////////
      const url = `${this.baseUrl}/api/placemarks/${placemarkId}`;
      console.log(`Trying to fetch: ${url}`);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error in getPlacemarkById:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          url: err.config?.url
        });
      } else {
        console.error("Unexpected error in getPlacemarkById:", err);
      }
      return undefined;
    }
  }
};

// import axios from "axios";
// import type { Placemark, Session, User } from "../types/placemark-types";
// // import type Category from "../../../routes/category/Category.svelte";
// import type { Category } from "../types/placemark-types";
// // import { goto } from "$app/navigation";
// import { category, currentCategories, currentPlacemarks, loggedInUser } from "$lib/runes.svelte";
// import { computeByCountry, computeByVisited } from "./placemark-utils";

// axios.defaults.withCredentials = true;

// export const placemarkService = {
//   baseUrl: "http://localhost:3000",

//   // async signup(user: User): Promise<boolean> {
//   //   try {
//   //     const response = await axios.post(`${this.baseUrl}/api/users`, user);
//   //     console.log("Signup response:", response.data); // Log full response to inspect
//   //     return response.data.success === true;
//   //   } catch (error) {
//   //     console.log(error);
//   //     return false;
//   //   }
//   // },

//   async signup(user: User): Promise<User | null> {
//     try {
//       const response = await axios.post(`${this.baseUrl}/api/users`, user);
//       console.log("Signup response:", response.data); // Should contain _id and more
//       return response.data; // ✅ Return the full user object
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   },

//   async login(email: string, password: string): Promise<Session | null> {
//     try {
//       const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
//         email,
//         password
//       });
//       if (response.data.success) {
//         axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
//         const session: Session = {
//           email: response.data.email,
//           name: response.data.name,
//           token: response.data.token,
//           _id: response.data._id
//         };
//         this.saveSession(session, email);
//         await this.refreshPlacemarksInfo();
//         return session;
//       }
//       return null;
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   },

//   async waitForCategoriesToLoad(): Promise<void> {
//     return new Promise((resolve) => {
//       const check = () => {
//         if (currentCategories.categories.length > 0) {
//           resolve();
//         } else {
//           setTimeout(check, 50); // Poll every 50ms
//         }
//       };
//       check();
//     });
//   },

//   async refreshPlacemarksInfo() {
//     if (!loggedInUser.token || !loggedInUser._id) {
//       console.warn("Session is not ready, skipping refresh");
//       return;
//     }

//     console.log("Token:", loggedInUser.token);

//     const allCategories = await this.getAllCategories(loggedInUser.token);
//     currentCategories.categories = allCategories.filter((cat) => cat.userid === loggedInUser._id);

//     // ✅ Wait until categories are loaded
//     await this.waitForCategoriesToLoad();

//     const categoryId = localStorage.getItem("categoryId");
//     if (!categoryId) {
//       console.warn("No categoryId in localStorage.");
//       return;
//     }

//     const validCategory = currentCategories.categories.find((cat) => cat._id === categoryId);

//     if (!validCategory) {
//       console.warn("categoryId from localStorage is not valid.");
//       return;
//     }

//     // ✅ Set global category state
//     category.title = validCategory.title;
//     category._id = validCategory._id;
//     category.userId = validCategory.userid;
//     category.image = validCategory.image;
//     category.notes = validCategory.notes;

//     const fetchedCategory = await this.getCategoryById(categoryId);
//     if (!fetchedCategory?.placemarks) {
//       console.warn("Could not retrieve placemarks for category.");
//       return;
//     }

//     currentPlacemarks.placemarks = [...fetchedCategory.placemarks];
//     console.log("Updated placemarks:", currentPlacemarks.placemarks);

//     computeByCountry(currentPlacemarks.placemarks);
//     computeByVisited(currentPlacemarks.placemarks);
//   },

//   // async refreshPlacemarksInfo() {
//   //   if (!loggedInUser.token || !loggedInUser._id) {
//   //     console.warn("Session is not ready, skipping refresh");
//   //     return;
//   //   }

//   //   const allCategories = await this.getAllCategories(loggedInUser.token);
//   //   currentCategories.categories = allCategories.filter((cat) => cat.userid === loggedInUser._id);

//   //   // Wait until categories are set before continuing
//   //   const categoryId = localStorage.getItem("categoryId");
//   //   const categoryTitle = localStorage.getItem("categoryTitle");

//   //   if (!categoryId) {
//   //     console.warn("No categoryId found in localStorage. User must select one.");
//   //     return;
//   //   }

//   //   // Now that categories are loaded, validate
//   //   const validCategory = currentCategories.categories.find((cat) => cat._id === categoryId);

//   //   if (!validCategory) {
//   //     console.warn("Stored categoryId not found in current user's categories.");
//   //     return;
//   //   }

//   //   // Set global category state
//   //   category.title = validCategory.title;
//   //   category._id = validCategory._id;
//   //   category.userId = validCategory.userid;
//   //   category.image = validCategory.image;
//   //   category.notes = validCategory.notes;

//   //   // Fetch and update placemarks for the selected category
//   //   const fetchedCategory = await this.getCategoryById(categoryId);
//   //   if (!fetchedCategory?.placemarks) {
//   //     console.warn("Could not retrieve placemarks for the category.");
//   //     return;
//   //   }

//   //   currentPlacemarks.placemarks = [...fetchedCategory.placemarks];

//   //   console.log("Updated placemarks: ", currentPlacemarks.placemarks);

//   //   computeByCountry(currentPlacemarks.placemarks);
//   //   computeByVisited(currentPlacemarks.placemarks);
//   // },

//   // async refreshPlacemarksInfo() {
//   //   if (!loggedInUser.token || !loggedInUser._id) {
//   //     console.warn("Session is not ready, skipping refresh");
//   //     return;
//   //   }

//   //   console.log("Give me the token: ", loggedInUser.token);

//   //   const allCategories = await this.getAllCategories(loggedInUser.token);
//   //   currentCategories.categories = allCategories.filter((cat) => cat.userid === loggedInUser._id);
//   //   const categoryId = localStorage.getItem("categoryId");

//   //   const categoryTitle = localStorage.getItem("categoryTitle");

//   //   const validCategoryTitle = currentCategories.categories.find(
//   //     (cat) => cat.title === categoryTitle
//   //   );
//   //   const validCategoryId = currentCategories.categories.find((cat) => cat._id === categoryId);
//   //   console.log("No categoryId found. User must select one.", validCategoryId, validCategoryTitle);

//   //   if (!categoryId) {
//   //     console.warn("No categoryId found. User must select one.");
//   //     return;
//   //   }

//   //   console.log(
//   //     "Give me all categories: ",
//   //     currentCategories.categories,
//   //     categoryTitle,
//   //     validCategoryTitle,
//   //     validCategoryId,
//   //     categoryId
//   //   );

//   //   // Check if categoryId is valid
//   //   // const categoryTitle = localStorage.getItem("categoryTitle");
//   //   // const validCategory = currentCategories.categories.find((cat) => cat.title === categoryTitle);

//   //   //const validCategory = currentCategories.categories.find((cat) => cat._id === categoryId);

//   //   if (!categoryId) {
//   //     console.warn("No valid categoryId found. User must select one.");
//   //     return;
//   //   }

//   //   // categoryId = validCategory._id;

//   //   //     const categoryWithPlacemarks = await this.getCategoryById(category._id);
//   //   // if (!categoryWithPlacemarks?.placemarks) return;
//   //   // currentPlacemarks.placemarks = categoryWithPlacemarks.placemarks;

//   //   //  const placemarks = await this.getPlacemarksByCategoryId(categoryId, loggedInUser.token);

//   //   const category = await this.getCategoryById(categoryId);
//   //   if (!category?.placemarks) {
//   //     console.warn("Could not retrieve placemarks for category.");
//   //     return;
//   //   }
//   //   if (!category.placemarks) return;

//   //   currentPlacemarks.placemarks = [...category.placemarks];

//   //   console.log("Updated placemarks: ", currentPlacemarks.placemarks);
//   //   // currentPlacemarks.placemarks = categoryWithPlacemarks.placemarks;
//   //   // console.log("These are the placemarks now: ", currentPlacemarks.placemarks, categoryId);

//   //   computeByCountry(currentPlacemarks.placemarks);
//   //   computeByVisited(currentPlacemarks.placemarks);
//   // },

//   // async refreshPlacemarksInfo() {
//   //   const categoryId = localStorage.getItem("categoryId"); // Retrieve the categoryId from localStorage

//   //   if (!categoryId) {
//   //     console.warn("No categoryId found.");
//   //     return; // You might want to ask the user to select a category or show a default screen
//   //   }

//   //   if (loggedInUser.token && categoryId) {
//   //     const allCategories = await this.getAllCategories(loggedInUser.token);
//   //     currentCategories.categories = allCategories.filter((cat) => cat.userid === loggedInUser._id);

//   //     currentPlacemarks.placemarks = await this.getPlacemarksByCategoryId(
//   //       categoryId, // Use the stored categoryId here
//   //       loggedInUser.token
//   //     );
//   //   }
//   // },

//   disconnect() {
//     loggedInUser.email = "";
//     loggedInUser.name = "";
//     loggedInUser.token = "";
//     loggedInUser._id = "";
//     localStorage.removeItem("placemark");
//     localStorage.removeItem("categoryTitle");
//     localStorage.removeItem("categoryId");
//   },

//   saveSession(session: Session, email: string) {
//     loggedInUser.email = email;
//     loggedInUser.name = session.name;
//     loggedInUser.token = session.token;
//     loggedInUser._id = session._id;
//     localStorage.placemark = JSON.stringify(loggedInUser);
//   },

//   // In placemark-service.ts
//   async restoreSession() {
//     const savedLoggedInUser = localStorage.placemark;
//     if (savedLoggedInUser) {
//       const session = JSON.parse(savedLoggedInUser);
//       loggedInUser.email = session.email;
//       loggedInUser.name = session.name;
//       loggedInUser.token = session.token;
//       loggedInUser._id = session._id;

//       // ✅ Ensure axios has the token again
//       axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;

//       const categoryTitle = localStorage.getItem("categoryTitle");
//       if (categoryTitle) {
//         console.log("Using stored categoryTitle:", categoryTitle);
//       } else {
//         console.log("No categoryId found. You may need to select one.");
//       }

//       // Refresh placemarks with no categoryId passed
//       await this.refreshPlacemarksInfo(); // This method should now look for the categoryId internally
//     }
//   },

//   clearSession() {
//     // currentDonations.donations = [];

//     currentCategories.categories = [];
//     currentPlacemarks.placemarks = [];
//     loggedInUser.email = "";
//     loggedInUser.name = "";
//     loggedInUser.token = "";
//     loggedInUser._id = "";
//     localStorage.removeItem("placemark");
//     localStorage.removeItem("categoryTitle");
//     localStorage.removeItem("categoryId");
//   },

//   async updateUser(updatedUser: User, token: string) {
//     console.log(`This is the fetch: ${this.baseUrl}/api/users/${updatedUser._id}`);
//     console.log(`Token: ${token}`);

//     const response = await fetch(`${this.baseUrl}/api/users/${updatedUser._id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },

//       body: JSON.stringify(updatedUser)
//     });

//     // Directly check if the response is ok and parse the JSON
//     if (!response.ok) {
//       // If not, throw an error with the status text
//       const errorText = await response.text(); // Optionally, read the text to debug
//       throw new Error(`Failed to update user: ${errorText}`);
//     }

//     // Since the response is OK, parse the JSON
//     return await response.json();
//   },

//   // This is to delete a user by their user ID
//   async deleteUser(userId: string): Promise<boolean> {
//     try {
//       const token = axios.defaults.headers.common["Authorization"];
//       if (!token) {
//         console.error("No Authorization token found.");
//         return false;
//       }

//       const response = await axios.delete(`${this.baseUrl}/api/users/${userId}`, {
//         headers: {
//           Authorization: token
//         }
//       });

//       console.log("User deleted:", response.data);
//       return response.data.success === true; // adjust if your API returns differently
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Error deleting user:", error.response.status, error.response.data);
//       } else {
//         console.error("Error deleting user:", error.message);
//       }
//       return false;
//     }
//   },

//   async deleteAllUsers(): Promise<boolean> {
//     try {
//       const token = axios.defaults.headers.common["Authorization"];
//       if (!token) {
//         console.warn("No Authorization token found.");
//         return false;
//       }

//       const response = await axios.delete(`${this.baseUrl}/api/users`, {
//         headers: {
//           Authorization: token
//         }
//       });

//       console.log("All users deleted:", response.data);
//       return response.data.success === true; // Adjust if your API returns differently
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Error deleting users:", error.response.status, error.response.data);
//       } else {
//         console.error("Error deleting users:", error.message);
//       }
//       return false;
//     }
//   },

//   async addCategory(category: Category): Promise<Category | null> {
//     try {
//       const token = axios.defaults.headers.common["Authorization"];
//       // The token verification will ensure the user is logged in
//       if (!token) {
//         console.log("User is not logged in. No Authorization token found.");
//         return null;
//       }

//       /* Include the logged-in user's _id as the `userid` field, this will ensure the
//       userid is being sent with the Request*/
//       const categoryWithUserId = {
//         ...category, // Spread existing category properties
//         userid: loggedInUser._id // Add the `userid` field here
//       };
//       const response = await axios.post(`${this.baseUrl}/api/categories`, categoryWithUserId, {
//         headers: {
//           Authorization: token
//         }
//       });
//       await this.refreshPlacemarksInfo();

//       console.log("Category added:", response.data);
//       return response.data;
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Error adding category:", error.response.status, error.response.data);
//       } else {
//         console.error("Error adding category:", error.message);
//       }
//       return null;
//     }
//   },

//   // This is to delete a category, we call in the category id to delete as a parameter
//   async deleteCategory(categoryId: string): Promise<boolean> {
//     try {
//       // The token verification will ensure the user is logged in
//       const token = axios.defaults.headers.common["Authorization"];
//       if (!token) {
//         console.warn("No Authorization token found.");
//         return false;
//       }

//       const response = await axios.delete(`${this.baseUrl}/api/categories/${categoryId}`, {
//         headers: {
//           Authorization: token
//         }
//       });
//       await this.refreshPlacemarksInfo();

//       console.log("Category deleted:", response.data);
//       return response.data.success === true; // Adjust depending on your API response
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Error deleting category:", error.response.status, error.response.data);
//       } else {
//         console.error("Error deleting category:", error.message);
//       }
//       return false;
//     }
//   },

//   async getAllCategories(token: string): Promise<Category[]> {
//     try {
//       const response = await axios.get(this.baseUrl + "/api/categories", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       return response.data;
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       return [];
//     }
//   },

//   // async getAllCategories(token: string): Promise<Category[]> {
//   //   try {
//   //     console.log(this.baseUrl + "/api/categories");
//   //     axios.defaults.headers.common["Authorization"] = "Bearer " + token;

//   //     const response = await axios.get(this.baseUrl + "/api/categories");

//   //     // Optional: If you only want to refresh after categories are fetched
//   //     const categories = response.data;

//   //     return categories;
//   //   } catch (error) {
//   //     console.log(error);
//   //     return [];
//   //   }
//   // },

//   // This is to fetch all users, NEEDS REVISITING
//   async getAllUsers(token: string): Promise<User[]> {
//     try {
//       axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//       const response = await axios.get(this.baseUrl + "/api/users");
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return [];
//     }
//   },

//   // This is to fetch a category by id, and we call in the id string
//   async getCategoryById(id: string): Promise<Category | null> {
//     try {
//       // The token verification will ensure the user is logged in
//       const token = axios.defaults.headers.common["Authorization"];
//       if (!token) {
//         console.warn("No Authorization token found.");
//         return null;
//       }

//       const response = await axios.get(`${this.baseUrl}/api/categories/${id}`, {
//         headers: {
//           Authorization: token
//         }
//       });

//       console.log("Fetched category:", response.data);
//       return response.data;
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Error fetching category:", error.response.status, error.response.data);
//       } else {
//         console.error("Error fetching category:", error.message);
//       }
//       return null;
//     }
//   },

//   async getPlacemarksByCategoryId(categoryId: string, token: string) {
//     try {
//       if (!categoryId) {
//         console.error("No categoryId provided!");
//         return [];
//       }

//       if (!token) {
//         console.warn("No Authorization token provided.");
//         return [];
//       }

//       const url = `${this.baseUrl}/api/categories/${categoryId}/placemarks`; // <- Correct endpoint based on RESTful design
//       console.log("Requesting placemarks from URL:", url);

//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (response.status === 200) {
//         console.log(`Fetched placemarks for categoryId ${categoryId}:`, response.data);
//         return response.data;
//       } else {
//         console.error(`Unexpected status code: ${response.status}`);
//         return [];
//       }
//     } catch (error: any) {
//       if (error.response) {
//         console.error(
//           `Error fetching placemarks for categoryId: ${categoryId}. Status: ${error.response.status}`,
//           error.response.data
//         );
//       } else if (error.request) {
//         console.error("No response received while fetching placemarks:", error.request);
//       } else {
//         console.error("Unexpected error:", error.message);
//       }
//       return [];
//     }
//   },

//   // This is to add a placemark to a category, and we pass in the category id and placemark
//   async addPlacemark(categoryId: string, placemark: Placemark): Promise<Placemark | null> {
//     try {
//       // The token verification will ensure the user is logged in
//       const token = axios.defaults.headers.common["Authorization"];
//       if (!token) {
//         console.warn("No Authorization token found.");
//         return null;
//       }

//       const response = await axios.post(
//         `${this.baseUrl}/api/categories/${categoryId}/placemarks`,
//         placemark,
//         {
//           headers: {
//             Authorization: token
//           }
//         }
//       );
//       //    await this.refreshPlacemarksInfo();

//       console.log("Placemark added:", response.data);
//       return response.data;
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Error adding placemark:", error.response.status, error.response.data);
//       } else {
//         console.error("Error adding placemark:", error.message);
//       }
//       return null;
//     }
//   },

//   // This is to delete a placemark, and we call in the placemark id
//   async deletePlacemark(placemarkId: string): Promise<boolean> {
//     try {
//       const token = axios.defaults.headers.common["Authorization"];
//       if (!token) {
//         console.warn("No Authorization token found.");
//         return false;
//       }

//       const response = await axios.delete(`${this.baseUrl}/api/placemarks/${placemarkId}`, {
//         headers: {
//           Authorization: token
//         }
//       });
//       await this.refreshPlacemarksInfo();

//       console.log("Placemark deleted:", response.data);
//       return response.data.success === true; // Adjust based on your backend response
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Error deleting placemark:", error.response.status, error.response.data);
//       } else {
//         console.error("Error deleting placemark:", error.message);
//       }
//       return false;
//     }
//   },

//   async updatePlacemark(
//     placemarkId: string,
//     categoryId: string,
//     placemark: unknown
//   ): Promise<boolean> {
//     try {
//       const token = axios.defaults.headers.common["Authorization"];
//       if (!token) {
//         console.warn("No Authorization token found.");
//         return false;
//       }

//       console.log(
//         `This is the placemark being updated: ${this.baseUrl}/api/category/${categoryId}/updateplacemark/${placemarkId}`
//       );

//       const response = await axios.post(
//         `${this.baseUrl}/category/${categoryId}/updateplacemark/${placemarkId}`,
//         placemark,
//         {
//           headers: {
//             Authorization: token
//           },
//           withCredentials: true,
//           maxRedirects: 0, // Prevent Axios from following redirects
//           validateStatus: (status) => status >= 200 && status < 400 // Treat 3xx as successful
//         }
//       );

//       // At this point, the update worked — backend is redirecting
//       console.log("✅ Placemark updated, redirecting manually...", response);
//       return response.data;
//     } catch (error: any) {
//       if (error.response) {
//         console.error("❌ Error updating placemark:", error.response.status, error.response.data);
//       } else {
//         console.error("❌ Unexpected error:", error.message);
//       }
//       return false;
//     }
//   },

//   // This is to fetch a single placemark by its ID (and optionally the category ID, if your API requires it)
//   async getPlacemarkById(categoryId: string, placemarkId: string) {
//     try {
//       const token = axios.defaults.headers.common["Authorization"];
//       if (!token) {
//         console.warn("No Authorization token found.");
//         return null;
//       }
//       //////////////////////// NEED TO CHECK WHY WE ARE NOT ADDING ${CATEGORYId} ////////////
//       const url = `${this.baseUrl}/api/placemarks/${placemarkId}`;
//       console.log(`Trying to fetch: ${url}`);

//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       return response.data;
//     } catch (err: any) {
//       if (axios.isAxiosError(err)) {
//         console.error("Axios error in getPlacemarkById:", {
//           message: err.message,
//           status: err.response?.status,
//           data: err.response?.data,
//           url: err.config?.url
//         });
//       } else {
//         console.error("Unexpected error in getPlacemarkById:", err);
//       }
//       return undefined;
//     }
//   }
// };
// function waitForCategoriesToLoad() {
//   throw new Error("Function not implemented.");
// }
