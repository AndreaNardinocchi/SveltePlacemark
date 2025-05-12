<script lang="ts">
  // https://www.npmjs.com/package/svelte-fa
  import Lifestyle from "./Lifestyle.svelte";

  // Browser title
  let pageTitle = "About Lifestyle | PlaceMark"; // This can be dynamic
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="container">
  <Lifestyle />
</div>
