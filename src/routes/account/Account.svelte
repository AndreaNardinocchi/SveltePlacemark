<script lang="ts">
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview
  import { fly } from "svelte/transition";
  import { inview } from "svelte-inview";
  import { loggedInUser } from "$lib/runes.svelte";
  import type { Category, User } from "$lib/ui/types/placemark-types";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import StatsAccount from "$lib/ui/StatsAccount.svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { onMount } from "svelte";

  // let isInView: boolean = false;

  // // ✅ Use $state for reactive values
  let categories = $state<Category[]>([]);

  // ✅ Use $state for reactive values
  // let users = $state<User[]>([]);

  // onMount(async () => {
  //   users = await placemarkService.getAllUsers(loggedInUser.token);
  // });
</script>

<section class="section mt-6 pt-6">
  <!-- <div
    class="wrapper mb-5"
    use:inview={{ unobserveOnEnter: true, rootMargin: "20%" }}
    on:change={({ detail }) => {
      isInView = detail.inView;
    }}
  >
    {#if isInView}
      <div in:fly={{ y: -500, duration: 1000 }}> -->
  <UserDetails />
  <!-- </div>
    {/if}
  </div> -->
  <div class="columns mt-2">
    <div class="column is-3"></div>
    <div class="column is-6">
      <hr />
    </div>
    <div class="column is-3"></div>
  </div>
  <section class="pt-4">
    <!-- <div
      class="wrapper mb-5"
      use:inview={{ unobserveOnEnter: true, rootMargin: "20%" }}
      on:change={({ detail }) => {
        isInView = detail.inView;
      }}
    >
      {#if isInView}
        <div in:fly={{ y: 200, duration: 3000 }}> -->
    <StatsAccount {categories} />
    <!-- </div>
      {/if}
    </div> -->
  </section>
</section>
