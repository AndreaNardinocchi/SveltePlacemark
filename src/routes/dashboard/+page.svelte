<script lang="ts">
    import ListCategories from "$lib/ui/ListCategories.svelte";
    import type { Category } from "$lib/ui/types/placemark-types";
    import { onMount } from "svelte";
  // https://www.npmjs.com/package/svelte-fa
  import Dashboard from "./Dashboard.svelte";
    import { placemarkService } from "$lib/ui/services/placemark-service";
    import { currentCategories, loggedInUser } from "$lib/runes.svelte";
    import DashboardBanner from "$lib/ui/DashboardBanner.svelte";
    import AddCategory from "$lib/ui/AddCategory.svelte";

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

 // let categories: Category[] =[]
 // let myCategories=[];

onMount(async () => {
  const myCategories = await placemarkService.getAllCategories(loggedInUser.token);
// Filter categories belonging to the logged-in user
currentCategories.categories = myCategories.filter((cat) => cat.userid === loggedInUser._id);

console.log("Filtered user categories:", currentCategories.categories);
  
});

 
</script>


<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<!-- <Header /> -->
<div class="container">
  <DashboardBanner />

  
  <section class="section">
    <ListCategories />
    <AddCategory />
    </section>
    </div>
   