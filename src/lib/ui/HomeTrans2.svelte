<script lang="ts">
  import { fly } from "svelte/transition";
  import HomepageCategoryCard from "./HomepageCategoryCard.svelte";
  import HomepageTextCard from "./HomepageTextCard.svelte";
</script>

<div in:fly={{ x: -200, duration: 3000 }}>
  <main class="columns mb-4">
    <div class="column is-6 mt-6">
      <HomepageTextCard />
    </div>
    <div class="column is-6">
      <HomepageCategoryCard
        image="{'https://i.ibb.co/xK9dvTd1/museum.jpg'},"
        alt="{'museum'},"
        category={"Museums"}
      />
    </div>
  </main>
</div>
