<script lang="ts">
    // https://www.npmjs.com/package/svelte-inview
    import { fade } from 'svelte/transition';
    import { fly } from 'svelte/transition';
    import { inview } from 'svelte-inview';
    import HomepageCategoryCard from './HomepageCategoryCard.svelte';
    import HomepageTextCard from './HomepageTextCard.svelte';
  
    let isInView: any;
  </script>
  
  <div
    class="wrapper"
    use:inview={{ unobserveOnEnter: true, rootMargin: '-20%' }}
    on:change={({ detail }) => {
      isInView = detail.inView;
    }}
  >
    {#if isInView}
      <div in:fly={{ y: 200, duration: 1000 }} >
        <main class="columns mb-4 mt-3">
      
            <div class="column is-6">
              <HomepageCategoryCard />
            </div>
              <div class="column is-6 mt-6">
                <h1 class="title is-2 mb-5">
                  <span class="icon mr-5"><i class="fas fa-map-marker-alt"></i></span><span class="icon mr-4"><i class="fas fa-plane"></i></span>
                  <p>PlaceMark</p>
                </h1>
                <h2 class="subtitle is-4 mt-2">Add your next journey!</h2>
                <p class="has-text-centered">
                  <a class="button is-medium" href="/signup">
                  <span class="icon"><i class="fas fa-map-marker-alt"></i></span><span>Sign Up</span>
                  </a>
                  <a class="button is-medium is-info has-text-white" href="/login">
                  <span class="icon"><i class="fas fa-plane" aria-hidden="true" style="color: #ffffff;"></i>
                  </span><span>Login</span>
                  </a>
                </p>
              </div>
            
              </main>
            
      </div>
       </div>
    {/if}

    
  </div>
  
  <style>
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
  
  