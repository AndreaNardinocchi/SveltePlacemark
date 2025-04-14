<!-- <script lang="ts">
  import { placemarkService } from "./services/placemark-service";
  import { loggedInUser } from "$lib/runes.svelte";
  // import Category from "../../routes/category/[id]/Category.svelte";
  import type { Category } from "$lib/ui/types/placemark-types";
  import { onMount } from "svelte";

  // ✅ category should be a single object, not an array

  // ✅ Use $state for reactive values
  // svelte-ignore non_reactive_update
  let category: Category | null = null;
  //   let category = $state("");

  // This is assuming `loggedInUser.token` is already defined and valid
  onMount(async () => {
    // Replace with the actual category ID, not the token
    const categoryId = "some-category-id"; // You need to get this from the route or context
    const token = loggedInUser.token;

    const result = await placemarkService.getCategoryById(token);
    category = result;
    console.log("This is the category:", category);
  });

  let backgroundColor = $state(
    "title box has-text-centered has-background-grey-dark has-text-white"
  ); // Default example
  let imageCode = $state("https://i.ibb.co/qL14ZG2g/mossel-dish-7724006-1280.jpg");
</script>

{#if category}
  <div class={backgroundColor}>
    <div class="card-image">
      <figure class="image 264x264 m-auto">
        <img src={imageCode} alt="placeholder" style="border-radius: 15px;" />
      </figure>
    </div>
    <div class="columns">
      <div class="column">
        <article class="card-content pt-2">
          <p class="card-header-title">- {category.title} -</p>
          <p></p>
        </article>
      </div>
    </div>
  </div>
{/if} -->

<script lang="ts">
  import { placemarkService } from "./services/placemark-service";
  import { loggedInUser } from "$lib/runes.svelte";
  import type { Category } from "$lib/ui/types/placemark-types";
  import { onMount } from "svelte";
  import { writable } from "svelte/store"; // Using writable store for reactive values

  // Reactive state
  let category: Category | null = null;
  let backgroundColor = writable(
    "title box has-text-centered has-background-grey-dark has-text-white"
  );
  let imageCode = writable("https://i.ibb.co/qL14ZG2g/mossel-dish-7724006-1280.jpg");

  onMount(async () => {
    // Get category ID dynamically, maybe from route or context
    const url = window.location.pathname;
    const categoryId = url.split("/").pop();
    // const categoryId =  //"67fad4fb3b977ce37158de76"; // Replace with actual category ID from the route
    const token = loggedInUser.token;

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

{#if category}
  <div class={$backgroundColor}>
    <div class="card-image">
      <figure class="image 264x264 m-auto">
        <!-- Use a fallback image in case category does not have a valid image link -->
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img src={$imageCode} alt="Category image" style="border-radius: 15px;" />
      </figure>
    </div>
    <div class="columns">
      <div class="column">
        <article class="card-content pt-2">
          <!-- Display category title -->
          <p class="card-header-title">- {category.title} -</p>
          <p></p>
        </article>
      </div>
    </div>
  </div>
{/if}
