<script lang="ts">
  import type { Category } from "$lib/ui/types/placemark-types";
  import { onMount } from "svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { currentCategories, loggedInUser } from "$lib/runes.svelte";
  import { goto } from "$app/navigation";
  import DOMPurify from "dompurify";

  let categories: Category[] = [];

  let title = $state("");
  let userid = loggedInUser._id;
  let notes = $state("");
  let image = $state("");
  let message = $state("");

  // Sanitized values for output
  // svelte-ignore non_reactive_update -->
  let safeNotes = "";
  // svelte-ignore non_reactive_update -->
  let safeImage = "";

  $effect(() => {
    if (title === "Restaurants") {
      image = "https://i.ibb.co/gZjF0ppp/jerk-pasta-recipe.png";
      notes =
        "All restaurants you would like to dine or you already had the pleasure to be in can be added and listed here. Just a handy note for your next trip.";
    } else if (title === "Museums") {
      image = "https://i.ibb.co/HD39FR6p/man-2590655-big.jpg";
      notes =
        "This is the category in which all worldwide famous museums or art galleries you wish to visit or you already visited can be added to.";
    } else if (title === "Beaches") {
      image = "https://i.ibb.co/LhrJWjcb/coast-7366616.jpg";
      notes =
        "There are surely so many beaches you would like to sunbath in and relish the sweet marine breeze caressing your skin. Why not list them all here?";
    } else if (title === "Parks") {
      image = "https://i.ibb.co/pjbvydw1/parks.jpg";
      notes =
        "Sometimes, there is no better thing to do than slipping in your running shoes for a jog in the park. Which park are you gonna go next though?";
    } else {
      image = "";
      notes = "";
    }

    // Sanitize only for rendering
    safeNotes = DOMPurify.sanitize(notes);
    safeImage = DOMPurify.sanitize(image);
  });

  onMount(async () => {
    const allCategories = await placemarkService.getAllCategories(loggedInUser.token);
    categories = allCategories.filter((cat) => cat.userid === loggedInUser._id);
  });

  function handleTitleChange(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    const existingTitles = currentCategories.categories.map((cat) =>
      cat.title.trim().toLowerCase()
    );

    if (existingTitles.includes(selected.trim().toLowerCase())) {
      message = "!!! This category already exists. Please choose a different one...!!!";
      title = "";
      goto("/dashboard");
    } else {
      title = selected;
      message = "";
    }
  }

  async function addCategory() {
    let category: Category = {
      title,
      userid,
      notes,
      image,
      placemarks: []
    };

    let success = await placemarkService.addCategory(category);
    if (success) {
      localStorage.setItem("categoryTitle", category.title);
      placemarkService.refreshPlacemarksInfo();
      goto("/dashboard");
    } else {
      message = "Error Trying to sign up";
    }
  }
</script>

<section class="content mt-6 mb-5 mx-3">
  <article>
    <p class="subtitle has-text-weight-bold">About your categories</p>
    <p>
      Select your categories below where you can list all destinations you would like to visit soon!
    </p>
  </article>
</section>

<section class="box">
  <div class="field">
    <div class="control">
      <label class="label">
        Category Title - ** Only 4 PlaceMark categories are allowed 👮‍♂️**
        <div class="select is-fullwidth">
          <!-- svelte-ignore event_directive_deprecated -->
          <select name="category" bind:value={title} on:change={handleTitleChange}>
            <option class="has-text-grey-light" value="" disabled selected>
              Select your category
            </option>
            <option value="Restaurants">Restaurants</option>
            <option value="Museums">Museums</option>
            <option value="Parks">Parks</option>
            <option value="Beaches">Beaches</option>
          </select>
        </div>
      </label>
    </div>
  </div>

  {#if safeImage}
    <figure class="image is-3by1 mt-4">
      <img src={safeImage} alt={title} />
    </figure>
  {/if}

  {#if safeNotes}
    <div class="mt-3 has-text-info">
      {@html safeNotes}
    </div>
  {/if}

  {#if message}
    <div class="notification is-warning mt-3">{message}</div>
  {/if}

  <div class="columns">
    <div class="column is-3">
      <!-- svelte-ignore event_directive_deprecated -->
      <button on:click={addCategory} class="button is-info has-text-white mt-3">
        Add Category
      </button>
    </div>
  </div>
</section>
