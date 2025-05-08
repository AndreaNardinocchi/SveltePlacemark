<script lang="ts">
  // https://medium.com/@ravipatel.it/a-comprehensive-guide-to-fetching-weather-data-using-javascript-fetch-api-13133d0bc2e6
  // @ts-nocheck
  import { titleLandingPage } from "$lib/shared.svelte";
  import { onMount } from "svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "./services/placemark-service";
  import { fly } from "svelte/transition";
  import DOMPurify from "dompurify"; // Import DOMPurify for sanitization

  let { title = "#instaPlaceMark", subtitle = "InstaMark your InstaPlaces" } = $props();
  let titleShort = $state("");

  /**
   * This is to sanitize any inputs where needed
   * https://github.com/cure53/DOMPurify?tab=readme-ov-file#running-dompurify-on-the-server
   */
  function sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input); // Use DOMPurify to clean the input
  }

  async function getTitle() {
    const email = loggedInUser.email;
    const token = loggedInUser.token;
    const pathParts = window.location.pathname.split("/");
    const categoryId = pathParts[pathParts.indexOf("category") + 1];
    const placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
    console.log("This is the placemarkId in Title: ", placemarkId);

    if (!email || !token) {
      console.error("Missing email or token.");
      return sanitizeInput("");
    }

    if (email && token) {
      const pathParts = window.location.pathname.split("/");
      const categoryId = pathParts[pathParts.indexOf("category") + 1];
      const placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
      const users = await placemarkService.getAllUsers(token);
      const matchedUser = users.find((user) => user.email === email);

      if (matchedUser) {
        const userDetails = matchedUser;
        console.log("Matched user in Title:", userDetails);
        const category = await placemarkService.getCategoryById(categoryId);
        console.log("Category in you Title: ", category);

        if (!category || !category.placemarks) {
          console.error("Category or placemarks not found.");
          return sanitizeInput(titleShort);
        }
        console.log("This is the placemarkId 2 in Title: ", placemarkId);
        const placemark = await placemarkService.getPlacemarkById(placemarkId);
        console.log("Placemark in Title: ", placemark);
        if (!placemark) {
          console.error("Placemark not found for id:", placemarkId);
          return sanitizeInput(titleShort);
        }
        console.log("Placemark found:", placemark);
        titleShort = placemark.title;
        console.log("Placemark Title:", titleShort);
        return sanitizeInput(titleShort);
      } else {
        console.error("No matched user found.");
        return sanitizeInput(titleShort);
      }
    }
    return sanitizeInput(titleShort);
  }

  onMount(async () => {
    titleShort = await getTitle();
  });
</script>

<article class="content px-4">
  <div class="container mt-6">
    <div class="columns">
      <div class="column">
        <p class="title has-text-centered is-2 pt-4 pb-2" in:fly={{ x: 200, duration: 3000 }}>
          {sanitizeInput(title)}
          {sanitizeInput(titleShort)}!
        </p>
        <p class="subtitle has-text-centered mb-6" in:fly={{ y: 200, duration: 500 }}>
          {sanitizeInput(subtitle)}
        </p>
      </div>
    </div>
  </div>
</article>
