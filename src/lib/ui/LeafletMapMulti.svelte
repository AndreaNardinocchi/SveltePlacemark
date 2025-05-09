<!-- <script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import L from "leaflet";

  export let lat: number;
  export let lng: number;
  export let height: number = 40;
  export let popupText: string = "";

  let mapContainer: HTMLDivElement;
  let imap: L.Map;

  onMount(() => {
    imap = L.map(mapContainer).setView([lat, lng], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 17,
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(imap);

    const marker = L.marker([lat, lng]).addTo(imap);
    if (popupText) marker.bindPopup(popupText).openPopup();
  });
</script>

<div bind:this={mapContainer} class="map-container" style="height: {height}vh;"></div>

<style>
  .map-container {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-top: 1rem;
  }
</style> -->

<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount, afterUpdate } from "svelte";
  import L from "leaflet";

  export let lat: number;
  export let lng: number;
  export let height: number = 40;
  export let popupText: string = "";

  // Reference to the HTML element that will hold the map
  // https://leafletjs.com/reference.html
  let mapContainer: HTMLDivElement;
  let imap: L.Map;
  let marker: L.Marker;

  function initializeMap() {
    if (imap) {
      imap.remove(); // Clean up the existing map to avoid duplicates
    }

    imap = L.map(mapContainer).setView([lat, lng], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 17,
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(imap);

    // Place a marker at the given coordinates
    marker = L.marker([lat, lng]).addTo(imap);
    // If popup text is provided, bind it and open it
    if (popupText) marker.bindPopup(popupText).openPopup();
  }

  // It is called when the component is first mounted
  onMount(() => {
    initializeMap();
  });

  // Called whenever we change category
  // https://svelte.dev/docs/svelte/svelte#afterUpdate
  afterUpdate(() => {
    initializeMap(); // Reinitialize map when props change
  });
</script>

<div bind:this={mapContainer} class="map-container" style="height: {height}vh;"></div>

<style>
  .map-container {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-top: 1rem;
  }
</style>
