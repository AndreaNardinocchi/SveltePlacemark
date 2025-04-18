<script lang="ts">
  import { placemarkService } from "./services/placemark-service";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
  // import type Category from "../../routes/category/Category.svelte";

  let { categories = [] } = $props();
  console.log("These are the categories: ", categories);

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
</script>

<section>
  {#each categories as category}
    <section class="columns box pt-2 mx-1 mb-5">
      <section class="column is-8">
        <div class="box-link-hover-shadow">
          <h2 class="title">
            <a href={`/category/${category._id}`} class="has-text-grey">{category.title}</a>
          </h2>
          <div class="notes">
            <div class="content card-content">
              <p class="subtitle">{category.notes}</p>
              <a href={`/category/${category._id}`} class="button" aria-label="Folder open">
                <span class="icon is-small">
                  <i class="fas fa-solid fa-folder-open"></i>
                </span>
              </a>
              <!-- <a
                href={`/dashboard/deletecategory/${category._id}`}
                class="button"
                aria-label="Folder delete"
              > -->
              <!-- <button
                onclick={() => deleteCategory(category._id)}
                class="button is-info has-text-white mt-3">Delete Category</button
              > -->

              <!-- svelte-ignore a11y_invalid_attribute -->
              <!-- svelte-ignore event_directive_deprecated -->
              <!-- https://dev.to/umanghome/event-handlers-and-svelte-4f5k
      https://stackoverflow.com/questions/77594143/svelte-how-to-prevent-default-action-of-reusable-button-component
      https://github.com/bestguy/sveltestrap/blob/master/src/Button.svelte
      https://svelte.dev/docs/svelte/legacy-on -->
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
              <!-- <span class="icon is-small">
                  <i class="fas fa-solid fa-trash"></i>
                </span>
              </a> -->
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
