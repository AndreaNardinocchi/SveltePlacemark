<script context="module">
  // https://www.npmjs.com/package/svelte-fa
  import Dashboard from "./Dashboard.svelte";

  // @ts-ignore
  export const load = async ({ page }) => ({
    props: {
      key: page.path
    }
  });

  /**
   * @type {any}
   */
  export let key;
  let pageTitle = "Dashboard | PlaceMark"; // This can be dynamic
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<!-- <Header /> -->
<div class="container">
  <Dashboard />
</div>
<!-- <Footer /> -->
