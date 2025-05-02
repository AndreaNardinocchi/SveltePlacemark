<script lang="ts">
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview

  import { fly } from "svelte/transition";
  import { inview } from "svelte-inview";

  let isInView: boolean = false;
  let { placemarkEvent = null } = $props();

  import ListPlacemarks from "$lib/ui/ListPlacemarks.svelte";
  import AddPlacemark from "$lib/ui/AddPlacemark.svelte";
  import CategoryImage from "$lib/ui/CategoryImage.svelte";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import CategoryBanner from "$lib/ui/CategoryBanner.svelte";
  import type { Placemark } from "$lib/ui/types/placemark-types";
  import { goto } from "$app/navigation";
  import PlacemarkStats from "$lib/ui/PlacemarkStats.svelte";
  import Charts from "$lib/ui/Charts.svelte";
  import PlacemarksMap from "$lib/ui/PlacemarksMap.svelte";

  // Define reactive variables for the form fields
  let title = $state("");
  let lat = $state("");
  let long = $state("");
  let address = $state("");
  let country = $state("");
  let phone = $state("");
  let website = $state("");
  let visited = $state("");
  let img: string[] = [];
  let description = $state("");
  let message = $state("");

  async function addPlacemark() {
    const placemark: Placemark = {
      title: title,
      lat: lat,
      long: long,
      address: address,
      country: country,
      phone: phone,
      website: website,
      visited: visited,
      img: img.length > 0 ? img : undefined, // Only send `img` if it has values
      description: description
    };

    const url = window.location.pathname;
    const categoryId = url.split("/").pop();

    console.log("This is the categoryId: ", categoryId);

    if (!categoryId) {
      console.warn("No category ID found in URL.");
      return;
    }

    const category = await placemarkService.getCategoryById(categoryId);
    if (!category) {
      console.warn("Invalid category returned.");
      return;
    }

    const result = await placemarkService.addPlacemark(categoryId, placemark);

    if (result) {
      console.log(`Placemark added: ${title}, lat: ${lat}, long: ${long}`);
      console.log("Payload being sent:", placemark);
      goto(`/category/${categoryId}`);
    } else {
      console.log("Payload being sent:", placemark);
      console.warn("Failed to add placemark.");
    }

    if (placemarkEvent) placemarkEvent(placemark);
    message = `You added ${placemark.title} in ${placemark.title}. Visited? ${placemark.visited}`;
  }
</script>

<!-- <section class="section mt-6">
  <CategoryBanner />

  <PlacemarkStats />
  <!-- placemarkEvent={placemarkAdded} 
  <PlacemarksMap />
  <Charts />

  <PlacemarkListCard>
    <ListPlacemarks />
  </PlacemarkListCard> -->
<div class="box">
  <AddPlacemark
    bind:title
    bind:lat
    bind:long
    bind:address
    bind:country
    bind:phone
    bind:website
    bind:visited
    bind:description
  />
  {message}
  <div class="columns">
    <div class="column is-3">
      <button onclick={() => addPlacemark()} class="mt-3 button is-info has-text-white">
        Add your placemark
      </button>
    </div>
    <div class="column is-9">
      <p class="has-text-right mt-2">
        *Find your exact placemarks coordinates on
        <a href="https://www.gps-coordinates.net/" target="_blank" class="has-text-grey"
          >https://www.gps-coordinates.net/</a
        >
        <span class="ml-1 icon is-small">
          <i class="fas fa-solid fa-folder-open"></i>
        </span>
      </p>
    </div>
  </div>
</div>
<!-- <CategoryImage /> -->
<!-- </section> -->
