<!-- <script >
    import { loggedInUser } from "$lib/runes.svelte";
    import Heading from "$lib/ui/Heading.svelte";
    import Menu from "$lib/ui/Menu.svelte";
  </script>
  
  <div class="container">
    {#if loggedInUser.email}
      <Menu />
      <Heading />
    {/if}
    <slot />
  </div> -->

<script lang="ts" context="module">
  // https://www.npmjs.com/package/svelte-fa
  import { loggedInUser } from "$lib/runes.svelte";
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import WelcomeMenu from "$lib/ui/WelcomeMenu.svelte";

  // @ts-ignore
  export const load = async ({ page }) => ({
    props: {
      key: page.path
    }
  });

  /**
   * @type {any}
   */
  export let key: any;
</script>

<div class="container">
  {#if loggedInUser.email}
    <Header />
  {:else}
    <WelcomeMenu />
  {/if}
  <!-- <SignupForm /> -->
  <slot />
</div>
<Footer />
