<!-- <script lang="ts">
  import { placemarkService } from "./services/placemark-service";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
  // import type Category from "../../routes/category/Category.svelte";

  // Example data that you will replace with actual values or fetched data
  // let accCat0 = "Category 1";
  // let accCatId0 = "1";
  // let accCat1 = "Category 2";
  // let accCatId1 = "2";
  // let accCat2 = "Category 3";
  // let accCatId2 = "3";
  // let accCat3 = "Category 4";
  // let accCatId3 = "4";
  let createdTimeStamp = "2023-03-29"; // Example timestamp

  // Define your category variables dynamically
  let categories = [];
  let accCat0 = $state("");
  let accCatId0 = $state("");
  let accCat1 = $state("");
  let accCatId1 = $state("");
  let accCat2 = $state("");
  let accCatId2 = $state("");
  let accCat3 = $state("");
  let accCatId3 = $state("");

  // Method to fetch and process categories
  async function fetchCategories() {
    try {
      const response = await placemarkService.getAllCategories(loggedInUser.token); // Assume this service exists and works
      categories = response; // Assuming response.data contains the categories array

      // Extract category titles and IDs
      const accCats: any[] = [];
      const accCatsId: any[] = [];

      categories.forEach((category) => {
        accCats.push(category.title);
        accCatsId.push(category._id);
      });

      // Assign the first category to accCat0 and accCatId0
      accCat0 = accCats[0] || ""; // Default to "Category 1" if no categories
      accCatId0 = accCatsId[0] || ""; // Default to "1" if no categories
      accCat1 = accCats[1] || ""; // Default to "Category 1" if no categories
      accCatId1 = accCatsId[1] || ""; // Default to "1" if no categories
      accCat2 = accCats[2] || ""; // Default to "Category 1" if no categories
      accCatId2 = accCatsId[2] || ""; // Default to "1" if no categories
      accCat3 = accCats[3] || ""; // Default to "Category 1" if no categories
      accCatId3 = accCatsId[3] || ""; // Default to "1" if no categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  // Fetch categories when the component mounts
  onMount(() => {
    fetchCategories();
  });
</script>

<section class="box has-background-grey-dark">
  <section class="content p-3">
    <p class="subtitle has-text-white is-size-3 has-text-weight-bold">- Your Categories -</p>
  </section>
</section>

<section class="box">
  <section class="content pl-4">
    <div class="columns">
      <div class="column">
        <p class="is-size-4 mb-2">
          <a href={`/category/${accCatId0}`} class="has-text-grey-light">{accCat0}</a>
        </p>
        <p class="is-size-4 mb-2">
          <a href={`/category/${accCatId1}`} class="has-text-grey-light">{accCat1}</a>
        </p>
        <p class="is-size-4 mb-2">
          <a href={`/category/${accCatId2}`} class="has-text-grey-light">{accCat2}</a>
        </p>
        <p class="is-size-4 mb-6">
          <a href={`/category/${accCatId3}`} class="has-text-grey-light">{accCat3}</a>
        </p>
        <p class="is-size-7">
          * If you have added any categories, they will get displayed in this box.
        </p>
      </div>
    </div>
  </section>
</section>

<section class="box has-background-grey-dark">
  <section class="content p-3">
    <p class="subtitle has-text-white is-size-3 has-text-weight-bold">- About Your Account -</p>
  </section>
</section>

<section class="box">
  <section class="content pl-4">
    <div class="columns">
      <div class="column">
        <p class="is-size-6 mb-2">Created on: {createdTimeStamp}</p>
      </div>
    </div>
  </section>
</section> -->

<script lang="ts">
  import { placemarkService } from "./services/placemark-service";
  import { onMount } from "svelte";
  import { currentCategories, loggedInUser } from "$lib/runes.svelte";
  import { goto } from "$app/navigation";
  import type { User } from "./types/placemark-types";
  import { fly } from "svelte/transition";

  let categories: any[] = [];
  let placemarks: any[] = [];
  let user: User;
  // let createdTimeStamp = $state("");
  let categoryPlacemarks: never[] = [];
  console.log("These are the categoryPlacemarks: ", categoryPlacemarks);

  // Method to fetch and process categories and placemarks
  // async function fetchCategories() {
  // try {
  //   const response = await placemarkService.getAllCategories(loggedInUser.token); // Fetch categories
  //   categories = response; // Assuming response contains the categories

  //   // Now fetch the placemarks for each category

  //   // const categoryPlacemarks = await placemarkService.getPlacemarksByCategoryId(
  //   //   category._id,
  //   //   loggedInUser.token
  //   // );

  //   categories.forEach(async (category) => {
  //     // Directly assign the placemarks from the category if available
  //     if (category) {
  //       const categoryId = category._id;
  //       const placemarks = await placemarkService.getPlacemarksByCategoryId(
  //         // categoryId,
  //         loggedInUser.token
  //       );
  //       // categoryPlacemarks = category.placemarks;
  //       console.log(
  //         "These are the placemarks for category:",
  //         category.title,
  //         category._id,
  //         placemarks
  //       );
  //       placemarks.push(...categoryPlacemarks); // Flatten placemarks into the global array
  //     } else {
  //       console.warn("No placemarks found for category:", category.title);
  //     }
  //   });
  // } catch (error) {
  //   console.error("Error fetching categories and placemarks:", error);
  // }

  // Method to fetch and process categories and placemarks

  // try {
  //   //   placemarks = []; // Clear previous placemarks to avoid duplicates

  //   const response = await placemarkService.getAllCategories(loggedInUser.token);
  //   console.log("User page: ", response);
  //   categories = response;

  //   // Use a for...of loop to handle async/await properly
  //   for (const category of categories) {
  //     const categoryId = category._id;

  // const categoryPlacemarks = await placemarkService.getPlacemarksByCategoryId(
  //   categoryId,
  //   loggedInUser.token
  // );

  //       console.log("These are the placemarks for category:", category.title, categoryId);

  //       // if (categoryPlacemarks && categoryPlacemarks.length > 0) {
  //       //   placemarks = [...placemarks, ...categoryPlacemarks]; // Properly update reactive placemarks array
  //       // } else {
  //       //   console.warn(`No placemarks found for category: ${category.title}`);
  //       // }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories and placemarks:", error);
  //   }
  // }
  const token = loggedInUser.token;
  const email = loggedInUser.email;

  const loggedInUserId = loggedInUser._id;
  onMount(async () => {
    // fetchCategories();
    if (token && email) {
      try {
        const users = await placemarkService.getAllUsers(token);
        const matchedUser = users.find((user) => user.email === email);
        if (matchedUser) {
          user = matchedUser;
          if (matchedUser) console.log("Matched user:", user);
          console.log("This is the timestamp: ", user.createdTimeStamp);
        } else {
          console.log("No user found matching email.");
        }
      } catch (error) {
        console.error("Failed to fetch or filter user:", error);
      }
    } else {
      console.error("Missing token or email.");
    }
  });
</script>

<!-- <section class="box has-background-grey-dark">
  <section class="content p-3">
    <p class="subtitle has-text-white is-size-3 has-text-weight-bold">- Your Categories -</p>
  </section>
</section>

<section class="box">
  <section class="content pl-4">
    <div class="columns">
      <div class="column">
        <p class="is-size-4 mb-2">
          <a href={`/category/${accCatId0}`} class="has-text-grey-light">{accCat0}</a>
        </p>
        <p class="is-size-4 mb-2">
          <a href={`/category/${accCatId1}`} class="has-text-grey-light">{accCat1}</a>
        </p>
        <p class="is-size-4 mb-2">
          <a href={`/category/${accCatId2}`} class="has-text-grey-light">{accCat2}</a>
        </p>
        <p class="is-size-4 mb-6">
          <a href={`/category/${accCatId3}`} class="has-text-grey-light">{accCat3}</a>
        </p>
        <p class="is-size-7">
          * If you have added any categories, they will get displayed in this box.
        </p>
      </div>
    </div>
  </section>
</section> -->

<!-- <section class="box has-background-grey-dark">
  <section class="content p-3">
    <p class="subtitle has-text-white is-size-3 has-text-weight-bold">- About Your Account -</p>
  </section>
</section>

<section class="box">
  <section class="content pl-4">
    <div class="columns">
      <div class="column">
        <p class="is-size-6 mb-2">Created on: {createdTimeStamp}</p>
      </div>
    </div>
  </section>
</section> -->

<section class="box has-background-grey-dark" in:fly={{ y: 200, duration: 3000 }}>
  <section class="content p-3">
    <p class="subtitle has-text-white is-size-3 has-text-weight-bold">- Your Categories -</p>
  </section>
</section>

<section class="box" in:fly={{ y: -200, duration: 3000 }}>
  <section class="content pl-4">
    <div class="columns">
      <div class="column">
        {#each currentCategories.categories as category}
          <!-- {#each categories as category} -->
          <p class="is-size-4 mb-2">
            <a href={`/category/${category._id}`} class="has-text-grey-light">{category.title}</a>
          </p>
        {/each}
        <p class="is-size-7">
          * If you have added any categories, they will get displayed in this box.
        </p>
      </div>
    </div>
  </section>
</section>

<!-- <section class="box has-background-grey-dark">
  <section class="content p-3">
    <p class="subtitle has-text-white is-size-3 has-text-weight-bold">- Your Placemarks -</p>
  </section>
</section>

<section class="box">
  <section class="content pl-4">
    <div class="columns">
      <div class="column">
        {#each placemarks as placemark}
          <p class="is-size-4 mb-2">
            <a
              href={`/category/${placemark.categoryId}/placemark/${placemark._id}`}
              class="has-text-grey-light">{placemark.title}</a
            >
          </p>
        {/each}
      </div>
    </div>
  </section>
</section> -->

<section class="box has-background-grey-dark" in:fly={{ y: 200, duration: 3000 }}>
  <section class="content p-3">
    <p class="subtitle has-text-white is-size-3 has-text-weight-bold">- About Your Account -</p>
  </section>
</section>

{#if user}
  <section class="box" in:fly={{ y: -200, duration: 3000 }}>
    <section class="content pl-4">
      <div class="columns">
        <div class="column">
          <p class="is-size-6 mb-2">Created on: {user.createdTimeStamp}</p>
        </div>
      </div>
    </section>
  </section>
{/if}
