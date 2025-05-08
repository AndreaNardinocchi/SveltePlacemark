<script lang="ts">
  import { page } from "$app/stores";
  import Title from "$lib/ui/Title.svelte";
  import PlacemarkCard from "$lib/ui/PlacemarkCard.svelte";
  import InstaGrid from "$lib/ui/InstaGrid.svelte";
  import InstHeader from "$lib/ui/InstHeader.svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { onMount } from "svelte";
  import { placemark } from "$lib/runes.svelte";

  /**
   * @type {any}
  //  */
  // export let key;
  let categoryId: string;
  let placemarkId: string;

  $: categoryId = $page.params._id;
  $: placemarkId = $page.params._id;

  export let data;

  console.log("No worries", data, placemarkId);

  let pageTitle: any = "";
  async function getBroswerTitle() {
    /**
     * The below variables will enable me to retrieve tha category and placemark ids
     * https://css-tricks.com/snippets/javascript/get-url-and-url-parts-in-javascript/
     * https://www.slingacademy.com/article/isolating-file-paths-and-directories-using-javascript-string-methods-without-extracting-filename-extension/
     */
    const pathParts = window.location.pathname.split("/");
    let categoryId = pathParts[pathParts.indexOf("category") + 1];
    let placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
    const placemark = await placemarkService.getPlacemarkById(placemarkId);
    if (placemark) {
      pageTitle = `${placemark.title} | #instaPlaceMark!`; // This can be dynamic
    }
    console.log("PageTitle: ", pageTitle);
    return pageTitle;
  }

  onMount(async () => {
    pageTitle = await getBroswerTitle();
    await placemarkService.refreshSpecificPlacemark();
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="container">
  <Title />
  <InstHeader />
  <PlacemarkCard />
  <InstaGrid />
</div>
