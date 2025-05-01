<script lang="ts">
  import { subTitle, loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import PlacemarkCard from "$lib/ui/PlacemarkCard.svelte";
  import type { Placemark } from "$lib/ui/types/placemark-types";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  import { onMount } from "svelte";
  subTitle.text = "Donations Geo Data";
  let map: LeafletMap;

  onMount(async () => {
    const pathParts = window.location.pathname.split("/");
    let categoryId = pathParts[pathParts.indexOf("category") + 1];
    console.log("This the categoryId in Maps: ", categoryId);
    const placemarks = await placemarkService.getPlacemarksByCategoryId(
      categoryId,
      loggedInUser.token
    );
    placemarks.forEach((placemark: Placemark) => {
      map.addMarker(placemark.lat, placemark.long);
      console.log("These are the coordinates: ", placemark.lat, placemark.long);
    });
  });
</script>

<PlacemarkListCard>
  <LeafletMap height={60} bind:this={map} />
</PlacemarkListCard>
