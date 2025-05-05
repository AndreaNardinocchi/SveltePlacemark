<script lang="ts">
  import { placemarkService } from "./services/placemark-service";
  import { loggedInUser } from "$lib/runes.svelte";
  import type { Category } from "$lib/ui/types/placemark-types";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import DOMPurify from "dompurify";

  let category = $state<Category>({} as Category);
  let backgroundColor = $state("");
  // svelte-ignore non_reactive_update
  let sanitizedTitle = "";
  // svelte-ignore non_reactive_update
  let sanitizedImageCode = "";

  async function getBackgroundColor(): Promise<string> {
    const url = window.location.pathname;
    const categoryId = url.split("/").pop();
    if (!categoryId) {
      console.warn("No category ID found in URL.");
      return "";
    }
    const category = await placemarkService.getCategoryById(categoryId);

    if (category) {
      // Sanitize dynamic values
      sanitizedTitle = DOMPurify.sanitize(category.title);
      if (sanitizedTitle === "Restaurants") {
        backgroundColor = "title box has-text-centered has-background-grey-dark has-text-white";
      } else if (sanitizedTitle === "Museums") {
        backgroundColor = "title box has-text-centered has-background-black-bis has-text-white";
      } else if (sanitizedTitle === "Beaches") {
        backgroundColor = "title box has-text-centered has-background-grey-light has-text-white";
      } else if (sanitizedTitle === "Parks") {
        backgroundColor = "title box has-text-centered has-background-grey-darker has-text-white";
      }
    }
    return backgroundColor;
  }

  let imageCode = $state("");
  async function getImageCode(): Promise<string> {
    const url = window.location.pathname;
    const categoryId = url.split("/").pop();
    if (!categoryId) {
      console.warn("No category ID found in URL.");
      return "";
    }
    const category = await placemarkService.getCategoryById(categoryId);
    if (category) {
      // Sanitize dynamic values
      sanitizedTitle = DOMPurify.sanitize(category.title);
    }
    if (sanitizedTitle === "Restaurants") {
      imageCode = "https://i.ibb.co/qL14ZG2g/mossel-dish-7724006-1280.jpg";
    } else if (sanitizedTitle === "Museums") {
      imageCode = "https://i.ibb.co/C5hpYTW3/man-2590655-1280.jpg";
    } else if (sanitizedTitle === "Beaches") {
      imageCode = "https://i.ibb.co/1YHM8FHt/coast-7366616-1280.jpg";
    } else if (sanitizedTitle === "Parks") {
      imageCode = "https://i.ibb.co/jPnk3WxG/autumn-3731094-1280.jpg";
    }
    // Sanitize image URL too
    sanitizedImageCode = DOMPurify.sanitize(imageCode);

    return imageCode;
  }

  onMount(async () => {
    // Get category ID dynamically, maybe from route or context
    const url = window.location.pathname;
    const categoryId = url.split("/").pop();
    const token = loggedInUser.token;
    backgroundColor = await getBackgroundColor();
    imageCode = await getImageCode();

    if (categoryId && token) {
      // Fetch category by ID
      const result = await placemarkService.getCategoryById(categoryId);

      // If category is fetched, update the reactive variable
      if (result) {
        category = result;
      } else {
        console.warn("Category not found.");
      }
    } else {
      console.warn("Invalid category ID or token.");
    }
  });
</script>

<div>
  {#if category.title}
    <div class={backgroundColor}>
      <div class="card-image" in:fade={{ duration: 3000 }}>
        <figure class="image 264x264 m-auto">
          <!-- Use a fallback image in case category does not have a valid image link -->
          <!-- svelte-ignore a11y_img_redundant_alt -->
          <img src={sanitizedImageCode} alt="Category image" style="border-radius: 15px;" />
        </figure>
      </div>
      <div class="columns">
        <div class="column">
          <article class="card-content pt-2">
            <!-- Display category title -->
            <p class="card-header-title">- {sanitizedTitle} -</p>
            <p></p>
          </article>
        </div>
      </div>
    </div>
  {/if}
</div>
