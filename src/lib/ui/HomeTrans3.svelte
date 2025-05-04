<script lang="ts">
  import { fly } from "svelte/transition";
  import HomepageCategoryCard from "./HomepageCategoryCard.svelte";
  import HomepageTextCard from "./HomepageTextCard.svelte";
</script>

<div in:fly={{ x: 200, duration: 5000 }}>
  <main class="columns mb-4">
    <div class="column is-6">
      <HomepageCategoryCard
        image="{'https://i.ibb.co/pBN2Xs9y/park.jpg'},"
        alt="{'park'},"
        category={"Parks"}
      />
    </div>
    <div class="column is-6 mt-6">
      <HomepageTextCard
        image="{'https://i.ibb.co/LhhGK9Qg/airplane1.png'},"
        text={"...and to place your mark on your next..."}
      />
    </div>
  </main>
</div>
