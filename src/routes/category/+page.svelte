<script context="module">
    // https://www.npmjs.com/package/svelte-fa
    import Footer from "$lib/Footer.svelte";
    import Header from "$lib/Header.svelte"; 
    import LoginForm from "$lib/ui/LoginForm.svelte";
    import Account from "$lib/ui/Account.svelte";
    import About from "$lib/ui/About.svelte";
  
      // @ts-ignore
      export const load = async ({ page }) => ({
          props: {
              key: page.path,
          },
      });
  
      import Transition from '$lib/ui/Transition.svelte';
    import WelcomeMenu from "$lib/ui/WelcomeMenu.svelte";
    import Category from "$lib/ui/Category.svelte";
      /**
       * @type {any}
       */
      export let key;
    
    
  </script>
  <Header />
  <div class="container" >
    <Transition>
   <Category />
  </Transition>
  </div>
  <Footer />
  