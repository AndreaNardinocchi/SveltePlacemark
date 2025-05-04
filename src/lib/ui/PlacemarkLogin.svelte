<script lang="ts">
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  import Fa from "svelte-fa";
  import { faPlane } from "@fortawesome/free-solid-svg-icons";
  import { fly } from "svelte/transition";
  import { inview } from "svelte-inview";

  let isInView: boolean = false;
</script>

<!-- Image Section with Plane Icon -->
<div
  class="wrapper"
  use:inview={{ unobserveOnEnter: true, rootMargin: "-20%" }}
  on:change={({ detail }) => {
    isInView = detail.inView;
  }}
>
  {#if isInView}
    <div in:fly={{ x: -200, duration: 1000 }}>
      <section class="image has-text-centered">
        <Fa style="font-size: 160px; color: #000000;" icon={faPlane} />
      </section>
      <p class="title is-size-1 mt-3 pl-4">PlaceMark</p>
      <p class="subtitle has-text-weight-bold pl-4">Place your mark on your next journey!</p>
    </div>
  {/if}
</div>
