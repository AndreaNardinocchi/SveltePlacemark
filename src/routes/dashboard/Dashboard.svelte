<script lang="ts">
  import type { Category } from "$lib/ui/types/placemark-types";
  import { goto } from "$app/navigation";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { loggedInUser } from "$lib/runes.svelte";
  import { onMount } from "svelte";
  import ListCategories from "$lib/ui/ListCategories.svelte";
  import DashboardBanner from "$lib/ui/DashboardBanner.svelte";

  // ✅ Get props in runes mode
  // const { token } = $props<{ token: string }>();

  // let categories: Category[] = [];

  // ✅ Use $state for reactive values
  let categories = $state<Category[]>([]);

  onMount(async () => {
    categories = await placemarkService.getAllCategories(loggedInUser.token);
  });

  let title = $state("");
  let userid = $state("67f80b4d141d89cf2ded3ef5");
  let notes = $state("This category is used to note down all parks I would like to visit");
  // let img = $state("https://i.ibb.co/TBx4BWR3/collage.jpg");
  let image = $state("https://i.ibb.co/TBx4BWR3/collage.jpg");

  // let userid = loggedInUser._id;
  console.log("This is the userid", loggedInUser._id, loggedInUser.email, loggedInUser.password);
  let message = $state("");

  async function addCategory() {
    const category: Category = {
      title: title,
      userid: userid,
      notes: notes,
      // img: img,
      image: image
    };

    let success = await placemarkService.addCategory(category);
    if (success) {
      console.log(`You are adding the category ${title}`);
      goto("/dashboard");
    } else {
      message = "Error Trying to sign up";
    }
  }
</script>

<DashboardBanner />
<section class="section">
  <ListCategories {categories} />
  <!-- {#each categories as category (category._id)} -->
  <section class="content mt-6 mb-5 mx-3">
    <article>
      <p class="subtitle has-text-weight-bold">About your categories</p>
      <p>
        Select your categories below where you can list all destinations you would like to visit
        soon!
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
            <select name="category" bind:value={title}>
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
</section>
