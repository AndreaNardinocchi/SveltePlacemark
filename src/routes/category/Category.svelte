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

  // Props or reactive variables
  export let backgroundColor =
    "title box has-text-centered has-background-grey-dark has-text-white"; // Default example
  export let imageCode = "https://i.ibb.co/qL14ZG2g/mossel-dish-7724006-1280.jpg"; // Image code (URL or base64)
  export let category = { title: "Restaurants", img: "" }; // Category object with title and image
  export let placemarkSum = 0;
  export let yesCounting = 0;
  export let noCounting = 0;
  export let resultMax = 0;
  export let resultMin = 0;
  export let localCounting = 0;
  export let abroadCounting = 0;
  export let localIcon = "";
  export let abroadIcon = "";
  export let localTravelIcon = "";
  export let abroadTravelIcon = "";
</script>

<section class="section mt-6">
  <div
    class="wrapper mb-5"
    use:inview={{ unobserveOnEnter: true, rootMargin: "-10%" }}
    on:change={({ detail }) => {
      isInView = detail.inView;
    }}
  >
    {#if isInView}
      <div in:fly={{ x: 200, duration: 1000 }}>
        <div class={backgroundColor}>
          <div class="card-image">
            <figure class="image 264x264 m-auto">
              <img src={imageCode} alt="placeholder" style="border-radius: 15px;" />
            </figure>
          </div>
          <div class="columns">
            <div class="column">
              <article class="card-content pt-2">
                <p class="card-header-title">- {category.title} -</p>
                <p></p>
              </article>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <div
    class="wrapper mb-5"
    use:inview={{ unobserveOnEnter: true, rootMargin: "-5%" }}
    on:change={({ detail }) => {
      isInView = detail.inView;
    }}
  >
    {#if isInView}
      <div in:fly={{ x: -200, duration: 1000 }}>
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
                        <span class="has-text-weight-bold is-size-6">Furthest placemark:</span><br
                        />
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
      </div>
    {/if}
  </div>

  <img
    id="category-image"
    src={category.img}
    class="mb-5"
    style="border-radius: 10px; display: none;"
    alt=""
  />

  <!-- Assuming list-placemarks, add-placemark, and category-image are separate Svelte components -->
  <div
    class="wrapper mb-5"
    use:inview={{ unobserveOnEnter: true, rootMargin: "-1%" }}
    on:change={({ detail }) => {
      isInView = detail.inView;
    }}
  >
    {#if isInView}
      <div in:fly={{ y: 200, duration: 2000 }}>
        <PlacemarkListCard>
          <ListPlacemarks />
        </PlacemarkListCard>
        <AddPlacemark />
        <CategoryImage />
      </div>
    {/if}
  </div>
</section>
