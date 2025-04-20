<script lang="ts">
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview

  import { fly } from "svelte/transition";
  import { inview } from "svelte-inview";

  let isInView: boolean = false;

  import ListPlacemarks from "$lib/ui/ListPlacemarks.svelte";
  import AddPlacemark from "$lib/ui/AddPlacemark.svelte";
  import CategoryImage from "$lib/ui/CategoryImage.svelte";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import CategoryBanner from "$lib/ui/CategoryBanner.svelte";
  import type { Placemark } from "$lib/ui/types/placemark-types";
  import { goto } from "$app/navigation";
  import PlacemarkStats from "$lib/ui/PlacemarkStats.svelte";

  // Define reactive variables for the form fields
  let title = $state("");
  let lat = $state("");
  let long = $state("");
  let address = $state("");
  let country = $state("");
  let phone = $state("");
  let website = $state("");
  let visited = $state("");
  let description = $state("");

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
  }
</script>

<!-- {#if user} -->
<section class="section mt-6">
  <!-- <div
    class="wrapper mb-5"
    use:inview={{ unobserveOnEnter: true, rootMargin: "-10%" }}
    on:change={({ detail }) => {
      isInView = detail.inView;
    }}
  >
    {#if isInView}
      <div in:fly={{ x: 200, duration: 1000 }}> -->
  <CategoryBanner />
  <!-- </div>
    {/if}
  </div> -->

  <!-- <div
    class="wrapper mb-5"
    use:inview={{ unobserveOnEnter: true, rootMargin: "-5%" }}
    on:change={({ detail }) => {
      isInView = detail.inView;
    }}
  >
    {#if isInView}
      <div in:fly={{ x: -200, duration: 1000 }}> -->
  <!-- {#if category} -->
  <PlacemarkStats />

  <!-- <img
    id="category-image"
    src={category.img}
    class="mb-5"
    style="border-radius: 10px; display: none;"
    alt=""
  /> -->

  <!-- Assuming list-placemarks, add-placemark, and category-image are separate Svelte components -->
  <!-- <div
    class="wrapper mb-5"
    use:inview={{ unobserveOnEnter: true, rootMargin: "-1%" }}
    on:change={({ detail }) => {
      isInView = detail.inView;
    }}
  >
    {#if isInView}
      <div in:fly={{ y: 200, duration: 2000 }}> -->
  <PlacemarkListCard>
    <ListPlacemarks />
  </PlacemarkListCard>
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
    <div class="columns">
      <div class="column is-3">
        <!-- <button class="button is-info has-text-white" type="submit"> Add your placemark </button> -->
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
  <CategoryImage />
  <!-- </div>
    {/if}
  </div> -->
</section>
<!-- {/if} -->

<!-- {placemarks} -->
