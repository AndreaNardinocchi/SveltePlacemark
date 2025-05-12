<script lang="ts">
  import { goto } from "$app/navigation";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  placemarkService.clearSession();
  goto("/");

  // Browser title
  let pageTitle = "Welcome to PlaceMark"; // This can be dynamic
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>
