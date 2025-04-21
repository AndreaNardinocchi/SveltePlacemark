<script context="module">
  import Title from "$lib/ui/Title.svelte";
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import PlacemarkCard from "$lib/ui/PlacemarkCard.svelte";
  import InstaGrid from "$lib/ui/InstaGrid.svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import InstHeader from "$lib/ui/InstHeader.svelte";

  // // @ts-ignore
  // export const load = async ({ page }) => ({
  //   props: {
  //     key: page.path
  //   }
  // });

  /**
   * @type {any}
   */
  export let key;
</script>

<!-- <Header /> -->
<div class="container">
  <Title />
  <InstHeader />
  <PlacemarkCard />
  <InstaGrid />
</div>

<!-- <Footer /> -->
