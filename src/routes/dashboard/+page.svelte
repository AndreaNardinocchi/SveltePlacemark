<script lang="ts">
  import ListCategories from "$lib/ui/ListCategories.svelte";
  import { onMount } from "svelte";
  // https://www.npmjs.com/package/svelte-fa
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { currentCategories, currentDataSets, loggedInUser } from "$lib/runes.svelte";
  import DashboardBanner from "$lib/ui/DashboardBanner.svelte";
  import AddCategory from "$lib/ui/AddCategory.svelte";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";

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

<div class="container">
  <DashboardBanner />
  <div class="box has-background-white">
    <div class="columns">
      <div class="column">
        <PlacemarkListCard>
          <p class="has-text-centered subtitle has-text-weight-bold is-5">Total by Country</p>
          <p>Country Labels: {currentDataSets.totalByCountry.labels.join(", ")}</p>
          <Chart data={currentDataSets.totalByCountry} type="bar" />
        </PlacemarkListCard>
      </div>
      <div class="column has-text-centered">
        <PlacemarkListCard>
          <p class="has-text-centered subtitle has-text-weight-bold is-5">
            Total by Visited/Not Visited
          </p>
          <Chart data={currentDataSets.totalByVisited} type="pie" />
        </PlacemarkListCard>
      </div>
    </div>
  </div>

  <section class="section">
    <ListCategories />
    <AddCategory />
  </section>
</div>
