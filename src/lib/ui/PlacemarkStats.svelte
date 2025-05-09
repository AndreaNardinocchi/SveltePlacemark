<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview
  import { fly } from "svelte/transition";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { onMount } from "svelte";
  import { category, loggedInUser } from "$lib/runes.svelte";
  import type { Placemark, User } from "$lib/ui/types/placemark-types";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import DOMPurify from "dompurify";

  /**
   * This is to sanitize any inputs where needed
   * https://github.com/cure53/DOMPurify?tab=readme-ov-file#running-dompurify-on-the-server
   */
  function sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input); // Use DOMPurify to clean the input
  }

  subTitle.text = "Placemarks data";

  let isInView: boolean = false;

  let map: LeafletMap;

  let placemarkSum = $state(0);
  let yesCounting = $state(0);
  let noCounting = $state(0);
  let resultMax = $state("");
  let resultMin = $state("");
  let localCounting = $state(0);
  let abroadCounting = $state(0);
  let localIcon = $state("");
  let abroadIcon = $state("");
  let localTravelIcon = $state("");
  let abroadTravelIcon = $state("");

  export async function sumPlacemarks(): Promise<number> {
    const url = window.location.pathname;
    const categoryId = url.split("/").pop();
    if (!categoryId) {
      console.warn("No category ID found in URL.");
      return 0;
    }
    const category = await placemarkService.getCategoryById(categoryId);
    if (category && category.placemarks) {
      const placemarks = category.placemarks;
      console.log("These are the id and placemarks: ", categoryId, placemarks);
      return placemarks.length;
    }
    return 0;
  }

  export async function getYesCounting(): Promise<number> {
    const url = window.location.pathname;
    const categoryId = url.split("/").pop();
    if (!categoryId) {
      console.warn("No category ID found in URL.");
      return 0;
    }
    const category = await placemarkService.getCategoryById(categoryId);
    if (category?.placemarks) {
      let yes = 0;
      for (let i = 0; i < category.placemarks.length; i++) {
        if (category.placemarks[i].visited === "Yes") {
          yes += 1;
        }
      }
      return yes;
    }
    return 0;
  }

  export async function getNoCounting(): Promise<number> {
    const url = window.location.pathname;
    const categoryId = url.split("/").pop();
    if (!categoryId) {
      console.warn("No category ID found in URL.");
      return 0;
    }
    const category = await placemarkService.getCategoryById(categoryId);
    if (category?.placemarks) {
      let no = 0;
      for (let i = 0; i < category.placemarks.length; i++) {
        if (category.placemarks[i].visited === "No") {
          no += 1;
        }
      }
      return no;
    }
    return 0;
  }

  let user = $state<User>({} as User);
  let token = loggedInUser.token;
  let email = loggedInUser.email;

  onMount(async () => {
    if (token && email) {
      try {
        const users = await placemarkService.getAllUsers(token);
        const matchedUser = users.find((user) => user.email === email);
        if (matchedUser) {
          user = matchedUser;
          console.log("Matched user:", user);
        } else {
          console.log("No user found matching email.");
        }
      } catch (error) {
        console.error("Failed to fetch or filter user:", error);
      }
    } else {
      console.error("Missing token or email.");
    }
  });

  export async function calculateMinMaxDistance(): Promise<{
    resultMax: string;
    resultMin: string;
  }> {
    const url = window.location.pathname;
    const categoryId = url.split("/").pop();

    if (!categoryId) {
      console.warn("No category ID found in URL.");
      return { resultMax: "0 km away", resultMin: "0 km away" };
    }

    const category = await placemarkService.getCategoryById(categoryId);

    const lat1 = parseFloat(user.userLat);
    console.log("This is your lat1: ", lat1);
    const long1 = parseFloat(user.userLong);

    const toRadians = (degrees: number) => degrees * (Math.PI / 180);
    const R = 6371;
    const allDistances: number[] = [];

    if (category?.placemarks) {
      for (let i = 0; i < category.placemarks.length; i++) {
        const lat2 = parseFloat(category.placemarks[i].lat);
        const long2 = parseFloat(category.placemarks[i].long);

        const dLat = toRadians(lat2 - lat1);
        const dLong = toRadians(long2 - long1);

        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLong / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        allDistances.push(distance);
      }
    }

    // Compute max/min
    const maxVal = Math.max(...allDistances);
    console.log("This is your maxVal: ", maxVal);
    const minVal = Math.min(...allDistances);

    const resultMax = (maxVal === -Infinity ? 0 : maxVal).toFixed(2) + " km away";
    const resultMin = (minVal === Infinity ? 0 : minVal).toFixed(2) + " km away";

    return { resultMax, resultMin };
  }

  export async function getLocalAbroadStats(): Promise<boolean> {
    const url = window.location.pathname;
    const categoryId = url.split("/").pop();

    if (!categoryId) {
      console.warn("No category ID found.");
      return false;
    }

    const category = await placemarkService.getCategoryById(categoryId);

    if (!category || !user || !category.placemarks) {
      console.warn("Missing category or user info");
      return false;
    }

    const local: string[] = [];
    const abroad: string[] = [];

    const userCountry = user.country.toLowerCase().trim();
    console.log("Country: ", userCountry);

    for (let i = 0; i < category.placemarks.length; i++) {
      const destination = category.placemarks[i].country.toLowerCase().trim();

      if (destination === userCountry) {
        local.push("Yes");
        localIcon = "https://i.ibb.co/Q7J1t5jt/102-lokasimanusia-mini.jpg";
        localTravelIcon = "fas fa-solid fa-car";
      } else {
        abroad.push("No");
        abroadIcon = "https://i.ibb.co/mVhwZKmD/international-mini-1.png";
        abroadTravelIcon = "fas fa-solid fa-plane";
      }
    }

    localCounting = local.length;
    abroadCounting = abroad.length;

    return true;
  }

  export async function refresh() {
    console.log("PlacemarkStats is refreshing");
    await placemarkService.refreshPlacemarksInfo();
    placemarkSum = await sumPlacemarks();
    yesCounting = await getYesCounting();
    noCounting = await getNoCounting();
    const result = await calculateMinMaxDistance();
    await getLocalAbroadStats();
    resultMax = sanitizeInput(result.resultMax);
    resultMin = sanitizeInput(result.resultMin);
  }

  // onMount will fetch and assign:
  onMount(async () => {
    await refresh();
  });
</script>

<div class="mt-4" in:fly={{ x: -200, duration: 1000 }}>
  {#if category}
    <div class="box has-background-white">
      <div class="columns">
        <div class="column" in:fly={{ y: -200, duration: 3000 }}>
          <section>
            <header class="card-header"></header>
            <div class="columns has-text-left">
              <div class="column is-6 m-auto">
                <div class="card-image mt-1">
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
                    {sanitizeInput(placemarkSum.toString())}<br />
                    <span class="has-text-weight-bold is-size-6">Visited:</span>
                    {sanitizeInput(yesCounting.toString())}<br />
                    <span class="has-text-weight-bold is-size-6">To visit:</span>
                    {sanitizeInput(noCounting.toString())}<br />
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
                  <p class="content is-size-6 pt-5">
                    <span class="has-text-weight-bold is-size-6">Local:</span>
                    {sanitizeInput(localCounting.toString())}
                    <img src={localIcon} alt="" /> <i class={localTravelIcon}></i>
                    <br />
                    <span class="has-text-weight-bold is-size-6">Abroad:</span>
                    {sanitizeInput(abroadCounting.toString())}
                    <img src={abroadIcon} alt="" />
                    <i class={abroadTravelIcon}></i>
                  </p>
                </article>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  {/if}
</div>
