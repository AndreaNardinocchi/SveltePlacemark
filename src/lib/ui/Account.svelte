<script lang="ts">
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview
  import { fly } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { inview } from 'svelte-inview';
 
  let isInView: boolean = false;
    import UserDetails from "./UserDetails.svelte";
    import StatsAccount from "./StatsAccount.svelte";
</script>

<section class="section mt-6 pt-6">
  <div
  class="wrapper mb-5"
  use:inview={{ unobserveOnEnter: true, rootMargin: '20%' }}
  on:change={({ detail }) => {
  isInView = detail.inView;
  }}
  >
  {#if isInView}
  <div in:fly={{ y: -500, duration: 1000 }}> 
     <UserDetails />
     </div>
     {/if}
     </div>
    <div class = "columns mt-2">
      <div class = "column is-3">
      </div>
      <div class = "column is-6">
        <hr >
      </div>
      <div class = "column is-3">
      </div>
    </div>
    <section class="pt-4"> 
      <div
      class="wrapper mb-5"
      use:inview={{ unobserveOnEnter: true, rootMargin: '20%' }}
      on:change={({ detail }) => {
      isInView = detail.inView;
      }}
      >
      {#if isInView}
      <div in:fly={{ y: 200, duration: 3000 }}> 
        <StatsAccount />
        </div>
        {/if}
        </div>
    </section>
  </section>