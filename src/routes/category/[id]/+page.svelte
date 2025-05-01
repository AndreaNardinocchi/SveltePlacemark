<script lang="ts">
  import { placemarkService } from "$lib/ui/services/placemark-service";

  import WelcomeMenu from "$lib/ui/WelcomeMenu.svelte";
  import { onMount } from "svelte";
  import Category from "./Category.svelte";
  import type { Placemark } from "$lib/ui/types/placemark-types";
  // import { map } from "leaflet";
  import { currentPlacemarks } from "$lib/runes.svelte";
  import CategoryBanner from "$lib/ui/CategoryBanner.svelte";
  import PlacemarkStats from "$lib/ui/PlacemarkStats.svelte";
  import PlacemarksMap from "$lib/ui/PlacemarksMap.svelte";
  import Charts from "$lib/ui/Charts.svelte";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  import ListPlacemarks from "$lib/ui/ListPlacemarks.svelte";

  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { refreshPlacemarkMap } from "$lib/ui/services/placemark-utils";
  let map: LeafletMap;

  /**
  //  * @type {any}
   */
  // export let key;

  let pageTitle: any = "";

  async function getBroswerTitle() {
    const pathParts = window.location.pathname.split("/");
    let categoryId = pathParts[pathParts.indexOf("category") + 1];
    let placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
    const category = await placemarkService.getCategoryById(categoryId);
    if (category) {
      pageTitle = `${category.title} | PlaceMark`; // This can be dynamic
    }
    console.log("PageTitle: ", pageTitle);
    return pageTitle;
  }

  onMount(async () => {
    pageTitle = await getBroswerTitle();
  });

  // onMount will fetch and assign:
  onMount(async () => {
    await refreshPlacemarkMap(map);
    // const pathParts = window.location.pathname.split("/");
    // let categoryId = pathParts[pathParts.indexOf("category") + 1];
    // console.log("This the categoryId in Maps: ", categoryId);
    // currentPlacemarks.placemarks.forEach((placemark: Placemark) => {
    //   if (typeof placemark !== "string") {
    //     const popup = `${placemark.title}, ${placemark.country} | Visited: ${placemark.visited}`;
    //     map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), popup);
    //     console.log("These are the coordinates: ", placemark.lat, placemark.long);
    //   }
    // });
    // const lastPlacemark = currentPlacemarks.placemarks[currentPlacemarks.placemarks.length - 1];
    // if (lastPlacemark) map.moveTo(parseFloat(lastPlacemark.lat), parseFloat(lastPlacemark.long));
  });

  function placemarkAdded(placemark: Placemark) {
    {
      map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), "");
      map.moveTo(parseFloat(placemark.lat), parseFloat(placemark.long));
    }
    // Call placemarkAdded for each placemark in currentPlacemarks
    currentPlacemarks.placemarks.forEach((placemark: Placemark) => {
      if (typeof placemark !== "string") {
        placemarkAdded(placemark);
      }
    });
  }

  function refreshDonationMap(
    map: {
      $on?(type: string, callback: (e: any) => void): () => void;
      $set?(props: Partial<{ height?: number }>): void;
    } & {
      addMarker: (lat: number, lng: number, popupText: string) => Promise<void>;
      moveTo: (lat: number, lng: number) => Promise<void>;
    }
  ) {
    throw new Error("Function not implemented.");
  }
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="container">
  <section class="section mt-6">
    <CategoryBanner />

    <PlacemarkStats />
    <!-- placemarkEvent={placemarkAdded} -->
    <PlacemarksMap />
    <Charts />

    <PlacemarkListCard>
      <ListPlacemarks />
    </PlacemarkListCard>
    <!-- <div class="box"> -->
    <Category placemarkEvent={placemarkAdded} />
    <!-- </div> -->
  </section>
</div>
