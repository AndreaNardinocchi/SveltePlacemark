<script lang="ts">
  import { onMount } from "svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "./services/placemark-service";
  import type { Placemark } from "./types/placemark-types";
  import PlacemarkImage from "./PlacemarkImage.svelte";
  import imageService from "./services/image-service";
  import { fly } from "svelte/transition";
  import DOMPurify from "dompurify";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  // Use Svelte's reactive assignment here
  let title = $state("");
  // The variable img is a list of strings
  let img: string[] = [];
  // Declares a reactive state variable
  let placemark: Placemark | null = $state(null);

  /**
   * The below variables will enable me to retrieve tha category and placemark ids
   * https://css-tricks.com/snippets/javascript/get-url-and-url-parts-in-javascript/
   * https://www.slingacademy.com/article/isolating-file-paths-and-directories-using-javascript-string-methods-without-extracting-filename-extension/
   */
  const pathParts = window.location.pathname.split("/");
  const categoryId = pathParts[pathParts.indexOf("category") + 1];
  const placemarkId = pathParts[pathParts.indexOf("placemark") + 1];

  // Fetching placemark data
  async function getPlacemarkTitleAndImages() {
    const email = loggedInUser.email;
    const token = loggedInUser.token;

    if (!email || !token) {
      console.error("Missing email or token.");
      return;
    }

    const users = await placemarkService.getAllUsers(token);
    // const matchedUser = users.find((user) => user.email === email);
    const matchedUser = loggedInUser;

    if (matchedUser) {
      const category = await placemarkService.getCategoryById(categoryId);
      if (!category || !category.placemarks) {
        console.error("Category or placemarks not found.");
        return;
      }
      const placemarkData = await placemarkService.getPlacemarkById(placemarkId);
      if (placemarkData) {
        placemark = placemarkData; // Reactive update
        if (placemark) {
          title = DOMPurify.sanitize(placemark.title);
          // img = placemark.img.map((url: string) => DOMPurify.sanitize(url));
          //  title = placemark.title;
          /** For some reason, using 'img' as a simple string will ensure a deletion with
          /* automatic refresh on the page
          */
          //  img = placemark.img;
          img = [...placemark.img]; // This forces a reactive update
        }
      } else {
        console.error("Placemark not found.");
      }
    }
  }

  // Delete image function
  async function deleteImage(index: number) {
    const token = loggedInUser.token;
    if (!token) {
      console.error("Missing token.");
      return;
    }
    try {
      // Call the deleteImage function in placemarkService
      const result = await imageService.deleteImage(categoryId, placemarkId, index);
      if (result) {
        // Refreshing image gallery after deletion
        await refreshImages();
        // If the deletion is successful, remove the image from the UI (local state)
        img.splice(index, 1); // Remove image from the img array
      } else {
        console.error("Failed to delete the image.");
      }
    } catch (error) {
      console.error("Error while deleting the image:", error);
    }
  }

  async function refreshImages() {
    await getPlacemarkTitleAndImages(); // this will update the `placemark` and `img` variables
  }

  // Running on component mount
  onMount(async () => {
    await getPlacemarkTitleAndImages();
    await refreshImages();
  });
</script>

<section class="section">
  <div class="container has-text-centered">
    <p class="title has-text-centered is-size-5">@{title}</p>
    <!-- Check if placemark is not null and has images -->
    {#if placemark && placemark.img && placemark.img.length > 0}
      <div class="columns is-multiline pt-3" in:fly={{ y: 200, duration: 4000 }}>
        <!-- https://svelte.dev/tutorial/svelte/each-blocks -->
        {#each placemark?.img as image, index}
          <div class="column is-4">
            <div class="card">
              <div class="card-image">
                <a href={image} target="_blank">
                  <figure class="image is-4by3">
                    <!-- svelte-ignore a11y_img_redundant_alt -->
                    <!-- https://www.w3schools.com/csS/css3_object-fit.asp -->
                    <img
                      src={image}
                      alt="Placemark Image"
                      style="width: 100%; height: 100%; object-fit: cover;"
                    />
                  </figure>
                </a>
                <footer class="card-footer">
                  <!-- svelte-ignore event_directive_deprecated -->
                  <!-- svelte-ignore a11y_invalid_attribute -->
                  <a
                    href="#"
                    on:click|preventDefault={() => deleteImage(index)}
                    class="button card-footer-item"
                    aria-label="delete icon"
                  >
                    <span class="icon is-small">
                      <i class="fas fa-solid fa-trash"></i>
                    </span>
                  </a>
                </footer>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p>Loading images...</p>
    {/if}
    <div class="columns has-text-centered">
      <div class="column is-4"></div>
      <div class="column is-4 is-offset-1 has-text-centered">
        <div class="buttons mt-6">
          <a href={`/category/${categoryId}`}>
            <h2 class="title is-size-3 has-text-grey">Back to category →</h2>
          </a>
        </div>
      </div>
      <div class="column is-4 has-text-centered"></div>
    </div>
    <!-- The uploaded event will get caught and the refreshImages() function will run -->
    <PlacemarkImage
      on:uploaded={() => {
        console.log("Parent caught uploaded event");
        refreshImages();
      }}
    />
  </div>
</section>
