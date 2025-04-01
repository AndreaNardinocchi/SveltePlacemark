<script context="module">
    // https://www.npmjs.com/package/svelte-fa
    import Footer from "$lib/Footer.svelte";
    import Header from "$lib/Header.svelte"; 
    import Dashboard from "$lib/ui/Dashboard.svelte";
    import Lifestyle from "$lib/ui/Lifestyle.svelte";
    import ListCategories from "$lib/ui/ListCategories.svelte";
    import LoginForm from "$lib/ui/LoginForm.svelte";
  
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
  <Header />
  <div class="container" >
   <Dashboard />
  </div>
  <Footer />
  