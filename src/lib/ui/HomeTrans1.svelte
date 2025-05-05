<script lang="ts">
  import { fly } from "svelte/transition";
  import HomepageCategoryCard from "./HomepageCategoryCard.svelte";
</script>

<div in:fly={{ x: 200, duration: 1000 }}>
  <main class="columns mb-4 mt-3">
    <div class="column is-6">
      <HomepageCategoryCard />
    </div>
    <div class="column is-6 mt-6">
      <h1 class="title is-2 mb-5">
        <span class="icon mr-5"><i class="fas fa-map-marker-alt"></i></span>
        <span class="icon mr-4"><i class="fas fa-plane"></i></span>
        <p>PlaceMark</p>
      </h1>
      <h2 class="subtitle is-4 mt-2">Add your next journey!</h2>
      <p class="has-text-centered">
        <a class="button is-medium" href="/signup">
          <span class="icon"><i class="fas fa-map-marker-alt"></i></span><span>Sign Up</span>
        </a>
        <a class="button is-medium is-info has-text-white" href="/login">
          <span class="icon"
            ><i class="fas fa-plane" aria-hidden="true" style="color: #ffffff;"></i></span
          >
          <span>Login</span>
        </a>
      </p>
    </div>
  </main>
</div>
