<script lang="ts">
  // Declaring variables for chart data
  let totalByCountry: number;
  let totalByVisited: number;

  // Auto-subscribe to currentDataSets Svelte store
  $currentDataSets; // subscribe

  // Reactive assignments: when currentDataSets updates, these update too
  $: totalByCountry = $currentDataSets.totalByCountry;
  $: totalByVisited = $currentDataSets.totalByVisited;

  // Import the `$page` store to access route parameters like `id`
  import { page } from "$app/stores";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { onMount } from "svelte";
  import Category from "./Category.svelte";
  import type { Placemark } from "$lib/ui/types/placemark-types";
  import { currentCategories, currentDataSets, currentPlacemarks } from "$lib/runes.svelte";
  import CategoryBanner from "$lib/ui/CategoryBanner.svelte";
  import PlacemarkStats from "$lib/ui/PlacemarkStats.svelte";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  import ListPlacemarks from "$lib/ui/ListPlacemarks.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { refreshPlacemarkMap } from "$lib/ui/services/placemark-utils";

  // Referencing to the LeafletMap component for calling methods like add/removeMarker
  let map: LeafletMap;

  // Page title to dynamically display the browser titlw
  let pageTitle: any = "";

  // Holding the route param for category ID
  let categoryId: string;
  // Reactive assignment to get categoryId from route (URL)
  $: categoryId = $page.params.id;

  // Data passed from +page.ts load function
  export let data;
  const { category } = data;

  /**
   * Fetch the category title for the page based on categoryId
   * and set it as the browser title.
   */
  async function getBroswerTitle() {
    const category = await placemarkService.getCategoryById(categoryId);
    if (category) {
      pageTitle = `${category.title} | PlaceMark`; // This can be dynamic
    } else {
      pageTitle = "PlaceMark";
    }
    console.log("PageTitle: ", pageTitle);
    return pageTitle;
  }

  // Referencing to PlacemarkStats.svelte for triggering refresh()
  let statsComponent: any;

  /**
   * Callback when a new placemark is added, adding it to the map and refreshing the statsComponent
   */
  function placemarkAdded(placemark: Placemark) {
    console.log("Placemark was added:", placemark);
    const popup = `${placemark.title}, ${placemark.country}, ${placemark.address} | Visited: ${placemark.visited} | Geo: ${placemark.lat} / ${placemark.long}`;
    map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), popup);
    map.moveTo(parseFloat(placemark.lat), parseFloat(placemark.long));
    console.log("parseFloat(placemark.lat", placemark.lat);

    // Checking that statsComponent exists
    console.log("statsComponent is:", statsComponent);
    if (statsComponent && typeof statsComponent.refresh === "function") {
      console.log("Calling statsComponent.refresh()");
      statsComponent.refresh();
    } else {
      console.warn("statsComponent.refresh not available");
    }
  }

  console.log("Chart - Total by Country", totalByCountry);
  console.log("Chart - Total by Visited", totalByVisited);

  /**
   * Callback when a placemark is deleted, removing it from the map and refreshing the statsComponent
   */

  function placemarkDeleted(placemark: Placemark) {
    console.log("Placemark was deleted:", placemark);

    // Removing marker from map if a reference or identifier exists.
    map.removeMarker(parseFloat(placemark.lat), parseFloat(placemark.long));
    // Refreshing statistics or any dependent components
    if (statsComponent && typeof statsComponent.refresh === "function") {
      console.log("Calling statsComponent.refresh() after deletion");
      statsComponent.refresh();
    } else {
      console.warn("statsComponent.refresh not available");
    }
    // Moving map to the last remaining placemark or '0,0' if no placemark left
    const remaining = currentPlacemarks.placemarks;
    if (remaining.length > 0) {
      const last = remaining[remaining.length - 1];
      const lat = parseFloat(last.lat);
      const long = parseFloat(last.long);
      console.log("Moving map to last remaining placemark:", last.title);
      map.moveTo(lat, long);
      refreshPlacemarkMap(map, currentPlacemarks.placemarks);
    } else {
      console.warn("No placemarks left to move to.");
      map.moveTo(0, 0);
      // There will be no chart to show
      totalByCountry = 0;
      totalByVisited = 0;
    }
  }

  // On component mount: fetch title, refresh placemarks, and update map
  onMount(async () => {
    pageTitle = await getBroswerTitle();
    await placemarkService.refreshPlacemarksInfo();
    await refreshPlacemarkMap(map, currentPlacemarks.placemarks); // pass the data directly
    console.log("The map: ", map);
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="container">
  <section class="section mt-6">
    {#if currentCategories.categories.length > 0}
      <CategoryBanner />
      <PlacemarkStats bind:this={statsComponent} />
      <PlacemarkListCard>
        <LeafletMap height={40} bind:this={map} />
      </PlacemarkListCard>
      <div class="box has-background-white">
        <div class="columns">
          <div class="column">
            <PlacemarkListCard>
              <p class="has-text-centered subtitle has-text-weight-bold is-5">Total by Country</p>
              <!-- <p>Country Labels: {totalByCountry.labels.join(", ")}</p> -->
              <!-- <Chart data={totalByCountry} type="bar" /> -->

              {#key totalByCountry}
                <Chart data={totalByCountry} type="bar" />
              {/key}
            </PlacemarkListCard>
          </div>
          <div class="column has-text-centered">
            <PlacemarkListCard>
              <p class="has-text-centered subtitle has-text-weight-bold is-5">
                Total by Visited/Not Visited
              </p>
              <!-- In Svelte, the {#key ...} block is used to tell the framework to completely recreate a block of DOM whenever 
               the value inside the key expression changes. It's especially useful when you need to force a component or 
               element to re-render from scratch.
               https://svelte.dev/docs/svelte/key? -->
              {#key totalByVisited}
                <Chart data={totalByVisited} type="pie" />
              {/key}
            </PlacemarkListCard>
          </div>
        </div>
      </div>
      <PlacemarkListCard>
        <ListPlacemarks placemarkDeletedEvent={placemarkDeleted} />
      </PlacemarkListCard>
    {/if}
    <Category placemarkEvent={placemarkAdded} />
  </section>
</div>
