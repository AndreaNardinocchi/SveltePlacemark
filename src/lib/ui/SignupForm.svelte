<script lang="ts">
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview
  import { fly } from 'svelte/transition';
  import { inview } from 'svelte-inview';
  import PlacemarkSignup from './PlacemarkSignup.svelte';
  import PlacemarkSignupImage from './PlacemarkSignupImage.svelte';

  let isInView: boolean = false;
</script> 
<section class="hero is-small has-background-grey mt-6 px-6">
  <div class="hero-body mt-6">
    <p class="title has-text-white">Sign up</p>
  </div>
</section>
<section class="px-3">
  <section class="columns is-multiple">
    <!-- Left Column for PlacemarkSignup -->
    <section class="column is-8 px-4">
      <div
      class="wrapper"
      use:inview={{ unobserveOnEnter: true, rootMargin: '-5%' }}
      on:change={({ detail }) => {
      isInView = detail.inView;
      }}
      >
      {#if isInView}
      <div in:fly={{ y: 200, duration: 1000 }}>
      <PlacemarkSignup />
      </div>
      {/if}
      </div>
    </section>
    <section class="column is-4 px-6 ">
      <div
      class="wrapper"
      use:inview={{ unobserveOnEnter: true, rootMargin: '-5%' }}
      on:change={({ detail }) => {
      isInView = detail.inView;
      }}
      >
      {#if isInView}
      <div in:fly={{ y: -200, duration: 1000 }}>
      <PlacemarkSignupImage />
      </div>
      {/if}
      </div>
    </section>
  </section>
</section>
