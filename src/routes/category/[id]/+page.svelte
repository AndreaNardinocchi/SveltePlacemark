<script lang="ts">
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { onMount } from "svelte";
  import Category from "./Category.svelte";
  import type { Placemark } from "$lib/ui/types/placemark-types";
  // import { map } from "leaflet";
  import { currentCategories, currentDataSets, currentPlacemarks } from "$lib/runes.svelte";
  import CategoryBanner from "$lib/ui/CategoryBanner.svelte";
  import PlacemarkStats from "$lib/ui/PlacemarkStats.svelte";
  import PlacemarksMap from "$lib/ui/PlacemarksMap.svelte";
  import Charts from "$lib/ui/Charts.svelte";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  import ListPlacemarks from "$lib/ui/ListPlacemarks.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { refreshPlacemarkMap } from "$lib/ui/services/placemark-utils";
  let map: LeafletMap;

  /**
  //  * @type {any}
   */
  // export let key;

  let pageTitle: any = "";

  async function getBroswerTitle() {
    if (typeof window === "undefined") return "PlaceMark";
    const pathParts = window.location.pathname.split("/");
    let categoryId = pathParts[pathParts.indexOf("category") + 1];
    let placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
    const category = await placemarkService.getCategoryById(categoryId);
    if (category) {
      pageTitle = `${category.title} | PlaceMark`; // This can be dynamic
    } else {
      pageTitle = "PlaceMark";
    }
    console.log("PageTitle: ", pageTitle);
    return pageTitle;
  }

  function placemarkAdded(placemark: Placemark) {
    map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), "");
    map.moveTo(parseFloat(placemark.lat), parseFloat(placemark.long));
  }

  console.log("Chart - Total by Country", currentDataSets.totalByCountry);
  console.log("Chart - Total by Visited", currentDataSets.totalByVisited);
  onMount(async () => {
    pageTitle = await getBroswerTitle();
    await refreshPlacemarkMap(map);
    await placemarkService.refreshPlacemarksInfo();
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="container">
  <section class="section mt-6">
    {#if currentCategories.categories.length > 0}
      <CategoryBanner />
      <PlacemarkStats />
      <PlacemarkListCard>
        <LeafletMap height={40} bind:this={map} />
      </PlacemarkListCard>
      <!-- <PlacemarksMap /> -->
      <!-- <Charts /> -->
      <div class="box has-background-white">
        <div class="columns">
          <div class="column">
            <!-- title="Placemark countries" -->
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
              <!-- {#if currentDataSets.totalByVisited.labels.length > 0} -->

              <Chart data={currentDataSets.totalByVisited} type="pie" />
              <!-- {/if} -->
            </PlacemarkListCard>
          </div>
        </div>
      </div>

      <PlacemarkListCard>
        <ListPlacemarks />
      </PlacemarkListCard>
    {/if}
    <Category placemarkEvent={placemarkAdded} />
  </section>
</div>

<!-- <script lang="ts">
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { onMount } from "svelte";
  import { currentCategories, currentDataSets, currentPlacemarks } from "$lib/runes.svelte";
  import type { Placemark } from "$lib/ui/types/placemark-types";
  import CategoryBanner from "$lib/ui/CategoryBanner.svelte";
  import PlacemarkStats from "$lib/ui/PlacemarkStats.svelte";
  import PlacemarksMap from "$lib/ui/PlacemarksMap.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  import ListPlacemarks from "$lib/ui/ListPlacemarks.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { refreshPlacemarkMap } from "$lib/ui/services/placemark-utils";
  import Category from "./Category.svelte";

  let map: LeafletMap;
  let pageTitle: string = "";

  // Function to retrieve and set the page title based on the category
  async function getBroswerTitle() {
    const pathParts = window.location.pathname.split("/");
    let categoryId = pathParts[pathParts.indexOf("category") + 1];
    const category = await placemarkService.getCategoryById(categoryId);
    if (category) {
      pageTitle = `${category.title} | PlaceMark`;
    }
    return pageTitle;
  }

  // Triggered when the component is mounted
  onMount(async () => {
    pageTitle = await getBroswerTitle();
    await refreshPlacemarkMap(map); // Refresh placemark map and charts after loading placemarks
  });

  function placemarkAdded(placemark: Placemark) {
    map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), "");
    map.moveTo(parseFloat(placemark.lat), parseFloat(placemark.long));
  }
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="container">
  <section class="section mt-6">
    {#if currentCategories.categories.length > 0}
      <CategoryBanner />
      <PlacemarkStats />
      <PlacemarkListCard>
        <LeafletMap height={40} bind:this={map} />
      </PlacemarkListCard>

      <!-- Charts 
      <div class="box has-background-white">
        <div class="columns">
          <div class="column">
            <PlacemarkListCard>
              <p class="has-text-centered subtitle has-text-weight-bold is-5">Total by Country</p>
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

      <PlacemarkListCard>
        <ListPlacemarks />
      </PlacemarkListCard>
    {/if}
    <Category placemarkEvent={placemarkAdded} />
  </section>
</div> -->
