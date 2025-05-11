<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  import { currentDataSets } from "$lib/runes.svelte";
  import { onMount } from "svelte";
  import { placemarkService } from "./services/placemark-service";
  subTitle.text = "Placemarks data";

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
