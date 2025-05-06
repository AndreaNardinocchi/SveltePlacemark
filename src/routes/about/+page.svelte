<script lang="ts">
  // https://www.npmjs.com/package/svelte-fa
  import About from "./About.svelte";
  let pageTitle: any = "About PlaceMark | PlaceMark";
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="container">
  <About />
</div>
