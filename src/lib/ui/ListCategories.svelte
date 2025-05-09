<script lang="ts">
  import { fly } from "svelte/transition";
  import { placemarkService } from "./services/placemark-service";
  import { goto } from "$app/navigation";
  import { currentCategories } from "$lib/runes.svelte";
  import DOMPurify from "dompurify"; // Import DOMPurify for sanitization

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

  /**
   * Function to handle category selection
   * The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled,
   * its default action should not be taken as it normally would be.
   * https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
   * */
  function onCategorySelect(categoryId: string, event: Event) {
    event.preventDefault(); // Prevent the default link navigation

    const validCategory = currentCategories.categories.find(
      (category) => category._id === categoryId
    );

    if (!validCategory) {
      console.warn("Selected category not found.");
      return;
    }

    // Ensure _id is a valid string before using it, and I am using it since the localStorage.setItem("categoryId", categoryIdString); throws
    // me an error 'Type 'undefined' is not assignable to type 'string'.''
    const categoryIdString = validCategory._id || "DefaultCategoryId";

    // Sanitize categoryTitle and categoryId before storing in localStorage
    const sanitizedCategoryTitle = DOMPurify.sanitize(validCategory.title);
    const sanitizedCategoryId = DOMPurify.sanitize(categoryIdString);

    // Store the categoryId and categoryTitle in localStorage
    localStorage.setItem("categoryTitle", sanitizedCategoryTitle);
    localStorage.setItem("categoryId", sanitizedCategoryId);
    console.log("Sending the categoryTitle:", sanitizedCategoryTitle, sanitizedCategoryId);

    goto(`/category/${sanitizedCategoryId}`);
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
            <a
              href={`/category/${category._id}`}
              class="has-text-grey"
              on:click={(event) => onCategorySelect(category._id!, event)}
            >
              {category.title}
            </a>
          </h2>
          <div class="notes">
            <div class="content card-content">
              <p class="subtitle">{category.notes}</p>
              <!-- {#each currentCategories.categories as category} -->
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
              <!-- {/each} -->
              <!-- svelte-ignore a11y_invalid_attribute -->
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
          <a
            href={`/category/${category._id}`}
            on:click={(event) => onCategorySelect(category._id!, event)}
          >
            <figure class="image is-264x264">
              <img src={category.image} alt={category.title} style="border-radius: 10px;" />
            </figure>
          </a>
        </div>
      </section>
    </section>
  {/each}
</section>
