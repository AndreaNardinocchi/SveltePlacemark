<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import { refreshPlacemarkMap } from "./services/placemark-utils";
  import { currentPlacemarks } from "$lib/runes.svelte";
  // @ts-ignore
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  // import { currentDataSets } from "$lib/runes.svelte";
  // import placemarkUtils from "$lib/ui/services/placemark-utils";

  subTitle.text = "Placemarks data";
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview

  import { fly } from "svelte/transition";
  import { inview } from "svelte-inview";

  let isInView: boolean = false;

  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { onMount } from "svelte";
  import { category, loggedInUser } from "$lib/runes.svelte";
  import type { Placemark, User } from "$lib/ui/types/placemark-types";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import Charts from "./Charts.svelte";
  // import { map } from "leaflet";

  let map: LeafletMap;

  // onMount will fetch and assign:
  onMount(async () => {
    await refreshPlacemarkMap(map);
    // const pathParts = window.location.pathname.split("/");
    // let categoryId = pathParts[pathParts.indexOf("category") + 1];
    // console.log("This the categoryId in Maps: ", categoryId);
    // currentPlacemarks.placemarks.forEach((placemark: Placemark) => {
    //   if (typeof placemark !== "string") {
    //     const popup = `${placemark.title}, ${placemark.country}, ${placemark.address} | Visited: ${placemark.visited}`;
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

<PlacemarkListCard>
  <LeafletMap height={40} bind:this={map} />
</PlacemarkListCard>
