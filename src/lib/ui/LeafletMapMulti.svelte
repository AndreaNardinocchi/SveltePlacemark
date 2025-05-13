<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount, afterUpdate } from "svelte";
  import L from "leaflet";
  import icon from "leaflet/dist/images/marker-icon.png";
  import iconShadow from "leaflet/dist/images/marker-shadow.png";

  // These are input values passed to the component
  export let lat: number;
  export let lng: number;
  export let height: number = 40;
  export let popupText: string = "";

  // Reference to the HTML element that will hold the map
  // https://leafletjs.com/reference.html
  let mapContainer: HTMLDivElement;
  let imap: L.Map;
  let marker: L.Marker;

  /** This sets up or re-creates the map. We are defining an initializeMap() function
   * to organize and reuse the logic needed to create or refresh the Leaflet map
   */
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

  // Fixing icon paths to make them work live
  // https://github.com/PaulLeCam/react-leaflet/issues/808
  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  L.Marker.prototype.options.icon = DefaultIcon;
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
