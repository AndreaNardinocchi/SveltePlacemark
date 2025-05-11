<script lang="ts">
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview
  import { inview } from "svelte-inview";
  import HomeTrans1 from "./HomeTrans1.svelte";
  import HomeTrans2 from "./HomeTrans2.svelte";
  import HomeTrans3 from "./HomeTrans3.svelte";
  import HomeTrans4 from "./HomeTrans4.svelte";

  // In-view flags for each component
  let inView1 = false;
  let inView2 = false;
  let inView3 = false;
  let inView4 = false;
</script>

<section class="hero is-fullheight is-default is-bold">
  <div class="hero-head"></div>
  <div class="hero-body">
    <div class="container has-text-centered">
      <!-- Section 1 -->
      <div
        class="wrapper mb-5"
        use:inview={{ unobserveOnEnter: true, rootMargin: "-20%" }}
        on:change={({ detail }) => (inView1 = detail.inView)}
      >
        {#if inView1}
          <HomeTrans1 />
        {/if}
      </div>
      <!-- Section 2 -->
      <div
        class="wrapper mb-5"
        use:inview={{ unobserveOnEnter: true, rootMargin: "-20%" }}
        on:change={({ detail }) => (inView2 = detail.inView)}
      >
        {#if inView2}
          <HomeTrans2 />
        {/if}
      </div>
      <!-- Section 3 -->
      <div
        class="wrapper mb-5"
        use:inview={{ unobserveOnEnter: true, rootMargin: "-20%" }}
        on:change={({ detail }) => (inView3 = detail.inView)}
      >
        {#if inView3}
          <HomeTrans3 />
        {/if}
      </div>
      <!-- Section 4 -->
      <div
        class="wrapper mb-5"
        use:inview={{ unobserveOnEnter: true, rootMargin: "-20%" }}
        on:change={({ detail }) => (inView4 = detail.inView)}
      >
        {#if inView4}
          <HomeTrans4 />
        {/if}
      </div>
    </div>
  </div>
</section>
