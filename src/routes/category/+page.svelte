<script context="module">
  // @ts-ignore
  export const load = async ({ page }) => ({
    props: {
      key: page.path
    }
  });

  import WelcomeMenu from "$lib/ui/WelcomeMenu.svelte";
  import Category from "./Category.svelte";
  /**
   * @type {any}
   */
  export let key;
</script>

<!-- <Header /> -->
<div class="container">
  <Category />
</div>
<!-- <Footer /> -->
