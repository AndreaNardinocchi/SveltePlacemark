<script lang="ts">
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview

  let { placemarkEvent = null, placemarkDeleteEvent = null } = $props();

  import AddPlacemark from "$lib/ui/AddPlacemark.svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import type { Placemark } from "$lib/ui/types/placemark-types";
  import { goto } from "$app/navigation";
  import DOMPurify from "dompurify";

  /**
   * This is to sanitize any inputs where needed
   * https://github.com/cure53/DOMPurify?tab=readme-ov-file#running-dompurify-on-the-server
   */
  function sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input); // Use DOMPurify to clean the input
  }

  // Define reactive variables for the form fields
  let title = $state("");
  let lat = $state("");
  let long = $state("");
  let address = $state("");
  let country = $state("");
  let phone = $state("");
  let website = $state("");
  let visited = $state("");
  let img: string[] = [];
  let description = $state("");
  let message = $state("");

  async function addPlacemark() {
    // Sanitize user input fields before using them
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedLat = sanitizeInput(lat);
    const sanitizedLong = sanitizeInput(long);
    const sanitizedAddress = sanitizeInput(address);
    const sanitizedCountry = sanitizeInput(country);
    const sanitizedPhone = sanitizeInput(phone);
    const sanitizedWebsite = sanitizeInput(website);
    const sanitizedVisited = sanitizeInput(visited);
    const sanitizedDescription = sanitizeInput(description);

    const placemark: Placemark = {
      title: sanitizedTitle,
      lat: sanitizedLat,
      long: sanitizedLong,
      address: sanitizedAddress,
      country: sanitizedCountry,
      phone: sanitizedPhone,
      website: sanitizedWebsite,
      visited: sanitizedVisited,
      img: img.length > 0 ? img : undefined, // Only send `img` if it has values
      description: sanitizedDescription
      // categoryId: ""
    };

    const url = window.location.pathname;
    const categoryId = url.split("/").pop();

    console.log("This is the categoryId: ", categoryId);

    if (!categoryId) {
      console.warn("No category ID found in URL.");
      return;
    }

    const category = await placemarkService.getCategoryById(categoryId);

    if (!category) {
      console.warn("Invalid category returned.");
      return;
    }

    const result = await placemarkService.addPlacemark(categoryId, placemark);

    if (result) {
      if (placemarkEvent) placemarkEvent(placemark);
      // message = `You added ${placemark.title} in ${placemark.title}. Visited? ${placemark.visited}`;
      message = `You added ${sanitizedTitle} in ${sanitizedCountry}. Visited? ${sanitizedVisited}`;
      //  Reset form fields
      // title = "";
      // lat = "";
      // long = "";
      // address = "";
      // country = "";
      // phone = "";
      // website = "";
      // visited = "";
      // description = "";
      //img = [];
      console.log(`Placemark added: ${title}, lat: ${lat}, long: ${long}`);
      console.log("Payload being sent:", placemark);
      await goto(`/category/${categoryId}`);
      // Reset form fields after navigation is completed
      title = "";
      lat = "";
      long = "";
      address = "";
      country = "";
      phone = "";
      website = "";
      visited = "";
      description = "";
    } else {
      console.log("Payload being sent:", placemark);
      console.warn("Failed to add placemark.");
    }

    // if (placemarkEvent) placemarkEvent(placemark);
    // // message = `You added ${placemark.title} in ${placemark.title}. Visited? ${placemark.visited}`;
    // message = `You added ${sanitizedTitle} in ${sanitizedCountry}. Visited? ${sanitizedVisited}`;
  }

  function handleDelete(placemark: Placemark) {
    // Your deletion logic here...

    if (placemarkDeleteEvent) {
      placemarkDeleteEvent(placemark); // Notify parent
    }
  }
</script>

<div class="box">
  <AddPlacemark
    bind:title
    bind:lat
    bind:long
    bind:address
    bind:country
    bind:phone
    bind:website
    bind:visited
    bind:description
  />
  {message}
  <div class="columns">
    <div class="column is-3">
      <button onclick={() => addPlacemark()} class="mt-3 button is-info has-text-white">
        Add your placemark
      </button>
    </div>
    <div class="column is-9">
      <p class="has-text-right mt-2">
        *Find your exact placemarks coordinates on
        <a href="https://www.gps-coordinates.net/" target="_blank" class="has-text-grey"
          >https://www.gps-coordinates.net/</a
        >
        <span class="ml-1 icon is-small">
          <i class="fas fa-solid fa-folder-open"></i>
        </span>
      </p>
    </div>
  </div>
</div>
