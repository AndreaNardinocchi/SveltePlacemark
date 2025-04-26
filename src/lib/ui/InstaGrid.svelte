<script lang="ts">
  import { onMount } from "svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "./services/placemark-service";
  import type { Placemark } from "./types/placemark-types";
  import PlacemarkImage from "./PlacemarkImage.svelte";
  import imageService from "./services/image-service";
  import { fly } from "svelte/transition";

  // Use Svelte's reactive assignment here
  let title = $state("");
  let img: string[] = [];
  let placemark: Placemark | null = $state(null); // Reactive variable

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

      const placemarkData = await placemarkService.getPlacemarkById(categoryId, placemarkId);
      if (placemarkData) {
        placemark = placemarkData; // Reactive update
        title = placemark.title;
        img = placemark.img; // Ensure this is an array
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

  let visible = $state(true);
</script>

<section class="section">
  <div class="container has-text-centered">
    <p class="title has-text-centered is-size-5">@{title}</p>
    <!-- Check if placemark is not null and has images -->
    {#if placemark && placemark.img && placemark.img.length > 0}
      <div class="columns is-multiline pt-3" in:fly={{ y: 200, duration: 4000 }}>
        {#each placemark.img as image, index}
          <div class="column is-4">
            <div class="card">
              <div class="card-image">
                <figure class="image">
                  <!-- svelte-ignore a11y_img_redundant_alt -->
                  <img src={image} style="" alt="Placemark Image" />
                </figure>
                <footer class="card-footer">
                  <!-- svelte-ignore a11y_consider_explicit_label -->
                  <!-- <a
                    href={`/category/${categoryId}/placemark/${placemarkId}/deleteimage/${index}`}
                    class="button card-footer-item has-text-gray"
                  >
                    <span class="icon is-small">
                      <i class="fas fa-solid fa-trash"></i>
                    </span>
                  </a> -->
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

<!-- <script lang="ts">
  import { onMount } from "svelte";
  import { placemarkService } from "./services/placemark-service";
  import { loggedInUser } from "$lib/runes.svelte";
  import type { Placemark } from "./types/placemark-types";

  let title = $state("");
  let img: string[] = [];
  let placemark: Placemark | null = null;

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

      const placemarkData = await placemarkService.getPlacemarkById(categoryId, placemarkId);
      if (placemarkData) {
        placemark = placemarkData;
        title = placemark.title;
        img = placemark.img;
      } else {
        console.error("Placemark not found.");
      }
    }
  }

  // Run on component mount
  onMount(async () => {
    await getPlacemarkTitle();
  });

  let visible = $state(true);
</script>

<section class="section">
  <div class="container has-text-centered">
    {#if placemark && placemark.img && placemark.img.length > 0}
      <div class="columns is-multiline pt-3">
        {#each placemark.img as image, index}
          <div class="column is-4">
            <div class="card">
              <div class="card-image">
                <figure class="image">
                  <img src={image} style="border-radius: 10px;" alt="Placemark Image" />
                </figure>
                <footer class="card-footer">
                  <a
                    href={`/category/${categoryId}/placemark/${placemarkId}/deleteimage/${index}`}
                    class="button card-footer-item has-text-gray"
                  >
                    <span class="icon is-small">
                      <i class="fas fa-trash"></i>
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
</section> -->

<!-- CONTENTE TO PUT BACK IN-->
<!-- <button class="mb-6 px-6 button is-info has-text-white" onclick={() => (visible = !visible)}>
      {visible ? "Hide #instaPlaceGallery" : "Show #instaPlaceGallery"}
    </button> -->

<!-- {#if visible}
      <h5
        class="title has-text-centered is-size-5"
        in:fly={{ y: 200, duration: 500 }}
        out:fly={{ y: -200, duration: 500 }}
      >
        @{title}
      </h5>

      <div class="columns is-multiline pt-3">
        <div
          class="column is-4"
          in:fly={{ y: 200, duration: 500 }}
          out:fly={{ x: 200, duration: 500 }}
        >
          <figure class="image">
            <img src={image} style="border-radius: 10px;" alt={alt1} />
          </figure>
        </div>
        <div
          class="column is-4"
          in:fly={{ y: 200, duration: 1000 }}
          out:fly={{ x: 200, duration: 1000 }}
        >
          <figure class="image">
            <img
              src="https://i.ibb.co/M66kktn/travel.jpg"
              style="border-radius: 10px;"
              alt={alt2}
            />
          </figure>
        </div>
        <div
          class="column is-4"
          in:fly={{ y: 200, duration: 1200 }}
          out:fly={{ x: 200, duration: 1200 }}
        >
          <figure class="image">
            <img
              src="https://i.ibb.co/M66kktn/travel.jpg"
              style="border-radius: 10px;"
              alt={alt3}
            />
          </figure>
        </div>
        <div
          class="column is-4"
          in:fly={{ y: 200, duration: 500 }}
          out:fly={{ x: -200, duration: 500 }}
        >
          <figure class="image">
            <img
              src="https://i.ibb.co/M66kktn/travel.jpg"
              style="border-radius: 10px;"
              alt={alt4}
            />
          </figure>
        </div>
        <div
          class="column is-4"
          in:fly={{ y: 200, duration: 1000 }}
          out:fly={{ x: -200, duration: 1000 }}
        >
          <figure class="image">
            <img
              src="https://i.ibb.co/M66kktn/travel.jpg"
              style="border-radius: 10px;"
              alt={alt5}
            />
          </figure>
        </div>
        <div
          class="column is-4"
          in:fly={{ y: 200, duration: 1200 }}
          out:fly={{ x: -200, duration: 1200 }}
        >
          <figure class="image">
            <img
              src="https://i.ibb.co/M66kktn/travel.jpg"
              style="border-radius: 10px;"
              alt={alt6}
            />
          </figure>
        </div>
        <div
          class="column is-4"
          in:fly={{ y: 200, duration: 500 }}
          out:fly={{ x: 200, duration: 500 }}
        >
          <figure class="image">
            <img
              src="https://i.ibb.co/M66kktn/travel.jpg"
              style="border-radius: 10px;"
              alt={alt7}
            />
          </figure>
        </div>
        <div
          class="column is-4"
          in:fly={{ y: 200, duration: 1000 }}
          out:fly={{ x: 200, duration: 1000 }}
        >
          <figure class="image">
            <img
              src="https://i.ibb.co/M66kktn/travel.jpg"
              style="border-radius: 10px;"
              alt={alt8}
            />
          </figure>
        </div>
        <div
          class="column is-4"
          in:fly={{ y: 200, duration: 1200 }}
          out:fly={{ x: 200, duration: 1200 }}
        >
          <figure class="image">
            <img
              src="https://i.ibb.co/M66kktn/travel.jpg"
              style="border-radius: 10px;"
              alt={alt9}
            />
          </figure>
        </div>
        <div
          class="column is-4"
          in:fly={{ y: 200, duration: 500 }}
          out:fly={{ x: -200, duration: 500 }}
        >
          <figure class="image">
            <img
              src="https://i.ibb.co/M66kktn/travel.jpg"
              style="border-radius: 10px;"
              alt={alt10}
            />
          </figure>
        </div>
        <div
          class="column is-4"
          in:fly={{ y: 200, duration: 1000 }}
          out:fly={{ x: -200, duration: 1000 }}
        >
          <figure class="image">
            <img
              src="https://i.ibb.co/M66kktn/travel.jpg"
              style="border-radius: 10px;"
              alt={alt11}
            />
          </figure>
        </div>
        <div
          class="column is-4"
          in:fly={{ y: 200, duration: 1200 }}
          out:fly={{ x: -200, duration: 1200 }}
        >
          <figure class="image">
            <img
              src="https://i.ibb.co/M66kktn/travel.jpg"
              style="border-radius: 10px;"
              alt={alt12}
            />
          </figure>
        </div>
      </div>
    {/if} -->
<!-- </div> -->

<!-- <script lang="ts">
  import { onMount } from "svelte";
  import { placemarkService } from "./services/placemark-service";
  import { loggedInUser } from "$lib/runes.svelte";
  import type { Placemark } from "./types/placemark-types";

  let title = $state("");
  let img: string[] = [];
  let placemark: Placemark;

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

      const placemarkData = await placemarkService.getPlacemarkById(categoryId, placemarkId);
      if (placemarkData) {
        placemark = placemarkData;
        title = placemark.title;
        img = placemark.img;
      } else {
        console.error("Placemark not found.");
      }
    }
  }

  // Run on component mount
  onMount(async () => {
    await getPlacemarkTitle();
  });

  let visible = $state(true);
</script>

<section class="section">
  <div class="container has-text-centered">
    {#if placemark && placemark.img && placemark.img.length > 0}
      <div class="columns is-multiline pt-3">
        {#each placemark.img as image, index}
          <div class="column is-4">
            <div class="card">
              <div class="card-image">
                <figure class="image">
                  svelte-ignore a11y_img_redundant_alt 
                  <img src={image} style="border-radius: 10px;" alt="Placemark Image" />
                </figure>
                <footer class="card-footer">
                  <!-- svelte-ignore a11y_consider_explicit_label 
                  <a
                    href={`/category/${categoryId}/placemark/${placemarkId}/deleteimage/${index}`}
                    class="button card-footer-item has-text-gray"
                  >
                    <span class="icon is-small">
                      <i class="fas fa-trash"></i>
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
  </div>
</section> -->
