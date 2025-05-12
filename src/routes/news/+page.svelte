<script lang="ts">
  import News from "./News.svelte";

  // Browser title
  let pageTitle = "News worldwide | PlaceMark";
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="container">
  <News />
</div>
