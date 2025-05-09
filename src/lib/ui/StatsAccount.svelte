<script lang="ts">
  import { placemarkService } from "./services/placemark-service";
  import { onMount } from "svelte";
  import { currentCategories, loggedInUser } from "$lib/runes.svelte";
  import type { User } from "./types/placemark-types";
  import { fly } from "svelte/transition";
  /** Imported DOMPurify for sanitization
   *  https://www.npmjs.com/package/dompurify
   * */
  import DOMPurify from "dompurify";
  import { goto } from "$app/navigation";

  let categories: any[] = [];
  let placemarks: any[] = [];
  let user: User;
  let categoryPlacemarks: never[] = [];
  console.log("These are the categoryPlacemarks: ", categoryPlacemarks);

  const token = loggedInUser.token;
  const email = loggedInUser.email;
  const loggedInUserId = loggedInUser._id;

  // Sanitize function using DOMPurify
  function sanitize(input: string): string {
    return DOMPurify.sanitize(input);
  }

  /**
   * Function to handle category selection
   * The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled,
   * its default action should not be taken as it normally would be.
   * https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
   * */
  function onCategorySelect(categoryId: string, event: Event) {
    event.preventDefault(); // Prevent the default link navigation

    const validCategory = currentCategories.categories.find(
      (category) => category._id === categoryId
    );

    if (!validCategory) {
      console.warn("Selected category not found.");
      return;
    }

    // Ensure _id is a valid string before using it, and I am using it since the localStorage.setItem("categoryId", categoryIdString); throws
    // me an error 'Type 'undefined' is not assignable to type 'string'.''
    const categoryIdString = validCategory._id || "DefaultCategoryId";

    // Sanitize categoryTitle and categoryId before storing in localStorage
    const sanitizedCategoryTitle = DOMPurify.sanitize(validCategory.title);
    const sanitizedCategoryId = DOMPurify.sanitize(categoryIdString);

    // Store the categoryId and categoryTitle in localStorage
    localStorage.setItem("categoryTitle", sanitizedCategoryTitle);
    localStorage.setItem("categoryId", sanitizedCategoryId);
    console.log("Sending the categoryTitle:", sanitizedCategoryTitle, sanitizedCategoryId);

    goto(`/category/${sanitizedCategoryId}`);
    // Call the placemarkService to refresh the placemarks for the selected category
    //  placemarkService.refreshPlacemarksInfo();
  }

  onMount(async () => {
    if (token && email) {
      try {
        const users = await placemarkService.getAllUsers(token);
        const matchedUser = users.find((user) => user.email === email);
        if (matchedUser) {
          user = matchedUser;
          console.log("Matched user:", user);
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
          <p class="is-size-4 mb-2">
            <a
              href={`/category/${category._id}`}
              class="has-text-grey-light"
              on:click={(event) => onCategorySelect(category._id!, event)}
            >
              <!-- Sanitized output -->
              {@html sanitize(category.title)}
            </a>
          </p>
        {/each}
        <p class="is-size-7">
          * If you have added any categories, they will get displayed in this box.
        </p>
      </div>
    </div>
  </section>
</section>

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
