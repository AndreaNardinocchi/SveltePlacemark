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
</script>

<Header />
<div class="container">
  <Lifestyle />
</div>
<!-- <Footer /> -->
