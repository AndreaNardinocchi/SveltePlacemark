<!-- <script lang="ts">
  import { fly } from "svelte/transition";
  import { placemarkService } from "./services/placemark-service";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
  // import type Category from "../../routes/category/Category.svelte";

  // let { currentCategories } = $props();
  import { currentCategories } from "$lib/runes.svelte";
  console.log("These are the categories: ", currentCategories.categories);

  async function deleteCategory(categoryId: string) {
    console.log("This is the categoryId: ", categoryId);

    if (!categoryId) {
      console.warn("No category ID provided.");
      return;
    }

    const category = await placemarkService.getCategoryById(categoryId);
    if (!category) {
      console.warn("Invalid category returned.");
      return;
    }

    const success = await placemarkService.deleteCategory(categoryId);
    if (success) {
      console.log(`You are deleting the category ${category.title}`);
      goto("/dashboard"); // Optionally, you can refresh the list instead of full redirect
    }
  }

  function onCategorySelect(categoryId: string) {
    const validCategory = currentCategories.categories.find((cat) => cat._id === categoryId);

    if (!validCategory) {
      console.warn("Selected category not found.");
      return;
    }

    // localStorage.setItem("categoryId", validCategory._id);     // ✅ Store category ID
    localStorage.setItem("categoryTitle", validCategory.title); // ✅ Optional: store title

    placemarkService.refreshPlacemarksInfo(); // 🔁 Refresh placemarks based on selected category
  }
</script>

<section>
  {#each categories as category} 
  {#each currentCategories.categories as category}
    <section class="columns box pt-2 mx-1 mb-5" in:fly={{ x: 200, duration: 3000 }}>
      <section class="column is-8">
        <div class="box-link-hover-shadow">
          <h2 class="title">
            <a href={`/category/${category._id}`} class="has-text-grey">{category.title}</a>
          </h2>
          <div class="notes">
            <div class="content card-content">
              <p class="subtitle">{category.notes}</p>
              <!-- <a href={`/category/${category._id}`} class="button" aria-label="Folder open">
                <span class="icon is-small">
                  <i class="fas fa-solid fa-folder-open"></i>
                </span>
              </a> 

              <a
                href={`/category/${category._id}`}
                class="button"
                aria-label="Folder open"
                on:click={() => onCategorySelect(category._id)}
              >
                <span class="icon is-small">
                  <i class="fas fa-solid fa-folder-open"></i>
                </span>
              </a>

              <!-- svelte-ignore a11y_invalid_attribute -->
<!-- svelte-ignore event_directive_deprecated -->
<!-- https://dev.to/umanghome/event-handlers-and-svelte-4f5k
      https://stackoverflow.com/questions/77594143/svelte-how-to-prevent-default-action-of-reusable-button-component
      https://github.com/bestguy/sveltestrap/blob/master/src/Button.svelte
      https://svelte.dev/docs/svelte/legacy-on 
              <a
                href="#"
                on:click|preventDefault={() => deleteCategory(category._id)}
                class="button"
                aria-label="delete icon"
              >
                <span class="icon is-small">
                  <i class="fas fa-solid fa-trash"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section class="column is-4">
        <div class="card-image">
          <a href={`/category/${category._id}`}>
            <figure class="image is-264x264">
              <img src={category.image} alt={category.title} style="border-radius: 10px;" />
            </figure>
          </a>
        </div>
      </section>
    </section>
  {/each}
</section> -->

<script lang="ts">
  import { fly } from "svelte/transition";
  import { placemarkService } from "./services/placemark-service";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
  import { currentCategories } from "$lib/runes.svelte";

  // Function to delete a category
  async function deleteCategory(categoryId: string) {
    console.log("This is the categoryId: ", categoryId);

    if (!categoryId) {
      console.warn("No category ID provided.");
      return;
    }

    const category = await placemarkService.getCategoryById(categoryId);
    if (!category) {
      console.warn("Invalid category returned.");
      return;
    }

    const success = await placemarkService.deleteCategory(categoryId);
    if (success) {
      console.log(`You are deleting the category ${category.title}`);
      goto("/dashboard"); // Optionally, you can refresh the list instead of a full redirect
    }
  }

  // Function to handle category selection
  function onCategorySelect(categoryId: string, event: Event) {
    event.preventDefault(); // Prevent the default link navigation

    const validCategory = currentCategories.categories.find(
      (category) => category._id === categoryId
    );

    if (!validCategory) {
      console.warn("Selected category not found.");
      return;
    }

    // Store the categoryId and categoryTitle in localStorage
    //  localStorage.setItem("categoryId", validCategory._id); // ✅ Store the categoryId
    localStorage.setItem("categoryTitle", validCategory.title); // Optional: store the categoryTitle
    localStorage.setItem("categoryId", validCategory._id);
    console.log("Sending the categoryTitle:", validCategory.title);

    // Now, manually navigate to the category page after the state is set
    goto(`/category/${validCategory._id}`);
    // Call the placemarkService to refresh the placemarks for the selected category
    //  placemarkService.refreshPlacemarksInfo();
  }
</script>

<section>
  {#each currentCategories.categories as category}
    <section class="columns box pt-2 mx-1 mb-5" in:fly={{ x: 200, duration: 3000 }}>
      <section class="column is-8">
        <div class="box-link-hover-shadow">
          <h2 class="title">
            <a href={`/category/${category._id}`} class="has-text-grey">
              {category.title}
            </a>
          </h2>
          <div class="notes">
            <div class="content card-content">
              <p class="subtitle">{category.notes}</p>
              {#each currentCategories.categories as category}
                <a
                  href={`/category/${category._id}`}
                  class="button"
                  aria-label="Folder open"
                  on:click={(event) => onCategorySelect(category._id!, event)}
                >
                  <span class="icon is-small">
                    <i class="fas fa-solid fa-folder-open"></i>
                  </span>
                </a>
              {/each}

              <a
                href="#"
                on:click|preventDefault={() => deleteCategory(category._id)}
                class="button"
                aria-label="delete icon"
              >
                <span class="icon is-small">
                  <i class="fas fa-solid fa-trash"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section class="column is-4">
        <div class="card-image">
          <a href={`/category/${category._id}`}>
            <figure class="image is-264x264">
              <img src={category.image} alt={category.title} style="border-radius: 10px;" />
            </figure>
          </a>
        </div>
      </section>
    </section>
  {/each}
</section>
