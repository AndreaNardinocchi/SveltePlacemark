import { placemark } from "$lib/runes.svelte";
import axios from "axios";

const baseUrl = "http://localhost:3000"; // Change if needed

const imageService = {
  async uploadImage(categoryId: string, placemarkId: string, imageFile: File): Promise<boolean> {
    try {
      console.log("Image file received:", imageFile);

      // If the file is not valid, return false
      if (!imageFile) {
        console.error("No image file provided.");
        return false;
      }

      // Check if Authorization token exists
      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.warn("No Authorization token set.");
        // You can still proceed with the upload even if the user is not logged in
      }

      // Create a new FormData instance and append the image file
      const formData = new FormData();
      formData.append("imagefile", imageFile);

      // Log the FormData key-value pairs for debugging
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      // Log the upload URL and request details
      const uploadUrl = `${baseUrl}/category/${categoryId}/placemark/${placemarkId}/uploadimage`;

      console.log("Uploading to URL:", uploadUrl);

      // Send the POST request to the backend API
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          Authorization: token || "" // Send the token if present, otherwise leave empty
          // You can comment out the Content-Type line and let Axios handle it automatically.
        }
      });

      // Log the response status and data
      console.log("Response status:", response.status);
      if (response.status >= 200 && response.status < 300) {
        console.log("Image uploaded successfully.");
        return true;
      } else {
        console.error("Unexpected response status:", response.status);
        return false;
      }
    } catch (err) {
      console.error("Upload failed:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
      } else {
        console.error("Error message:", err.message);
      }
      return false;
    }
  },
  // async uploadImage(categoryId: string, placemarkId: string, imageFile: File): Promise<boolean> {
  //   try {
  //     console.log("Image file received:", imageFile);

  //     // If the file is not valid, return false
  //     if (!imageFile) {
  //       console.error("No image file provided.");
  //       return false;
  //     }

  //     // Check if Authorization token exists
  //     const token = axios.defaults.headers.common["Authorization"];
  //     if (!token) {
  //       console.warn("No Authorization token set.");
  //       return false;
  //     }

  //     // Create a new FormData instance and append the image file
  //     const formData = new FormData();
  //     formData.append("imagefile", imageFile);

  //     // Log the FormData key-value pairs for debugging
  //     formData.forEach((value, key) => {
  //       console.log(`${key}: ${value}`);
  //     });

  //     // Log the FormData entries as an object for easier inspection
  //     const formDataEntries: { key: string; value: FormDataEntryValue }[] = [];
  //     formData.forEach((value, key) => formDataEntries.push({ key, value }));
  //     console.log("FormData content after append:", formDataEntries);

  //     // Log the upload URL and request details
  //     const uploadUrl = `${baseUrl}/category/${categoryId}/placemark/${placemarkId}/uploadimage`;

  //     console.log("Uploading to URL:", uploadUrl);

  //     // Send the POST request to the backend API
  //     const response = await axios.post(uploadUrl, formData, {
  //       headers: {
  //         Authorization: token
  //         // You can comment out the Content-Type line and let Axios handle it automatically.
  //         // "Content-Type": "multipart/form-data"
  //       }
  //     });

  //     // Log the response status and data
  //     console.log("Response status:", response.status);
  //     if (response.status >= 200 && response.status < 300) {
  //       console.log("Image uploaded successfully.");
  //       console.log("Image url: ", placemark.img[1]);
  //       return true;
  //     } else {
  //       console.error("Unexpected response status:", response.status);
  //       return false;
  //     }
  //   } catch (err) {
  //     console.error("Upload failed:", err);
  //     if (err.response) {
  //       console.error("Error response:", err.response.data);
  //     } else {
  //       console.error("Error message:", err.message);
  //     }
  //     return false;
  //   }
  // },

  async deleteImage(categoryId: string, placemarkId: string, index: number): Promise<boolean> {
    try {
      console.log("Deleting image at index:", index);

      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.warn("No Authorization token set.");
        return false;
      }

      const deleteUrl = `${baseUrl}/category/${categoryId}/placemark/${placemarkId}/deleteimage/${index}`;
      console.log("Sending GET request to URL:", deleteUrl);

      const response = await axios.get(deleteUrl, {
        headers: {
          Authorization: token
        }
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("Image deleted successfully.");
        return true;
      } else {
        console.error("Unexpected response status:", response.status);
        return false;
      }
    } catch (err) {
      console.error("Delete failed:", err);
      return false;
    }
  }
};

export default imageService;
