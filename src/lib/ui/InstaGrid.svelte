<script lang="ts">
  import { onMount } from "svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "./services/placemark-service";
  import type { Placemark } from "./types/placemark-types";
  import PlacemarkImage from "./PlacemarkImage.svelte";
  import imageService from "./services/image-service";
  import { fly } from "svelte/transition";
  import DOMPurify from "dompurify";

  // Use Svelte's reactive assignment here
  let title = $state("");
  let img: string[] = [];
  let placemark: Placemark | null = $state(null); // Reactive variable

  /**
   * The below variables will enable me to retrieve tha category and placemark ids
   * https://css-tricks.com/snippets/javascript/get-url-and-url-parts-in-javascript/
   * https://www.slingacademy.com/article/isolating-file-paths-and-directories-using-javascript-string-methods-without-extracting-filename-extension/
   */
  const pathParts = window.location.pathname.split("/");
  const categoryId = pathParts[pathParts.indexOf("category") + 1];
  const placemarkId = pathParts[pathParts.indexOf("placemark") + 1];

  // Fetch placemark data
  async function getPlacemarkTitle() {
    const email = loggedInUser.email;
    const token = loggedInUser.token;

    if (!email || !token) {
      console.error("Missing email or token.");
      return;
    }

    const users = await placemarkService.getAllUsers(token);
    const matchedUser = users.find((user) => user.email === email);

    if (matchedUser) {
      const category = await placemarkService.getCategoryById(categoryId);
      if (!category || !category.placemarks) {
        console.error("Category or placemarks not found.");
        return;
      }
      const placemarkData = await placemarkService.getPlacemarkById( placemarkId);
      if (placemarkData) {
        placemark = placemarkData; // Reactive update
        if (placemark) {
          title = DOMPurify.sanitize(placemark.title);
          // img = placemark.img.map((url: string) => DOMPurify.sanitize(url));
          // title = placemark.title;
          img = placemark.img; // Ensure this is an array
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
        // If the deletion is successful, remove the image from the UI (local state)
        img.splice(index, 1); // Remove image from the img array
      } else {
        console.error("Failed to delete the image.");
      }
    } catch (error) {
      console.error("Error while deleting the image:", error);
    }
  }

  // Run on component mount
  onMount(async () => {
    await getPlacemarkTitle();
  });
  // let visible = $state(true);
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
                <figure class="image">
                  <!-- svelte-ignore a11y_img_redundant_alt -->
                  <img src={image} style="" alt="Placemark Image" />
                </figure>
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
    <PlacemarkImage />
  </div>
</section>
