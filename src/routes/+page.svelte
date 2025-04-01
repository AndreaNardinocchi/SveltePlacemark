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

    import SignupForm from "$lib/ui/SignupForm.svelte";
    import { fromStore } from "svelte/store";
    import Homepage from "$lib/ui/Homepage.svelte";
    /**
     * @type {any}
     */
    export let key;
  
  
</script>
<WelcomeMenu/>
<div class="container" >
  
 <!-- <SignupForm /> -->
  <Homepage />

</div>
<Footer />


