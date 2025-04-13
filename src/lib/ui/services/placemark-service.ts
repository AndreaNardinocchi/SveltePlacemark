import axios from "axios";
import type { Session, User } from "../types/placemark-types";
// import type Category from "../../../routes/category/Category.svelte";
import type { Category } from "../types/placemark-types";

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

  async addCategory(category: Category): Promise<Category | null> {
    try {
      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.warn("User is not logged in. No Authorization token found.");
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

  async getCategoryById(id: string): Promise<Category | null> {
    try {
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

      console.log("Fetched placemarks:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Error fetching placemarks:", error.response.status, error.response.data);
      } else {
        console.error("Error fetching placemarks:", error.message);
      }
      return [];
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
