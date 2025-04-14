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
  import type { Category, Placemark } from "$lib/ui/types/placemark-types";
  import { onMount } from "svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { goto } from "$app/navigation";

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

  //   const url = window.location.pathname;
  //   const categoryId = url.split("/").pop();
  //   let category = await placemarkService.getCategoryById(categoryId);
  //   let success = await placemarkService.addPlacemark(categoryId);
  //   // const success = true;
  //   if (success) {
  //     console.log(`You are signing up ${title} ${lat} ${long} `);
  //     goto(`/category/${categoryId}`);
  //   }
  // }

  //   let placemarks: Placemark[] = [];
  //   let categoryId: string; // Pass this into the component or extract from route

  // onMount(async () => {
  //   placemarks = await placemarkService.getPlacemarksByCategoryId(categoryId);
  // });
  // import { onMount } from "svelte";
  // import { placemarkService } from "$lib/ui/services/placemark-service";
  // import type { Category, Placemark } from "./types/placemark-types";

  // let category: Category | null = null; // received as prop
  // let placemarks: <Placemark[]>

  // onMount(async () => {
  //   if (category) {
  //     placemarks = await placemarkService.getPlacemarksByCategoryId(loggedInUser.token);
  //   }
  // });

  // let { category }: { category: Category } = $props();
  // let category: Category | null = null;
  // // let placemarks: Placemark[] = [];

  // let placemarks = $state<Placemark[]>([]);

  // onMount(async () => {
  //   // Get category ID dynamically, maybe from route or context
  //   const url = window.location.pathname;
  //   const categoryId = url.split("/").pop();
  //   if (category && categoryId) {
  //     placemarks = await placemarkService.getPlacemarksByCategoryId(categoryId);
  //     console.log("Received category:", category);
  //   } else {
  //     console.warn("No valid category ID provided.");
  //     console.log("Received category:", category);
  //   }
  // });

  // let placemarks = $state<Placemark[]>([]);

  // onMount(async () => {
  //   placemarks = await placemarkService.getPlacemarksByCategoryId(loggedInUser.token);
  // });

  // Props or reactive variables
  // export let backgroundColor =
  // ("title box has-text-centered has-background-grey-dark has-text-white"); // Default example
  //  export let imageCode = "https://i.ibb.co/qL14ZG2g/mossel-dish-7724006-1280.jpg"; // Image code (URL or base64)
  // export let category = { title: "Restaurants", img: "" }; // Category object with title and image
  let placemarkSum = $state(0);
  let yesCounting = $state(0);
  let noCounting = $state(0);
  let resultMax = $state(0);
  let resultMin = $state(0);
  let localCounting = $state(0);
  let abroadCounting = $state(0);
  let localIcon = $state("");
  let abroadIcon = $state("");
  let localTravelIcon = $state("");
  let abroadTravelIcon = $state("");
</script>

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
  <div class="box has-background-white">
    <div class="columns">
      <div class="column">
        <section>
          <header class="card-header"></header>
          <div class="columns has-text-left">
            <div class="column is-6 m-auto">
              <div class="card-image">
                <figure class="image is-264x264 p-2">
                  <img src="https://i.ibb.co/G42MNvjz/placemark.jpg" alt="placemark" />
                </figure>
              </div>
            </div>
            <div class="column is-6 ml-3">
              <header class="card-header pt-5">
                <p class="subtitle has-text-weight-bold is-5">Your placemarks stats</p>
              </header>
              <hr class="mr-6 pr-4" />
              <article class="card-content">
                <p class="content is-size-6 pt-1">
                  <span class="has-text-weight-bold is-size-6">Placemarks:</span>
                  {placemarkSum}<br />
                  <span class="has-text-weight-bold is-size-6">Visited:</span>
                  {yesCounting}<br />
                  <span class="has-text-weight-bold is-size-6">To visit:</span>
                  {noCounting}<br />
                  <span class="has-text-weight-bold is-size-6">Furthest placemark:</span><br />
                  {resultMax}<br />
                  <span class="has-text-weight-bold is-size-6">Closest placemark:</span><br />
                  {resultMin}
                </p>
              </article>
            </div>
          </div>
        </section>
      </div>

      <div class="column">
        <section>
          <header class="card-header"></header>
          <div class="columns has-text-left">
            <div class="column m-auto is-6">
              <div class="card-image">
                <figure class="image is-264x264 pt-5">
                  <img src="https://i.ibb.co/s98MdtnM/travel.jpg" alt="travel" />
                </figure>
              </div>
            </div>
            <div class="column is-6 ml-3">
              <header class="card-header pt-5">
                <p class="subtitle has-text-weight-bold is-5">Placemarks locations</p>
              </header>
              <hr class="mr-6 pr-6" />
              <article class="card-content">
                <p class="content is-size-6 pt-1">
                  <span class="has-text-weight-bold is-size-6">Local:</span>
                  {localCounting}
                  <img src={localIcon} alt="" /> <i class={localTravelIcon}></i>
                </p>
                <p>
                  <span class="has-text-weight-bold is-size-6">Abroad:</span>
                  {abroadCounting}
                  <img src={abroadIcon} class="mt-2" alt="" />
                  <i class={abroadTravelIcon}></i>
                </p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <!-- </div>
    {/if}
  </div> -->

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
        <button onclick={() => addPlacemark()} class="button is-info has-text-white">
          Add your placemark
        </button>
      </div>
      <div class="column is-9">
        <p class="has-text-right">
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

<!-- {placemarks} -->
