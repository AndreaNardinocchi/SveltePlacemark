<script lang="ts">
  import ListCategories from "$lib/ui/ListCategories.svelte";
  import type { Category } from "$lib/ui/types/placemark-types";
  import { onMount } from "svelte";
  // https://www.npmjs.com/package/svelte-fa
  // import Dashboard from "./Dashboard.svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { currentCategories, loggedInUser } from "$lib/runes.svelte";
  import DashboardBanner from "$lib/ui/DashboardBanner.svelte";
  import { goto } from "$app/navigation";

  let categories: Category[] = [];

  let title = $state("");
  let userid = loggedInUser._id;
  console.log("This is the userid when trying to add a new category:", loggedInUser._id);
  let notes = $state("");
  let image = $state("");

  // ✅ Runes-style reactivity using `effect`
  // https://svelte.dev/docs/svelte/$effect and https://www.reddit.com/r/sveltejs/comments/1785b6q/when_the_effect_rune_is_supposed_to_run/
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
  });

  let message = $state("");

  onMount(async () => {
    const allCategories = await placemarkService.getAllCategories(loggedInUser.token);
    // Filter categories belonging to the logged-in user
    categories = allCategories.filter((cat) => cat.userid === loggedInUser._id);

    console.log("Filtered user categories:", categories);
  });

  // $effect(() => {
  //   if (!title || categories.length === 0) return;

  //   const existingTitles = categories.map((cat) => cat.title);
  //   console.log("Existing category titles:", existingTitles);

  //   if (existingTitles.includes(title)) {
  //     message = "This category already exists. Please choose a different title.";
  //     title = "";
  //     goto("/dashboard");
  //   }
  // });

  function handleTitleChange(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    const existingTitles = currentCategories.categories.map((cat) =>
      cat.title.trim().toLowerCase()
    );

    if (existingTitles.includes(selected.trim().toLowerCase())) {
      message = "This category already exists. Please choose a different title.";
      title = "";
      goto("/dashboard");
    } else {
      title = selected;
      message = "";
    }
  }

  // $: if (title && currentCategories.categories.length > 0)
  //   const existingTitles = currentCategories.categories.map((cat) => cat.title);
  //   console.log("Existing category titles:", existingTitles);

  //   if (existingTitles.includes(title)) {
  //     message = "This category already exists. Please choose a different title.";
  //     title = ""; // Reset input
  //     goto("/dashboard"); // Optional redirect
  //   }
  // }

  //  $effect(() => {
  //    const exTitle = title; // Get the current value of title reactively
  //    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map we are passing category.title to the category when we map its array
  //    const existingTitles = categories.map((category) => category.title);
  //    console.log("Existing categories: ", category.title);

  //    // Check if the current title already exists in the categories
  //    if (existingTitles.includes(exTitle)) {
  //      message = "This category already exists. Please choose a different title.";
  //      title = ""; // Clear the title to prevent adding the same category
  //      goto("/dashboard"); // Redirect to the dashboard
  //    }
  //  });

  console.log("This is the userid", loggedInUser._id, loggedInUser.email, loggedInUser.password);

  async function addCategory() {
    let category: Category = {
      title: title,
      userid: userid,
      notes: notes,
      // img: img,
      image: image,
      placemarks: []
    };

    let success = await placemarkService.addCategory(category);
    if (success) {
      console.log(`You are adding the category ${category.title}`);
      localStorage.setItem("categoryTitle", category.title); // ✅ update localStorage
      placemarkService.refreshPlacemarksInfo();
      goto("/dashboard");
    } else {
      message = "Error Trying to sign up";
    }
  }
</script>

<!-- <section class="section"> -->
<!-- {#each categories as category (category._id)} -->
<section class="content mt-6 mb-5 mx-3">
  <article>
    <p class="subtitle has-text-weight-bold">About your categories</p>
    <p>
      Select your categories below where you can list all destinations you would like to visit soon!
    </p>
  </article>
</section>
<!-- Add Category section -->
<section class="box">
  <div class="field is-horizontal"></div>
  <div class="field">
    <div class="control">
      <label class="label">
        Category Title - ** Only 4 PlaceMark categories are allowed 👮‍♂️**
        <div class="select is-fullwidth">
          <select name="category" bind:value={title} onchange={handleTitleChange}>
            <!-- bind:value={title} -->
            <!-- <select onchange={handleCategoryChange}> -->
            <option class="has-text-grey-light" value="" disabled selected
              >Select your category</option
            >
            <option value="Restaurants">Restaurants</option>
            <option value="Museums">Museums</option>
            <option value="Parks">Parks</option>
            <option value="Beaches">Beaches</option>
          </select>
        </div>
      </label>
    </div>
  </div>
  <div class="columns">
    <div class="column is-3">
      <button onclick={() => addCategory()} class="button is-info has-text-white mt-3"
        >Add Category</button
      >
    </div>
  </div>
</section>
<!-- </section> -->
