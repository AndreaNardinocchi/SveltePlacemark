import axios from "axios";
import type { Placemark, Session, User } from "../types/placemark-types";
// import type Category from "../../../routes/category/Category.svelte";
import type { Category } from "../types/placemark-types";
// import { goto } from "$app/navigation";
import { placemark } from "$lib/runes.svelte";

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
      return response.data; // ✅ Return the full user object
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

  async getPlacemarksByCategoryId(categoryId: string, token: string) {
    try {
      if (!categoryId) {
        console.error("No categoryId provided!");
        return [];
      }

      if (!token) {
        console.warn("No Authorization token provided.");
        return [];
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
      console.log("✅ Placemark updated, redirecting manually...", response);
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

  // Function to upload an image for a placemark
  // async uploadImage(categoryId: string, placemarkId: string, imageFile: File): Promise<boolean> {
  //   try {
  //     const token = axios.defaults.headers.common["Authorization"];
  //     if (!token) {
  //       console.warn("No Authorization token found.");
  //       return false;
  //     }

  //     const formData = new FormData();
  //     formData.append("imagefile", imageFile);

  //     const response = await axios.post(
  //       `${this.baseUrl}/api/categories/${categoryId}/placemark/${placemarkId}/uploadimage`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: token
  //           // Do not set Content-Type here
  //         }
  //       }
  //     );

  //     if (response.status === 200) {
  //       console.log("Image uploaded successfully:", response.data);
  //       return true;
  //     } else {
  //       console.error("Failed to upload image:", response.status);
  //       return false;
  //     }
  //   } catch (error: any) {
  //     console.error("Error uploading image:", error);
  //     return false;
  //   }
  // },

  // // Function to delete an image from a placemark
  // async deleteImage(categoryId: string, placemarkId: string, imageIndex: number): Promise<boolean> {
  //   try {
  //     const token = axios.defaults.headers.common["Authorization"];
  //     if (!token) {
  //       console.warn("No Authorization token found.");
  //       return false;
  //     }

  //     // Send the delete request to the backend API with the category ID, placemark ID, and image index
  //     const response = await axios.delete(
  //       `${this.baseUrl}/api/categories/${categoryId}/placemark/${placemarkId}/deleteimage/${imageIndex}`,
  //       {
  //         headers: {
  //           Authorization: token
  //         }
  //       }
  //     );

  //     // Check if the image was successfully deleted
  //     if (response.status === 200) {
  //       console.log("Image deleted successfully:", response.data);
  //       return true;
  //     } else {
  //       console.error("Failed to delete image:", response.status);
  //       return false;
  //     }
  //   } catch (error: any) {
  //     console.error("Error deleting image:", error);
  //     return false;
  //   }
  // }
};
