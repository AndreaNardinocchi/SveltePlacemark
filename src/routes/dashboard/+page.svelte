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
</script>

<!-- <Header /> -->
<div class="container">
  <Dashboard />
</div>
<!-- <Footer /> -->
