import { placemarkService } from "$lib/ui/services/placemark-service";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const ssr = false; // disable server-side rendering

export const load: PageLoad = async ({ params }) => {
  const categoryId = params.id;
  const placemarkId = params.id;

  try {
    const placemark = await placemarkService.getPlacemarkById(placemarkId);

    if (!placemark || !placemark._id) {
      throw error(404, "Placemark not found");
    }

    // Optionally store in localStorage (client-side only)
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("categoryId", categoryId);
      localStorage.setItem("placemarkId", placemarkId);
    }

    return { placemark };
  } catch (err) {
    console.error("Error in placemark +page.ts load():", err);
    throw error(500, "Internal Server Error");
  }
};
