<!-- <script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap } from "leaflet";
  let { height = 40 } = $props();
  let id = "home-map-id";
  let location = { lat: 53.2734, lng: -7.7783203 };
  let zoom = 8;
  let minZoom = 2;
  let activeLayer = "Terrain";

  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;
  let L: any;

  onMount(async () => {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    baseLayers = {
      Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
      Satellite: leaflet.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }
      )
    };
    let defaultLayer = baseLayers[activeLayer];
    imap = leaflet.map(id, {
      center: [location.lat, location.lng],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer]
    });
    control = leaflet.control.layers(baseLayers, overlays).addTo(imap);
  });

  export async function addMarker(lat: number, lng: number, popupText: string) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    const marker = L.marker([lat, lng]).addTo(imap);
    const popup = L.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    marker.bindPopup(popup);
  }

  export async function moveTo(lat: number, lng: number) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    imap.flyTo({ lat: lat, lng: lng });
  }
</script>

<div class="mt-6"></div>
<div class="mt-6"></div>
<div {id} class="box mt-6" style="height: {height}vh"></div> -->

<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap } from "leaflet";

  let { height = 40 } = $props();
  let id = "home-map-id";
  let location = { lat: 53.2734, lng: -7.7783203 };
  let zoom = 8;
  let minZoom = 2;
  let activeLayer = "Terrain";

  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;
  let L: any;

  // Store all added markers
  let markers: any[] = [];

  onMount(async () => {
    const leaflet = await import("leaflet");
    L = leaflet.default;

    baseLayers = {
      Terrain: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
      Satellite: L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }
      )
    };

    let defaultLayer = baseLayers[activeLayer];

    imap = L.map(id, {
      center: [location.lat, location.lng],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer]
    });

    control = L.control.layers(baseLayers, overlays).addTo(imap);
  });

  // Add a marker to the map
  export async function addMarker(lat: number, lng: number, popupText: string) {
    const leaflet = await import("leaflet");
    L = leaflet.default;

    const marker = L.marker([lat, lng]).addTo(imap);
    const popup = L.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    marker.bindPopup(popup);

    markers.push(marker); // Store the marker for future reference
  }

  // Remove a marker from the map by coordinates
  export function removeMarker(lat: number, lng: number) {
    const tolerance = 0.00001;

    for (let i = 0; i < markers.length; i++) {
      const markerLatLng = markers[i].getLatLng();
      if (
        Math.abs(markerLatLng.lat - lat) < tolerance &&
        Math.abs(markerLatLng.lng - lng) < tolerance
      ) {
        imap.removeLayer(markers[i]);
        markers.splice(i, 1);
        break;
      }
    }
  }

  // Move the map center to given coordinates
  export async function moveTo(lat: number, lng: number) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    imap.flyTo({ lat: lat, lng: lng });
  }
</script>

<div class="mt-6"></div>
<div class="mt-6"></div>
<div {id} class="box mt-6" style="height: {height}vh"></div>
