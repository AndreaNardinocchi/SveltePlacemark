// src/routes/category/[id]/+page.ts
import { placemarkService } from "$lib/ui/services/placemark-service";
// Import the type for SvelteKit's route load function
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const ssr = false; // disable server-side rendering

/**
 * The load function runs when navigating to `/category/[id]`.
 * It fetches the category by ID from the backend and passes it to the page.
 */
export const load: PageLoad = async ({ params }) => {
  const categoryId = params.id;

  try {
    const category = await placemarkService.getCategoryById(categoryId);

    if (!category || !category._id) {
      throw error(404, "Category not found");
    }

    return { category };
  } catch (err) {
    console.error("Error in +page.ts load():", err);
    throw error(500, "Internal Server Error");
  }
};
