<script lang="ts">
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview
  import { fly } from 'svelte/transition';
  import { inview } from 'svelte-inview';
  import PlacemarkLogin from '../../lib/ui/PlacemarkLogin.svelte';
  import UserCredentials from '../../lib/ui/UserCredentials.svelte';
  
  let isInView: boolean = false;  
</script>
<section class="hero is-small is-dark mt-6 px-6">
  <div class="hero-body mt-6">
    <p class="title has-text-white">Log in</p>
  </div>
</section>
<section class="section">
  <section class="columns">
    <!-- svelte-ignore event_directive_deprecated -->
    <section class="column is-6 pt-5 pr-5 pb-6">
      <div
      class="wrapper"
      use:inview={{ unobserveOnEnter: true, rootMargin: '-20%' }}
      on:change={({ detail }) => {
      isInView = detail.inView;
      }}
      >
      {#if isInView}
      <div in:fly={{ x: 200, duration: 1000 }}>
      <UserCredentials />
      </div>
      {/if}
      </div>
    </section>
    <section class="column is-6 px-4">
      <div
      class="wrapper"
      use:inview={{ unobserveOnEnter: true, rootMargin: '-20%' }}
      on:change={({ detail }) => {
      isInView = detail.inView;
      }}
      >
      {#if isInView}
      <div in:fly={{ x: -200, duration: 1000 }}>
      <PlacemarkLogin />
      </div>
      {/if}
      </div>
    </section>
  </section>
</section>