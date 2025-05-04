<script context="module">
  import EditPoi from "./EditPOI.svelte";
  // https://www.npmjs.com/package/svelte-fa
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

<div class="container">
  <EditPoi />
</div>
