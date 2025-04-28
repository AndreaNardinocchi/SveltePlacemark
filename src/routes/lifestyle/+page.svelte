<script context="module">
  // https://www.npmjs.com/package/svelte-fa
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import Lifestyle from "./Lifestyle.svelte";
  import LoginForm from "../login/LoginForm.svelte";

  // @ts-ignore
  export const load = async ({ page }) => ({
    props: {
      key: page.path
    }
  });

  import WelcomeMenu from "$lib/ui/WelcomeMenu.svelte";
  /**
   * @type {any}
   */
  export let key;
  let pageTitle = "About Lifestyle | PlaceMark"; // This can be dynamic
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>
<!-- <Header /> -->
<div class="container">
  <Lifestyle />
</div>
<!-- <Footer /> -->
