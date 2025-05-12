<script lang="ts">
  import ListCategories from "$lib/ui/ListCategories.svelte";
  import { onMount } from "svelte";
  // https://www.npmjs.com/package/svelte-fa
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { currentCategories, currentDataSets, loggedInUser } from "$lib/runes.svelte";
  import DashboardBanner from "$lib/ui/DashboardBanner.svelte";
  import AddCategory from "$lib/ui/AddCategory.svelte";

  // Browser Title for the page, used in the <head>
  let pageTitle: any = "Dashboard | PlaceMark"; // This can be dynamic

  onMount(async () => {
    // Retrieve all categories associated with the user’s token
    const myCategories = await placemarkService.getAllCategories(loggedInUser.token);
    // Filter in categories belonging to the logged-in user
    currentCategories.categories = myCategories.filter((cat) => cat.userid === loggedInUser._id);
    console.log("Filtered user categories:", currentCategories.categories);
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="container">
  <DashboardBanner />
  <section class="section">
    <ListCategories />
    <AddCategory />
  </section>
</div>
