<script lang="ts">
  import { goto } from "$app/navigation";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  placemarkService.clearSession();
  goto("/");
</script>
