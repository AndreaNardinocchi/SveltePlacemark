<script lang="ts">
  import Title from "$lib/ui/Title.svelte";
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import PlacemarkCard from "$lib/ui/PlacemarkCard.svelte";
  import InstaGrid from "$lib/ui/InstaGrid.svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import InstHeader from "$lib/ui/InstHeader.svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { onMount } from "svelte";

  // // @ts-ignore
  // export const load = async ({ page }) => ({
  //   props: {
  //     key: page.path
  //   }
  // });

  /**
   * @type {any}
  //  */
  // export let key;

  let pageTitle: any = "";
  async function getBroswerTitle() {
    const pathParts = window.location.pathname.split("/");
    let categoryId = pathParts[pathParts.indexOf("category") + 1];
    let placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
    const placemark = await placemarkService.getPlacemarkById(categoryId, placemarkId);
    if (placemark) {
      pageTitle = `${placemark.title} | PlaceMark`; // This can be dynamic
    }
    console.log("PageTitle: ", pageTitle);
    return pageTitle;
  }

  onMount(async () => {
    pageTitle = await getBroswerTitle();
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>
<!-- <Header /> -->
<div class="container">
  <Title />
  <InstHeader />
  <PlacemarkCard />
  <InstaGrid />
</div>

<!-- <Footer /> -->
