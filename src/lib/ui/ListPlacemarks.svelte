<script lang="ts">
  import { fly } from "svelte/transition";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { onMount } from "svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { goto } from "$app/navigation";
  import { currentCategories } from "$lib/runes.svelte";
  import DOMPurify from "dompurify";

  // ############### REMEMBER THAT THE NEW MAPS BRING ABOUT THE REFRESH ISSUE 500 (Internal Server Error) ############//

  // Using the below enables me to retrieve the categoryId
  // https://stackoverflow.com/questions/23690234/getting-last-segment-of-url-in-javascript?
  // https://www.geeksforgeeks.org/how-to-get-url-and-url-parts-in-javascript/
  const url = window.location.pathname;
  const categoryId = url.split("/").pop();
  let category = currentCategories.categories.find((cat) => cat._id === categoryId);
  import { currentPlacemarks } from "$lib/runes.svelte";
  import { refreshPlacemarkMap } from "./services/placemark-utils";

  let map: any;
  import LeafletMapMulti from "./LeafletMapMulti.svelte";

  // let user: User;

  console.log("These are the placemarks :", currentPlacemarks.placemarks);

  /**
   * This is to sanitize any inputs where needed
   * https://github.com/cure53/DOMPurify?tab=readme-ov-file#running-dompurify-on-the-server
   */
  function sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input); // Use DOMPurify to clean the input
  }

  onMount(async () => {
   // await refreshPlacemarkMap(map);
    await placemarkService.refreshPlacemarksInfo();
  });

  onMount(async () => {
    // This is the control the 'window is not defined' error (typeOf' is prompted by VsCode itself)
    if (typeof window !== "undefined") {
      const url = window.location.pathname;
      const categoryId = url.split("/").pop();
      console.log("Category ID:", categoryId);
    }

    // categoryId = url.split("/").pop();
    const token = loggedInUser.token;
    const email = loggedInUser.email;

    // if (token && email) {
    //   try {
    //     const users = await placemarkService.getAllUsers(token);
    //     const matchedUser = users.find((user) => user.email === email);
    //     if (matchedUser) {
    //       user = matchedUser;
    //       console.log("Matched user:", user);
    //       console.log("This is the timestamp: ", user.createdTimeStamp);
    //     } else {
    //       console.log("No user found matching email.");
    //     }
    //   } catch (error) {
    //     console.error("Failed to fetch or filter user:", error);
    //   }
    // } else {
    //   console.error("Missing token or email.");
    // }

    if (token && categoryId) {
      const result = await placemarkService.getCategoryById(categoryId);
      if (result) {
        let category = result;
        // Fetch full category
        currentPlacemarks.placemarks = category.placemarks;
        console.log("Our placemarks: ", category.placemarks);
        // Make sure placemarks are part of the category object
      } else {
        console.warn("Category not found.");
      }
    } else {
      console.warn("Invalid category ID or token.");
    }
    return "";
  });

  async function deletePlacemark(placemarkId: string) {
    console.log("This is the placemarkId: ", placemarkId);

    if (!placemarkId) {
      console.warn("No placemark ID provided.");
      return;
    }

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
{#each currentPlacemarks.placemarks as placemark}
  <div class="card has-text-dark-grey" in:fly={{ y: 200, duration: 3000 }}>
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
            <p>
              <span class="has-text-weight-bold">Placemark Name:</span><br />{sanitizeInput(
                placemark.title
              )}
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
                <a href={sanitizeInput(placemark.website)} target="_blank" class="has-text-grey"
                  >{sanitizeInput(placemark.website)}</a
                >
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
            <p><span class="has-text-weight-bold">Map:</span><br /></p>
            <LeafletMapMulti
              lat={parseFloat(placemark.lat)}
              lng={parseFloat(placemark.long)}
              popupText={`${placemark.title}, ${placemark.country} `}
              height={30}
            />


            <!-- <iframe
              class="mt-2"
              title={sanitizeInput(placemark.title)}
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19694.431967599397!2d-8.4167813!3d51.901040949999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48449bee2f866ab1%3A0x4b0e792b7b212ab7!2sDistrict%20Health%20%26%20Leisure!5e0!3m2!1sen!2sie!4v1739290933254!5m2!1sen!2sie`}
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              height="200"
              style="border:0; white; box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);border-radius: 15px;"
            ></iframe> -->
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
