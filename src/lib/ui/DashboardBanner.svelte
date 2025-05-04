<script lang="ts">
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview
  import { fly } from "svelte/transition";
  import { inview } from "svelte-inview";
  let isInView: boolean = false;
</script>

<div
  class="wrapper mb-5"
  use:inview={{ unobserveOnEnter: true, rootMargin: "20%" }}
  on:change={({ detail }) => {
    isInView = detail.inView;
  }}
>
  {#if isInView}
    <div in:fly={{ x: -200, duration: 1000 }}>
      <div class="has-background-grey box mt-6 pt-6 ml-6 pl-5 mr-6 pr-5 mb-2">
        <div class="card-image">
          <figure class="image 264x264 m-auto">
            <img
              src="https://i.ibb.co/7tNzywHW/side-view-hands-holding-map.jpg"
              alt="Side view hands holding map"
              style="border-radius: 15px;"
            />
          </figure>
          <div class="columns">
            <div class="column">
              <article class="card-content pt-4">
                <p class="card-header title has-text-white">
                  <i class="fas fa-plane mt-1 mr-2" style="color: #ffffff;"></i> PlaceMark<br />
                </p>
                <p class="subtitle title has-text-white has-text-weight-bold">
                  Place your mark on your next journey!
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
