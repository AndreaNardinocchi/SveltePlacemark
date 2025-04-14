<script lang="ts">
  import HomepageTextCard from "./HomepageTextCard.svelte";
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview
  import { fly } from "svelte/transition";
  import { inview } from "svelte-inview";
  let isInView: boolean = false;
</script>

<div
  class="wrapper"
  use:inview={{ unobserveOnEnter: true, rootMargin: "-5%" }}
  on:change={({ detail }) => {
    isInView = detail.inView;
  }}
>
  {#if isInView}
    <div in:fly={{ y: -200, duration: 1000 }}>
      <div class="mt-6 pt-6 has-text-centered">
        <h2 class="subtitle is-size-4">Have a....</h2>
        <figure class="image is-264x264 m-auto">
          <img src="https://i.ibb.co/TBx4BWR3/collage.jpg" alt="collage" />
        </figure>
        <HomepageTextCard text={"...wonderful journey!"} />
      </div>
    </div>
  {/if}
</div>
