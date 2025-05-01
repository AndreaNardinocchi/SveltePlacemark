<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";

  import { currentPlacemarks } from "$lib/runes.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import PlacemarkListCard from "$lib/ui/PlacemarkListCard.svelte";
  import { currentDataSets } from "$lib/runes.svelte";
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
