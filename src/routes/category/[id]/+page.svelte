<!-- <script lang="ts">
  ///////////// VESRION 1 /////////////////////
  import CategoryBanner from "$lib/ui/CategoryBanner.svelte";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  import PlacemarkStats from "$lib/ui/PlacemarkStats.svelte";

  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { refreshPlacemarkMap } from "$lib/ui/services/placemark-utils";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { currentDataSets } from "$lib/runes.svelte.js";
  import ListPlacemarks from "$lib/ui/ListPlacemarks.svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service.js";
  import { onMount } from "svelte";
  import type { Placemark } from "$lib/ui/types/placemark-types.js";
    import Category from "./Category.svelte";
  let map: LeafletMap;

  export let data;
  const { category } = data;
  console.log("Category in page.svelte:", category);
  let pageTitle: string;

  async function getBroswerTitle() {
    // if (typeof window === "undefined") return "PlaceMark";
    // Using the below enables me to retrieve the categoryId
    // https://stackoverflow.com/questions/23690234/getting-last-segment-of-url-in-javascript?
    // https://www.geeksforgeeks.org/how-to-get-url-and-url-parts-in-javascript/
    // const pathParts = window.location.pathname.split("/");
    // let categoryId = pathParts[pathParts.indexOf("category") + 1];
    // let placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
    //  const category = await placemarkService.getCategoryById(categoryId);
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

<!--Basic structure to ensure rendering works 
<div class="container">
  <section class="section mt-6">
    {#if category.placemarks && category.placemarks.length > 0}
      <CategoryBanner />
      <PlacemarkStats />
      <PlacemarkListCard>
        <LeafletMap height={40} bind:this={map} />
      </PlacemarkListCard>
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
      <PlacemarkListCard>
        <ListPlacemarks />
      </PlacemarkListCard>
    {/if}
     <Category placemarkEvent={placemarkAdded} />
  </section>
</div>  -->

<!-- <script lang="ts">
 ///////////////// VERSION 2 ///////////////////////////////////
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
  let map: LeafletMap;

  /**
  //  * @type {any}
   */

  let pageTitle: any = "";

  // let categoryId: string;

  // $: categoryId = $page.params.id;

  export let data;
  const { category } = data;

  async function getBroswerTitle() {
    // if (typeof window === "undefined") return "PlaceMark";
    // Using the below enables me to retrieve the categoryId
    // https://stackoverflow.com/questions/23690234/getting-last-segment-of-url-in-javascript?
    // https://www.geeksforgeeks.org/how-to-get-url-and-url-parts-in-javascript/
    // const pathParts = window.location.pathname.split("/");
    // let categoryId = pathParts[pathParts.indexOf("category") + 1];
    // let placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
    // const category = await placemarkService.getCategoryById(categoryId);
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
    {#if category.placemarks && currentCategories.categories.length > 0}
      <CategoryBanner />
      <PlacemarkStats />
      <PlacemarkListCard>
        <LeafletMap height={40} bind:this={map} />
      </PlacemarkListCard>
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
      <PlacemarkListCard>
        <ListPlacemarks />
      </PlacemarkListCard>
    {/if}
    <Category placemarkEvent={placemarkAdded} />
  </section>
</div>  -->

<script lang="ts">
  //import { currentDataSets } from "$lib/runes.svelte"; // or ./stores.ts
  import { derived } from "svelte/store";

  let totalByCountry;
  let totalByVisited;

  $currentDataSets; // subscribe

  $: totalByCountry = $currentDataSets.totalByCountry;
  $: totalByVisited = $currentDataSets.totalByVisited;

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

  let map: LeafletMap;

  /**
  //  * @type {any}
   */

  let pageTitle: any = "";

  let categoryId: string;

  $: categoryId = $page.params.id;

  export let data;
  const { category } = data;

  async function getBroswerTitle() {
    // if (typeof window === "undefined") return "PlaceMark";
    // Using the below enables me to retrieve the categoryId
    // https://stackoverflow.com/questions/23690234/getting-last-segment-of-url-in-javascript?
    // https://www.geeksforgeeks.org/how-to-get-url-and-url-parts-in-javascript/
    // const pathParts = window.location.pathname.split("/");
    // let categoryId = pathParts[pathParts.indexOf("category") + 1];
    // let placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
    const category = await placemarkService.getCategoryById(categoryId);
    if (category) {
      // placemarkService.refreshPlacemarksInfo();
      pageTitle = `${category.title} | PlaceMark`; // This can be dynamic
    } else {
      pageTitle = "PlaceMark";
    }
    console.log("PageTitle: ", pageTitle);
    return pageTitle;
  }

  let statsComponent: any;

  function placemarkAdded(placemark: Placemark) {
    console.log("Placemark was added:", placemark);
    const popup = `${placemark.title}, ${placemark.country}, ${placemark.address} | Visited: ${placemark.visited} | Geo: ${placemark.lat} / ${placemark.long}`;
    map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), popup);
    map.moveTo(parseFloat(placemark.lat), parseFloat(placemark.long));
    console.log("parseFloat(placemark.lat", placemark.lat);

    // Critical: check that this logs and is defined
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
  // placemarkService.refreshPlacemarksInfo();

  function placemarkDeleted(placemark: Placemark) {
    console.log("Placemark was deleted:", placemark);

    // Remove marker from map if a reference or identifier exists.
    // Assuming your `LeafletMap` component has a method like `removeMarker`:
    map.removeMarker(parseFloat(placemark.lat), parseFloat(placemark.long));

    // Refresh statistics or any dependent UI components
    if (statsComponent && typeof statsComponent.refresh === "function") {
      console.log("Calling statsComponent.refresh() after deletion");
      statsComponent.refresh();
    } else {
      console.warn("statsComponent.refresh not available");
    }
  }

  onMount(async () => {
    pageTitle = await getBroswerTitle();
    await placemarkService.refreshPlacemarksInfo();
    // await refreshPlacemarkMap(map);
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
              <p>Country Labels: {totalByCountry.labels.join(", ")}</p>
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
              <!-- <Chart data={totalByVisited} type="pie" /> -->
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
