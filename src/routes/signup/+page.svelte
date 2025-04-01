<script context="module">
    // https://www.npmjs.com/package/svelte-fa
    import Footer from "$lib/Footer.svelte";
    import Header from "$lib/Header.svelte"; 
    import SignupForm from "$lib/ui/SignupForm.svelte";
  
      // @ts-ignore
      export const load = async ({ page }) => ({
          props: {
              key: page.path,
          },
      });
  
    import WelcomeMenu from "$lib/ui/WelcomeMenu.svelte";
      /**
       * @type {any}
       */
      export let key;
    
    
  </script>
  <WelcomeMenu />
  <div class="container" >
 
   <SignupForm />

  </div>
  <Footer />