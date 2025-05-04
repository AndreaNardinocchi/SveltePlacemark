<script context="module">
  // https://www.npmjs.com/package/svelte-fa
  import Account from "./Account.svelte";
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
  <Account />
</div>
