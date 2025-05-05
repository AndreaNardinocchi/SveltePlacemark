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
            <a href={`/category/${category._id}`} class="has-text-grey-light">
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
