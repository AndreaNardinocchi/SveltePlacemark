<script lang="ts">
    import ListCategories from "$lib/ui/ListCategories.svelte";
    import type { Category } from "$lib/ui/types/placemark-types";
    import { onMount } from "svelte";
  // https://www.npmjs.com/package/svelte-fa
  // import Dashboard from "./Dashboard.svelte";
    import { placemarkService } from "$lib/ui/services/placemark-service";
    import { loggedInUser } from "$lib/runes.svelte";

  // @ts-ignore
  export const load = async ({ page }) => ({
    props: {
      key: page.path
    }
  });

  /**
   * @type {any}
   */
 // export let key;
  let pageTitle: any = "Dashboard | PlaceMark"; // This can be dynamic

  let categories: Category[] =[]

onMount(async () => {
  categories = await placemarkService.getAllCategories(loggedInUser.token);
});
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<!-- <Header /> -->
<div class="container">
 <!-- // <Dashboard /> -->
  <ListCategories {categories} />
</div>
<!-- <Footer /> -->
