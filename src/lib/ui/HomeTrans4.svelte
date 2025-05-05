<script lang="ts">
  import { fly } from "svelte/transition";
  import HomepageCategoryCard from "./HomepageCategoryCard.svelte";
  import HomepageTextCard from "./HomepageTextCard.svelte";
</script>

<div in:fly={{ x: -200, duration: 6000 }}>
  <main class="columns">
    <div class="column is-6 mt-6">
      <HomepageTextCard
        image="{'https://i.ibb.co/n8cmdzcS/aircraft.png'},"
        text={"...wonderful journey!"}
      />
    </div>
    <div class="column is-6">
      <HomepageCategoryCard
        image="{'https://i.ibb.co/BKnZdnxF/beach.jpg'},"
        alt="{'beach'},"
        category={"Beaches"}
      />
    </div>
  </main>
</div>
