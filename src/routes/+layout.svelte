<script lang="ts">
  // https://www.npmjs.com/package/svelte-fa
  import { loggedInUser } from "$lib/runes.svelte";
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import WelcomeMenu from "$lib/ui/WelcomeMenu.svelte";
  import { onMount } from "svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service";

  let pageTitle: any = "Welcome to PlaceMark";
  onMount(async () => {
    await placemarkService.restoreSession();
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="container">
  {#if loggedInUser.email}
    <Header />
  {:else}
    <!-- <WelcomeMenu /> -->
  {/if}
  <slot />
</div>
<Footer />
