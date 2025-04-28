<script context="module">
  // https://www.npmjs.com/package/svelte-fa
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import LoginForm from "../login/LoginForm.svelte";
  import News from "./News.svelte";

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
  let pageTitle = "News worldwide | PlaceMark"; // This can be dynamic
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>
<!-- <Header /> -->
<div class="container">
  <News />
</div>
<!-- <Footer /> -->
