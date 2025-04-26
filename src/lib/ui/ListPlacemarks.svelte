<script lang="ts">
  // let { placemarks = [] } = $props();
  // console.log("These are the categories: ", placemarks);

  import { placemarkService } from "$lib/ui/services/placemark-service";
  import CategoryBanner from "$lib/ui/CategoryBanner.svelte";
  import type { Category, Placemark } from "$lib/ui/types/placemark-types";
  import { onMount } from "svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { goto } from "$app/navigation";

  // svelte-ignore non_reactive_update
  let category: Category | null = null;
  // let placemarks: Placemark[] = [];

  let placemarks = $state<Placemark[]>([]);

  onMount(async () => {
    const url = window.location.pathname;
    const categoryId = url.split("/").pop();
    const token = loggedInUser.token;

    if (categoryId && token) {
      // Fetch full category
      const result = await placemarkService.getCategoryById(categoryId);

      if (result) {
        category = result;
        placemarks = result.placemarks; // Make sure placemarks are part of the category object
      } else {
        console.warn("Category not found.");
      }
    } else {
      console.warn("Invalid category ID or token.");
    }
  });

  async function deletePlacemark(placemarkId: string) {
    console.log("This is the placemarkId: ", placemarkId);

    if (!placemarkId) {
      console.warn("No placemark ID provided.");
      return;
    }

    // Optional: You can fetch the placemark details first if needed
    // const placemark = await placemarkService.getPlacemarkById(placemarkId);
    // if (!placemark) {
    //   console.warn("Invalid placemark returned.");
    //   return;
    // }

    const success = await placemarkService.deletePlacemark(placemarkId);
    if (success) {
      console.log(`Placemark with ID ${placemarkId} was successfully deleted.`);
      goto(`/category/${category?._id}`); // Or refresh the current route/list as needed
    } else {
      console.warn("Failed to delete placemark.");
    }
  }
</script>

<div class="mt-6"></div>
{#each placemarks as placemark}
  <div class="card has-text-dark-grey">
    <header class="card-header has-text-centered">
      <p class="card-header-title">
        <a href={`/category/${category._id}/placemark/${placemark._id}`} class="has-text-grey">
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
            <p><span class="has-text-weight-bold">Placemark Name:</span><br />{placemark.title}</p>
            <p>
              <span class="has-text-weight-bold">Geolocation (lat/long):</span><br />
              {placemark.lat} / {placemark.long}
            </p>
            <p><span class="has-text-weight-bold">Address:</span><br /> {placemark.address}</p>
            <p><span class="has-text-weight-bold">Phone number:</span><br /> {placemark.phone}</p>
          </div>
          <div class="column is-5 pr-5 pb-4">
            <p><span class="has-text-weight-bold">Country:</span><br /> {placemark.country}</p>
            <p>
              <span class="has-text-weight-bold">Website:</span><br />
              <span style="word-wrap: break-word;">
                <a href={placemark.website} target="_blank" class="has-text-grey"
                  >{placemark.website}</a
                >
              </span>
            </p>
            <p>
              <span class="has-text-weight-bold">Description:</span><br />
              {placemark.description}
            </p>
            <p><span class="has-text-weight-bold">Visited:</span> {placemark.visited}</p>
          </div>
          <div class="column is-4">
            <p><span class="has-text-weight-bold">Map Placeholder:</span><br /></p>
            <iframe
              class="mt-2"
              title={placemark.title}
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19694.431967599397!2d-8.4167813!3d51.901040949999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48449bee2f866ab1%3A0x4b0e792b7b212ab7!2sDistrict%20Health%20%26%20Leisure!5e0!3m2!1sen!2sie!4v1739290933254!5m2!1sen!2sie`}
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              height="200"
              style="border:0; white; box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);border-radius: 15px;"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <!-- placemark._id -->
      <a
        href={`/category/${category._id}/editplacemark/${placemark._id}`}
        class="button card-footer-item"
        aria-label="edit icon"
      >
        <span class="icon is-small">
          <i class="fas fa-solid fa-edit"></i>
        </span>
      </a>
      <!-- svelte-ignore event_directive_deprecated -->
      <!-- svelte-ignore a11y_invalid_attribute -->
      <!-- https://dev.to/umanghome/event-handlers-and-svelte-4f5k
      https://stackoverflow.com/questions/77594143/svelte-how-to-prevent-default-action-of-reusable-button-component
      https://github.com/bestguy/sveltestrap/blob/master/src/Button.svelte
      https://svelte.dev/docs/svelte/legacy-on -->
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
