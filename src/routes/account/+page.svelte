<script lang="ts">
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

  let pageTitle: any = "Your Account Details | PlaceMark";
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="container">
  <Account />
</div>
