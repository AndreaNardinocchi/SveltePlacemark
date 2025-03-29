<script context="module">
  // https://www.npmjs.com/package/svelte-fa
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte"; 
  import WelcomeMenu from "$lib/ui/WelcomeMenu.svelte";
  import SplashScreen from "$lib/ui/SplashScreen.svelte";

    // @ts-ignore
    export const load = async ({ page }) => ({
        props: {
            key: page.path,
        },
    });

    import Transition from '$lib/ui/Transition.svelte';
    import SignupForm from "$lib/ui/SignupForm.svelte";
    import { fromStore } from "svelte/store";
    /**
     * @type {any}
     */
    export let key;
  
  
</script>
<WelcomeMenu />
<div class="container" >
  <Transition>
 <!-- <SignupForm /> -->
  <SplashScreen />
</Transition>
</div>
<Footer />


