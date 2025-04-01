<script lang="ts">
    // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
    // https://www.npmjs.com/package/svelte-inview
    import HomeTrans1 from './HomeTrans1.svelte';
    import HomeTrans2 from './HomeTrans2.svelte';
    import HomeTrans3 from './HomeTrans3.svelte';
    import HomeTrans4 from './HomeTrans4.svelte';
    import { inview } from 'svelte-inview';
   
    let isInView: boolean = false;
   
  </script>
  <div
  class="wrapper"
  use:inview={{ unobserveOnEnter: true, rootMargin: '-20%' }}
  on:change={({ detail }) => {
  isInView = detail.inView;
  }}
  >
  <section class="hero is-fullheight is-default is-bold">
    <div class="hero-head"></div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-vcentered mt-6"></div>
        {#if isInView}
        <HomeTrans1 />
        {/if}
        <div
        class="wrapper"
        use:inview={{ unobserveOnEnter: true, rootMargin: '-20%' }}
        on:change={({ detail }) => {
        isInView = detail.inView;
        }}
        >
        {#if isInView}
        <div>
          <HomeTrans2 />
        </div>
        {/if}
        <div
        class="wrapper"
        use:inview={{ unobserveOnEnter: true, rootMargin: '-20%' }}
        on:change={({ detail }) => {
        isInView = detail.inView;
        }}
        >
        {#if isInView}
        <div>
          <HomeTrans3 />
        </div>
        {/if}
      </div>

      <div
        class="wrapper"
        use:inview={{ unobserveOnEnter: true, rootMargin: '-20%' }}
        on:change={({ detail }) => {
        isInView = detail.inView;
        }}
        >
        {#if isInView}
        <div>
          <HomeTrans4 />
        </div>
        {/if}
      </div>
  </section>
  </div>
