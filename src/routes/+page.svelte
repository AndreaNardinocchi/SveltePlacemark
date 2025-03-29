<script context="module">
  // https://www.npmjs.com/package/svelte-fa
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte"; 
  import WelcomeMenu from "$lib/ui/WelcomeMenu.svelte";
  import LoginForm from "$lib/ui/LoginForm.svelte";

    // @ts-ignore
    export const load = async ({ page }) => ({
        props: {
            key: page.path,
        },
    });

    import Transition from '$lib/ui/Transition.svelte';
    import SplashScreen from "$lib/ui/SplashScreen.svelte";
    /**
     * @type {any}
     */
    export let key;
  
  
</script>
<WelcomeMenu />
<div class="container" >
  <Transition>
 <SplashScreen />
</Transition>
</div>
<Footer />


