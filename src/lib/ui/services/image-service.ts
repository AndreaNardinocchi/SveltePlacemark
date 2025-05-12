// import { placemark } from "$lib/runes.svelte";
/** The image-service.ts will enable the uploading and deletion of images from the Placemak landing page.
 * ## BUG: The use of this feature does come with a caveat since the back end must be logged in for the
 * user to be able to upload images. Unfortunately, I was unable to resolve this bug!
 */
import axios from "axios";

const baseUrl = "http://localhost:3000";
const baseUrl = "https://placemark-v63d.onrender.com";

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

  async deleteImage(categoryId: string, placemarkId: string, index: number): Promise<boolean> {
    try {
      console.log("Deleting image at index:", index);

      // Get the Authorization token from the axios default headers
      const token = axios.defaults.headers.common["Authorization"];
      if (!token) {
        console.warn("No Authorization token set.");
        return false;
      }
      // Here we build the URL to which we are going to send the deletion request
      // This URL points to the backend route that handles image deletion
      const deleteUrl = `${baseUrl}/category/${categoryId}/placemark/${placemarkId}/deleteimage/${index}`;
      console.log("Sending GET request to URL:", deleteUrl);

      // Sending a GET request to the backend to delete the image at the specified index
      // The Authorization token is sent to the headers for authentication
      const response = await axios.get(deleteUrl, {
        headers: {
          Authorization: token
        }
      });

      // Check if the response status is between 200 and 299 (indicating success)
      // https://www.geeksforgeeks.org/http-status-codes-successful-responses/
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
