import { placemarkService } from "$lib/ui/services/placemark-service";
// Import the PageLoad type for SvelteKit route loading
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const ssr = false; // disable server-side rendering

/**
 * The load function runs when the route is visited (e.g., ../placemark/id).
 * It fetches placemark data and stores its ID in localStorage.
 */
export const load: PageLoad = async ({ params }) => {
  // Get placemark ID from URL params
  const placemarkId = params.id;

  try {
    const placemark = await placemarkService.getPlacemarkById(placemarkId);

    if (!placemark || !placemark._id) {
      throw error(404, "Placemark not found");
    }

    // Optionally store in localStorage (client-side only)
    if (typeof localStorage !== "undefined") {
      // This sets placemarkId in the local storage
      localStorage.setItem("placemarkId", placemarkId);
    }
    // Return the placemark as a prop to the page
    return { placemark };
  } catch (err) {
    console.error("Error in placemark +page.ts load():", err);
    throw error(500, "Internal Server Error");
  }
};
