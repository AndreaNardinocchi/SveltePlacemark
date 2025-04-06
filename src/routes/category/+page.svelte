<script context="module">
  // https://www.npmjs.com/package/svelte-fa
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import LoginForm from "../login/LoginForm.svelte";
  import Account from "../account/Account.svelte";
  import About from "../about/About.svelte";

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

<Header />
<div class="container">
  <Category />
</div>
<!-- <Footer /> -->
