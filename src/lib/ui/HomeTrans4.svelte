<script lang="ts">
    // https://www.npmjs.com/package/svelte-inview
    // import { fade } from 'svelte/transition';
    import { fly } from 'svelte/transition';
    // import { inview } from 'svelte-inview';
    import HomepageCategoryCard from './HomepageCategoryCard.svelte';
    import HomepageTextCard from './HomepageTextCard.svelte';
  
    // let isInView: any;
  </script>
  
  <!-- <div
    class="wrapper"
    use:inview={{ unobserveOnEnter: true, rootMargin: '-20%' }}
    on:change={({ detail }) => {
      isInView = detail.inView;
    }}
  >
    {#if isInView} -->
      <div in:fly={{ x: -200, duration: 6000 }} >
        <main class="columns ">
            <div class="column is-6 mt-6">
            <HomepageTextCard image = {"https://i.ibb.co/n8cmdzcS/aircraft.png"}, text = {"...wonderful journey!"}/>
          </div>
          <div class="column is-6">
            <HomepageCategoryCard image={"https://i.ibb.co/BKnZdnxF/beach.jpg"}, alt = {"beach"}, category = {"Beaches"}/>
          </div>
          </main>
            
      </div>
       
    <!-- {/if}
  
    
  </div> -->
  
  <!-- <style>
    .wrapper {
      margin-top: 30px;
    }
  
    /* .box {
      width: 300px;
      border: 1px solid rgb(221, 221, 221);
      padding: 25px;
      border-radius: 10px;
    } */
  </style>
  
   -->