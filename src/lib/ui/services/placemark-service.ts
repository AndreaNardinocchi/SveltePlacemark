import axios from "axios";
import type { Placemark, Session, User } from "../types/placemark-types";
// import type Category from "../../../routes/category/Category.svelte";
import type { Category } from "../types/placemark-types";
// import { goto } from "$app/navigation";
import { placemark } from "$lib/runes.svelte";

axios.defaults.withCredentials = true;

export const placemarkService = {
  baseUrl: "http://localhost:3000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      console.log("Signup response:", response.data); // Log full response to inspect
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
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
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          userLat: response.data.userLat,
          userLong: response.data.userLong,
          country: response.data.country,
          street: response.data.street,
          addressCode: response.data.addressCode,
          DOB: response.data.DOB,
          phoneNumber: response.data.phoneNumber,
          email: response.data.email,
          password: response.data.password,
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // This is to delete a user by their user ID
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

  async deleteAllUsers(): Promise<boolean> {
    try {
      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.warn("No Authorization token found.");
        return false;
      }

      const response = await axios.delete(`${this.baseUrl}/api/users`, {
        headers: {
          Authorization: token
        }
      });

      console.log("All users deleted:", response.data);
      return response.data.success === true; // Adjust if your API returns differently
    } catch (error: any) {
      if (error.response) {
        console.error("Error deleting users:", error.response.status, error.response.data);
      } else {
        console.error("Error deleting users:", error.message);
      }
      return false;
    }
  },

  // async getUserByToken() {
  //   try {
  //     // Retrieve the Authorization token from the headers
  //     const token = axios.defaults.headers.common["Authorization"];

  //     // Ensure the token is available, otherwise we cannot make the request
  //     if (!token) {
  //       console.warn("No Authorization token found.");
  //       return null;
  //     }

  //     // Make the API request to fetch user details based on the token
  //     const response = await axios.get(`${this.baseUrl}/api/users`, {
  //       headers: {
  //         Authorization: token // Pass the token for authorization
  //       }
  //     });

  //     return response.data; // Return the fetched user data
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     return null; // Handle errors by returning null
  //   }
  // },

  // async getUserById(userId: string) {
  //   try {
  //     const token = axios.defaults.headers.common["Authorization"]; // make sure this was set during login!
  //     if (!token) {
  //       console.warn("No Authorization token found.");
  //       return null;
  //     }

  //     const response = await axios.get(`${this.baseUrl}/api/users/${userId}`, {
  //       headers: {
  //         Authorization: token
  //       }
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     return null;
  //   }
  // },

  async addCategory(category: Category): Promise<Category | null> {
    try {
      const token = axios.defaults.headers.common["Authorization"];
      // The token verification will ensure the user is logged in
      if (!token) {
        console.log("User is not logged in. No Authorization token found.");
        return null;
      }
      const response = await axios.post(`${this.baseUrl}/api/categories`, category, {
        headers: {
          Authorization: token
        }
      });

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
        console.warn("No Authorization token found.");
        return false;
      }

      const response = await axios.delete(`${this.baseUrl}/api/categories/${categoryId}`, {
        headers: {
          Authorization: token
        }
      });

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

  // This is to fetch all categories, and we call in the loggedinUser token to ensure we are signed in
  async getAllCategories(token: string): Promise<Category[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/categories");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  // This is to fetch all users, NEEDS REVISITING
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
      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.warn("No Authorization token found.");
        return null;
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

  async getPlacemarksByCategoryId(categoryId: string) {
    try {
      if (!categoryId) {
        console.error("No categoryId provided!");
        return [];
      }

      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.warn("No Authorization token found.");
        return [];
      }

      const response = await axios.get(`${this.baseUrl}/api/categories/${categoryId}/placemarks`, {
        headers: {
          Authorization: token
        }
      });

      console.log(`Fetched placemarks for categoryId: ${categoryId}`, response.data);
      return response.data; // Will be [] if no placemarks exist
    } catch (error: any) {
      if (error.response) {
        console.error(
          `Error fetching placemarks for categoryId: ${categoryId}. Status: ${error.response.status}`,
          error.response.data
        );
      } else if (error.request) {
        console.error(`No response received while fetching placemarks. Request:`, error.request);
      } else {
        console.error(`Unexpected error occurred while fetching placemarks: ${error.message}`);
      }

      return [];
    }
  },

  // This is to fetch placemarks by id, and we call in the category id of the placemarks
  // async getPlacemarksByCategoryId(categoryId: string) {
  //   try {
  //     // The token verification will ensure the user is logged in
  //     const token = axios.defaults.headers.common["Authorization"];
  //     // The token verification will ensure the user is logged in
  //     if (!token) {
  //       console.warn("No Authorization token found.");
  //       return [];
  //     }

  //     const response = await axios.get(`${this.baseUrl}/api/categories/${categoryId}/placemarks`, {
  //       headers: {
  //         Authorization: token
  //       }
  //     });

  //     console.log(`Fetching placemarks for categoryId: ${categoryId}`, response.data);
  //     return response.data;
  //   } catch (error: any) {
  //     if (error.response) {
  //       console.error("Error fetching placemarks:", error.response.status, error.response.data);
  //     } else {
  //       console.error("Error fetching placemarks:", error.message);
  //     }
  //     return [];
  //   }
  // },

  // This is to add a placemark to a category, and we pass in the category id and placemark
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

  async updatePlacemark(placemarkId: string, categoryId: string, placemark: any): Promise<boolean> {
    try {
      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.warn("No Authorization token found.");
        return false;
      }

      const response = await axios.post(
        `${this.baseUrl}/api/category/${categoryId}/updateplacemark/${placemarkId}`,
        placemark,
        {
          headers: {
            Authorization: token
          },
          withCredentials: true,
          // ⛔️ Stop axios from auto-following the 302 redirect to HTML
          maxRedirects: 0
          // ✅ Let it treat 3xx responses as "okay"
          // validateStatus: (status) => status >= 200 && status < 400
        }
      );

      // At this point, the update worked — backend is redirecting
      console.log("✅ Placemark updated, redirecting manually...");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("❌ Error updating placemark:", error.response.status, error.response.data);
      } else {
        console.error("❌ Unexpected error:", error.message);
      }
      return false;
    }
  },

  // async updatePlacemark(categoryId: string, placemarkId: string, placemark: any): Promise<boolean> {
  //   try {
  //     const token = axios.defaults.headers.common["Authorization"];
  //     if (!token) {
  //       console.warn("No Authorization token found.");
  //       return false;
  //     }

  //     const response = await axios.post(
  //       `${this.baseUrl}/category/${categoryId}/updateplacemark/${placemarkId}`,
  //       placemark,
  //       {
  //         headers: {
  //           Authorization: token
  //         },
  //         withCredentials: true,
  //         // ⛔️ Stop axios from auto-following the 302 redirect to HTML
  //         maxRedirects: 0,
  //         // ✅ Let it treat 3xx responses as "okay"
  //         validateStatus: (status) => status >= 200 && status < 400
  //       }
  //     );

  //     // At this point, the update worked — backend is redirecting
  //     console.log("✅ Placemark updated, redirecting manually...");
  //     return response.data;
  //   } catch (error: any) {
  //     if (error.response) {
  //       console.error("❌ Error updating placemark:", error.response.status, error.response.data);
  //     } else {
  //       console.error("❌ Unexpected error:", error.message);
  //     }
  //     return false;
  //   }
  // },

  // async updatePlacemark(categoryId: string, placemarkId: string, placemark: any) {
  //   try {
  //     const token = axios.defaults.headers.common["Authorization"];

  //     if (!token) {
  //       console.warn("No Authorization token found.");
  //       return;
  //     }

  //     console.log(`Updating placemark with ID: ${placemarkId} in category: ${categoryId}`);

  //     // Make the POST request to update the placemark
  //     const response = await axios.post(
  //       `${this.baseUrl}/category/${categoryId}/updateplacemark/${placemarkId}`,
  //       placemark,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}` // Attach the token for authorization
  //         },
  //         withCredentials: true // If you need to send cookies or credentials
  //       }
  //     );

  //     // Log the response to ensure everything is working correctly
  //     console.log("This is the updated placemark:", response.data);

  //     // If the response is successful, redirect the user to the category page
  //     if (response.status === 200) {
  //       goto(`/category/${categoryId}`);
  //     } else {
  //       alert("Failed to update placemark.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating placemark:", error);
  //     alert("There was an error updating the placemark.");
  //   }
  // },

  // This is to fetch a single placemark by its ID (and optionally the category ID, if your API requires it)
  async getPlacemarkById(categoryId: string, placemarkId: string) {
    try {
      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.warn("No Authorization token found.");
        return null;
      }

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

  // async getUserById(userId: string): Promise<User | null> {
  //   try {
  //     const token = axios.defaults.headers.common["Authorization"];
  //     if (!token) {
  //       console.warn("No Authorization token found. User might not be logged in.");
  //       return null;
  //     }

  //     const response = await axios.get(`${this.baseUrl}/api/users/${userId}`, {
  //       headers: {
  //         Authorization: token
  //       }
  //     });

  //     return response.data as User;
  //   } catch (error: any) {
  //     if (error.response) {
  //       console.error("Error fetching user:", error.response.status, error.response.data);
  //     } else {
  //       console.error("Error fetching user:", error.message);
  //     }
  //     return null;
  //   }
  // },

  // async getAllCategories(): Promise<Category[] | null> {
  //   try {
  //     const token = axios.defaults.headers.common["Authorization"];
  //     if (!token) {
  //       console.warn("User is not logged in. No Authorization token found.");
  //       return null;
  //     }

  //     const response = await axios.get(`${this.baseUrl}/api/categories`, {
  //       headers: {
  //         Authorization: token
  //       }
  //     });

  //     console.log("Fetched categories:", response.data);
  //     return response.data as Category[];
  //   } catch (error: any) {
  //     if (error.response) {
  //       console.error("Error fetching categories:", error.response.status, error.response.data);
  //     } else {
  //       console.error("Error fetching categories:", error.message);
  //     }
  //     return null;
  //   }
  // }

  // async addCategory(category: Category): Promise<Category | null> {
  //   // Promise<Category | null>
  //   try {
  //     const response = await axios.post(`${this.baseUrl}/api/categories`, category);
  //     console.log("Category added:", response.data);
  //     // return response.data.success === true;
  //     return response.data;
  //   } catch (error) {
  //     console.log("Error adding category:", error);
  //     return null;
  //   }
  // }

  // async addCategory(category: Category) {
  //   // token: string
  //   try {
  //     // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //     const response = await axios.post(this.baseUrl + "/api/categories/", category);
  //     console.log("Signup response:", response.data);
  //     // return response.status == 200;
  //     return response.data.success === true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  // async getUser(userId: string): Promise<User | null> {
  //   try {
  //     const response = await axios.get(`${this.baseUrl}/api/users/${userId}`);
  //     if (response.data.success) {
  //       const user: User = response.data.user;
  //       return user;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }
};

//   async donate(donation: Donation, token: string) {
//     try {
//       axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//       const response = await axios.post(
//         this.baseUrl + "/api/candidates/" + donation.candidate + "/donations",
//         donation
//       );
//       return response.status == 200;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   },

//   async getCandidates(token: string): Promise<Candidate[]> {
//     try {
//       axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//       const response = await axios.get(this.baseUrl + "/api/candidates");
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return [];
//     }
//   },

//   async getDonations(token: string): Promise<Donation[]> {
//     try {
//       axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//       const response = await axios.get(this.baseUrl + "/api/donations");
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return [];
//     }
//   }
// };
