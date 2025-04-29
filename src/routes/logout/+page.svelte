<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
    import { placemarkService } from "$lib/ui/services/placemark-service";

  // loggedInUser.email = "";
  // loggedInUser.name = "";
  // loggedInUser.token = "";
  // loggedInUser._id = "";
  placemarkService.clearSession();
  goto("/");
</script>
