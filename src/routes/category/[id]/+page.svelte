<script lang="ts">
  // @ts-ignore
  // export const load = async ({ page }) => ({
  //   props: {
  //     key: page.path
  //   }
  // });

  import { placemarkService } from "$lib/ui/services/placemark-service";
  // import { category } from "$lib/runes.svelte";
  import WelcomeMenu from "$lib/ui/WelcomeMenu.svelte";
  import { onMount } from "svelte";
  import Category from "./Category.svelte";
  /**
  //  * @type {any}
   */
  // export let key;

  let pageTitle: any = "";

  async function getBroswerTitle() {
    const pathParts = window.location.pathname.split("/");
    let categoryId = pathParts[pathParts.indexOf("category") + 1];
    let placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
    const category = await placemarkService.getCategoryById(categoryId);
    if (category) {
      pageTitle = `${category.title} | PlaceMark`; // This can be dynamic
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
  <Category />
</div>
<!-- <Footer /> -->
