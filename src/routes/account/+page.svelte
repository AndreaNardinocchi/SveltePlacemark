<script context="module">
  // https://www.npmjs.com/package/svelte-fa
  import Account from "./Account.svelte";
  // import { placemarkService } from "$lib/ui/services/placemark-service";
  // import type { User } from "$lib/ui/types/placemark-types";
  // import { loggedInUser } from "$lib/runes.svelte";
  // import { onMount } from "svelte";

  // let users: User[] = [];

  // let { firstName = "John", lastName = "Doe", country = "United States" } = $props();

  // onMount(async () => {
  //   users = await placemarkService.getUser(loggedInUser.token);
  // });

  // @ts-ignore
  export const load = async ({ page }) => ({
    props: {
      key: page.path
    }
  });

  /**
   * @type {any}
   */
  export let key;
</script>

<!-- <Header /> -->
<div class="container">
  <Account />
</div>
<!-- <Footer /> -->
