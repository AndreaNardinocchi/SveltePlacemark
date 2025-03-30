<script context="module">
    import Title from "$lib/ui/Title.svelte";
    import Footer from "$lib/Footer.svelte";
    import Header from "$lib/Header.svelte";
    import PlacemarkCard from "$lib/ui/PlacemarkCard.svelte";
    import InstaGrid from "$lib/ui/InstaGrid.svelte";
  
  
      // @ts-ignore
      export const load = async ({ page }) => ({
          props: {
              key: page.path,
          },
      });
  
      import Transition from '$lib/ui/Transition.svelte';
      /**
       * @type {any}
       */
      export let key;
    
    
  </script>
  <Header />
  <div class="container" >
    <Transition>
    <Title  />
  </Transition>
    <PlacemarkCard />
    <InstaGrid />
    
  </div>
  
  <Footer />
  