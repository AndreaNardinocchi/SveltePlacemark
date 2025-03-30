<script context="module">
    // https://www.npmjs.com/package/svelte-fa
    import Footer from "$lib/Footer.svelte";
    import Header from "$lib/Header.svelte"; 
    import Lifestyle from "$lib/ui/Lifestyle.svelte";
    import LoginForm from "$lib/ui/LoginForm.svelte";
  
      // @ts-ignore
      export const load = async ({ page }) => ({
          props: {
              key: page.path,
          },
      });
  
      import Transition from '$lib/ui/Transition.svelte';
    import WelcomeMenu from "$lib/ui/WelcomeMenu.svelte";
      /**
       * @type {any}
       */
      export let key;
    
    
  </script>
  <Header />
  <div class="container" >
    <Transition>
   <Lifestyle />
  </Transition>
  </div>
  <Footer />
  