// import { currentDataSets, currentPlacemarks, loggedInUser } from "$lib/runes.svelte";

// // import { map } from "leaflet";
// // import type { Placemark } from "../types/placemark-types";
// import { placemarkService } from "./placemark-service";

// const placemarkList = currentPlacemarks.placemarks;

// //export function computeByCountry(placemarkList: Placemark[]) {
// export function computeByCountry(placemarkList: any[]) {
//   // placemarkService.refreshPlacemarksInfo();
//   const countryCounts: Record<string, number> = {};
//   console.log("This is the PLACEMARKLIST: ", placemarkList);

//   if (!placemarkList || placemarkList.length === 0) {
//     console.warn("No placemarks available for computing chart.");
//     return;
//   }

//   // this.refreshPlacemarkMap(map);
//   // placemarkService.refreshPlacemarksInfo();

//   placemarkList.forEach((placemark) => {
//     countryCounts[placemark.country] = (countryCounts[placemark.country] || 0) + 1;
//   });

//   currentDataSets.totalByCountry = {
//     labels: Object.keys(countryCounts),
//     datasets: [
//       {
//         values: Object.values(countryCounts)
//       }
//     ]
//   };

//   console.log("Updated totalByCountry:", currentDataSets.totalByCountry, countryCounts);
// }

// // export function computeByVisited(placemarkList: Placemark[]) {
// export function computeByVisited(placemarkList: any[]) {
//   const visitedCounts: Record<string, number> = {};

//   if (!placemarkList || placemarkList.length === 0) {
//     console.warn("No placemarks available for computing chart.");
//     return;
//   }
//   placemarkList.forEach((placemark) => {
//     visitedCounts[placemark.visited] = (visitedCounts[placemark.visited] || 0) + 1;
//   });

//   currentDataSets.totalByVisited = {
//     labels: Object.keys(visitedCounts),
//     datasets: [
//       {
//         values: Object.values(visitedCounts)
//       }
//     ]
//   };

//   console.log("Updated totalByVisited:", currentDataSets.totalByVisited, visitedCounts);
// }

// export async function refreshPlacemarkMap(map: LeafletMap) {
//   if (!loggedInUser.token) {
//     placemarkService.restoreSession();
//   }
//   //  const pathParts = window.location.pathname.split("/");
//   // const categoryId = pathParts[pathParts.indexOf("category") + 1];
//   // placemarkService.refreshPlacemarksInfo();
//   // console.log("This the categoryId in Maps: ", categoryId);

//   // currentPlacemarks.placemarks.forEach((placemark: Placemark) => {
//   placemarkList.forEach((placemark) => {
//     console.log("This is the placemark in MAP: ", placemark);
//     if (typeof placemark !== "string") {
//       const popup = `${placemark.title}, ${placemark.country}, ${placemark.address} | Visited: ${placemark.visited} | Geo: ${placemark.lat} / ${placemark.long}`;
//       map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), popup);
//       console.log("These are the coordinates: ", placemark.lat, placemark.long);
//     }
//   });
//   const lastPlacemark = currentPlacemarks.placemarks[currentPlacemarks.placemarks.length - 1];
//   if (lastPlacemark) map.moveTo(parseFloat(lastPlacemark.lat), parseFloat(lastPlacemark.long));

//   computeByCountry(currentPlacemarks.placemarks);
//   console.log("Current placemarks in teh CHART: ", currentPlacemarks.placemarks);
//   computeByVisited(currentPlacemarks.placemarks);
// }

// Import Svelte's `get` function to extract current values from writable stores
import { get } from "svelte/store";
import { loggedInUser, user } from "$lib/runes.svelte";
import { currentDataSets } from "$lib/runes.svelte"; // Moved store here
import { placemarkService } from "./placemark-service";
import LeafletMap from "../LeafletMap.svelte";
import type { Placemark } from "../types/placemark-types";

// Reactive placemark list (as before)
// const placemarkList = currentPlacemarks.placemarks;

// Compute counts by country and update the reactive store
// export function computeByCountry(placemarkList: any[]) {
export function computeByCountry(placemarkList: Placemark[]) {
  const countryCounts: Record<string, number> = {};
  console.log("This is the PLACEMARKLIST: ", placemarkList);

  if (!placemarkList || placemarkList.length === 0) {
    console.warn("No placemarks available for computing chart.");
    return;
  }

  placemarkList.forEach((placemark) => {
    const country = placemark.country || "Unknown";
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });

  const current = get(currentDataSets);
  currentDataSets.set({
    ...current,
    totalByCountry: {
      labels: Object.keys(countryCounts),
      datasets: [{ values: Object.values(countryCounts) }]
    }
  });

  console.log("Updated totalByCountry:", {
    labels: Object.keys(countryCounts),
    values: Object.values(countryCounts)
  });
}

// Compute visited/not visited stats and update the reactive store
// export function computeByVisited(placemarkList: any[]) {
export function computeByVisited(placemarkList: Placemark[]) {
  const visitedCounts: Record<string, number> = {};

  if (!placemarkList || placemarkList.length === 0) {
    console.warn("No placemarks available for computing chart.");
    return;
  }

  placemarkList.forEach((placemark) => {
    const visited = placemark.visited?.toString() ?? "Unknown";
    visitedCounts[visited] = (visitedCounts[visited] || 0) + 1;
  });

  const current = get(currentDataSets);
  currentDataSets.set({
    ...current,
    totalByVisited: {
      labels: Object.keys(visitedCounts),
      datasets: [{ values: Object.values(visitedCounts) }]
    }
  });

  console.log("Updated totalByVisited:", {
    labels: Object.keys(visitedCounts),
    values: Object.values(visitedCounts)
  });
}

// export async function refreshPlacemarkMap(map: LeafletMap, placemarkList: any[]) {
export async function refreshPlacemarkMap(map: LeafletMap, placemarkList: Placemark[]) {
  if (!loggedInUser.token) {
    placemarkService.restoreSession();
  }

  placemarkList.forEach((placemark) => {
    if (typeof placemark !== "string") {
      const popup = `${placemark.title}, ${placemark.country}, ${placemark.address} | Visited: ${placemark.visited} | Geo: ${placemark.lat} / ${placemark.long}`;
      map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), popup);
    }
  });

  const lastPlacemark = placemarkList[placemarkList.length - 1];
  if (lastPlacemark) {
    map.moveTo(parseFloat(lastPlacemark.lat), parseFloat(lastPlacemark.long));
  }

  computeByCountry(placemarkList);
  computeByVisited(placemarkList);
}
