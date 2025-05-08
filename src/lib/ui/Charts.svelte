<script lang="ts">
  import { currentPlacemarks, subTitle } from "$lib/runes.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  import { currentDataSets } from "$lib/runes.svelte";
  import { onMount } from "svelte";
  import { placemarkService } from "./services/placemark-service";
  subTitle.text = "Placemarks data";
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview
  onMount(async () => {
    await placemarkService.refreshPlacemarksInfo();
  });
</script>

<div class="box has-background-white">
  <div class="columns">
    <div class="column">
      <!-- title="Placemark countries" -->
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

<!-- <script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Chart from "svelte-frappe-charts";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  import { currentDataSets, category, currentPlacemarks } from "$lib/runes.svelte";

  subTitle.text = "Placemarks data";

  function updateCurrentDataSets() {
    const filteredPlacemarks = currentPlacemarks.placemarks.filter(
      (p) => p.categoryId === category._id
    );

    const countryCountMap: Record<string, number> = {};
    let visited = 0;
    let notVisited = 0;

    filteredPlacemarks.forEach((p) => {
      countryCountMap[p.country] = (countryCountMap[p.country] || 0) + 1;

      if (p.visited === "true" || p.visited === true) {
        visited++;
      } else {
        notVisited++;
      }
    });

    currentDataSets.totalByCountry = {
      labels: Object.keys(countryCountMap),
      datasets: [
        {
          values: Object.values(countryCountMap)
        }
      ]
    };

    currentDataSets.totalByVisited = {
      labels: ["Visited", "Not Visited"],
      datasets: [
        {
          values: [visited, notVisited]
        }
      ]
    };
  }

  // Reactively update charts when the category changes
  $: if (category._id) {
    updateCurrentDataSets();
  }
</script> -->
