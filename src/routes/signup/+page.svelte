<script context="module">
  // https://www.npmjs.com/package/svelte-fa
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import SignupForm from "./SignupForm.svelte";

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
  let pageTitle = "Sign Up for PlaceMark"; // This can be dynamic
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<!-- <WelcomeMenu /> -->
<div class="container">
  <SignupForm />
</div>
<!-- <Footer /> -->
