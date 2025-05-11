<script lang="ts">
  import { fly } from "svelte/transition";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { onMount } from "svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { goto } from "$app/navigation";
  import { currentCategories, currentPlacemarks } from "$lib/runes.svelte";
  import DOMPurify from "dompurify";
  import LeafletMapMulti from "./LeafletMapMulti.svelte";
  import type { Placemark } from "./types/placemark-types";

  export let placemarkDeletedEvent: (placemark: Placemark) => void;

  /**
   * The below variables will enable me to retrieve tha category and placemark ids
   * https://css-tricks.com/snippets/javascript/get-url-and-url-parts-in-javascript/
   * https://www.slingacademy.com/article/isolating-file-paths-and-directories-using-javascript-string-methods-without-extracting-filename-extension/
   */
  const url = window.location.pathname;
  const categoryId = url.split("/").pop();
  let category = currentCategories.categories.find((cat) => cat._id === categoryId);

  function sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input);
  }

  onMount(async () => {
    await placemarkService.refreshPlacemarksInfo();
    // Confirming we're running in the browser
    if (typeof window !== "undefined") {
      const categoryId = window.location.pathname.split("/").pop();
      console.log("Category ID:", categoryId);
    }

    const token = loggedInUser.token;

    if (token && categoryId) {
      const result = await placemarkService.getCategoryById(categoryId);
      if (result) {
        category = result;
        // Retrieving all category placemarks and reassigning to 'currentPlacemarks.placemarks'
        currentPlacemarks.placemarks = result.placemarks;
        console.log("Our placemarks: ", result.placemarks);
      } else {
        console.warn("Category not found.");
      }
    } else {
      console.warn("Invalid category ID or token.");
    }
  });

  // Function to delete a placemark
  async function deletePlacemark(placemarkId: string) {
    const placemark = currentPlacemarks.placemarks.find((p) => p._id === placemarkId);
    if (!placemarkId) {
      console.warn("No placemark ID provided.");
      return;
    }

    const success = await placemarkService.deletePlacemark(placemarkId);
    if (success) {
      await placemarkService.refreshPlacemarksInfo();
      console.log(`Placemark with ID ${placemarkId} was successfully deleted.`);

      if (placemark && placemarkDeletedEvent) {
        placemarkDeletedEvent(placemark);
      }

      goto(`/category/${category?._id}`);
    } else {
      console.warn("Failed to delete placemark.");
    }
  }

  // Navigate to the specific placemark landing page
  async function onPlacemarkSelect(categoryId: string, placemarkId: string, event: Event) {
    event.preventDefault();

    const validCategory = currentCategories.categories.find((cat) => cat._id === categoryId);
    if (!validCategory) {
      console.warn("Selected category not found.");
      return;
    }

    try {
      const updatedPlacemark = await placemarkService.getPlacemarkById(placemarkId);
      if (!updatedPlacemark) {
        console.warn("Could not fetch updated placemark.");
        return;
      }

      // Saving the placemark ID for persistence
      localStorage.setItem("placemarkId", placemarkId); // Save for refresh

      /** To make sure the local Svelte store contains the most recent data for the selected placemark,
       * and then navigate to its detail page, we search the current list of placemarks for one with the matching _id
       * Returns the index if found, or -1 if not found.
       * */
      const index = currentPlacemarks.placemarks.findIndex((p) => p._id === placemarkId);
      if (index !== -1) {
        // If the placemark is already in the store, it updates that item with fresh data, which is
        // 'updatedPlacemark'
        currentPlacemarks.placemarks[index] = updatedPlacemark;
      } else {
        // If the placemark isn’t found in the store (maybe it’s new), it adds it to the array
        currentPlacemarks.placemarks.push(updatedPlacemark);
      }

      goto(`/category/${categoryId}/placemark/${placemarkId}`);
    } catch (err) {
      console.error("Error in onPlacemarkSelect:", err);
    }
  }
</script>

<div class="mt-6"></div>
{#each currentPlacemarks.placemarks as placemark}
  <div class="card has-text-dark-grey" in:fly={{ y: 200, duration: 3000 }}>
    <header class="card-header has-text-centered">
      <p class="card-header-title">
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a
          href="#"
          class="has-text-grey"
          on:click={(e) => onPlacemarkSelect(category._id, placemark._id, e)}
        >
          {placemark.title}
        </a>
      </p>
      <p class="has-text-right mt-4"><i class="fas fa-solid fa-plane"></i></p>
      <button class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="columns">
          <div class="column is-3">
            <p>
              <span class="has-text-weight-bold">Placemark Name:</span><br />
              {sanitizeInput(placemark.title)}
            </p>
            <p>
              <span class="has-text-weight-bold">Geolocation (lat/long):</span><br />
              {placemark.lat} / {placemark.long}
            </p>
            <p>
              <span class="has-text-weight-bold">Address:</span><br />
              {sanitizeInput(placemark.address)}
            </p>
            <p>
              <span class="has-text-weight-bold">Phone number:</span><br />
              {sanitizeInput(placemark.phone)}
            </p>
          </div>
          <div class="column is-5 pr-5 pb-4">
            <p>
              <span class="has-text-weight-bold">Country:</span><br />
              {sanitizeInput(placemark.country)}
            </p>
            <p>
              <span class="has-text-weight-bold">Website:</span><br />
              <span style="word-wrap: break-word;">
                <a href={sanitizeInput(placemark.website)} target="_blank" class="has-text-grey">
                  {sanitizeInput(placemark.website)}
                </a>
              </span>
            </p>
            <p>
              <span class="has-text-weight-bold">Description:</span><br />
              {sanitizeInput(placemark.description)}
            </p>
            <p>
              <span class="has-text-weight-bold">Visited:</span>
              {sanitizeInput(placemark.visited)}
            </p>
          </div>
          <div class="column is-4">
            <p><span class="has-text-weight-bold">{placemark.title}'s Map</span><br /></p>
            <LeafletMapMulti
              lat={parseFloat(placemark.lat)}
              lng={parseFloat(placemark.long)}
              popupText={`${placemark.title}, ${placemark.country}`}
              height={22}
            />
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a
        href={`/category/${category._id}/editplacemark/${placemark._id}`}
        class="button card-footer-item"
        aria-label="edit icon"
      >
        <span class="icon is-small">
          <i class="fas fa-solid fa-edit"></i>
        </span>
      </a>
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a
        href="#"
        on:click|preventDefault={() => deletePlacemark(placemark._id)}
        class="button card-footer-item"
        aria-label="delete icon"
      >
        <span class="icon is-small">
          <i class="fas fa-solid fa-trash"></i>
        </span>
      </a>
    </footer>
  </div>
{/each}
