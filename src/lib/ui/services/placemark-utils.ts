import { category, currentDataSets, currentPlacemarks, loggedInUser } from "$lib/runes.svelte";
import type { Placemark } from "../types/placemark-types";
import { placemarkService } from "./placemark-service";
// import { placemarkService } from "./placemark-service";

// export function computeByCountry(placemarkList: Placemark[]) {
//   /**  : Record<string, number> is a typeScript type annotation, which basically means that we are expecting
//    * an object where keys are strings and values are numbers and '={}' initializes it as an empty object.
//    * https://www.typescriptlang.org/docs/handbook/utility-types.html
//    */
//   const countryCounts: Record<string, number> = {};
//   placemarkList.forEach((placemark) => {
//     const country = placemark.country;
//     console.log("This is the country for the chart: ", country);
//     countryCounts[country] = (countryCounts[country] || 0) + 1;
//   });

//   currentDataSets.totalByCountry.labels = Object.keys(countryCounts);
//   currentDataSets.totalByCountry.datasets[0].values = Object.values(countryCounts);
// }

export function computeByCountry(placemarkList: Placemark[]) {
  const countryCounts: Record<string, number> = {};

  if (!placemarkList || placemarkList.length === 0) {
    console.warn("No placemarks available for computing chart.");
    return;
  }

  placemarkList.forEach((placemark) => {
    countryCounts[placemark.country] = (countryCounts[placemark.country] || 0) + 1;
  });

  currentDataSets.totalByCountry = {
    labels: Object.keys(countryCounts),
    datasets: [
      {
        values: Object.values(countryCounts)
      }
    ]
  };

  console.log("Updated totalByCountry:", currentDataSets.totalByCountry);
}

// export function computeByVisited(placemarkList: Placemark[]) {
//   const visitedCounts: Record<string, number> = {};
//   placemarkList.forEach((placemark) => {
//     const visited = placemark.visited;
//     visitedCounts[visited] = (visitedCounts[visited] || 0) + 1;
//   });
//   currentDataSets.totalByVisited.labels = Object.keys(visitedCounts);
//   currentDataSets.totalByVisited.datasets[0].values = Object.values(visitedCounts);
// }

export function computeByVisited(placemarkList: Placemark[]) {
  const visitedCounts: Record<string, number> = {};

  if (!placemarkList || placemarkList.length === 0) {
    console.warn("No placemarks available for computing chart.");
    return;
  }
  placemarkList.forEach((placemark) => {
    visitedCounts[placemark.visited] = (visitedCounts[placemark.visited] || 0) + 1;
  });

  currentDataSets.totalByVisited = {
    labels: Object.keys(visitedCounts),
    datasets: [
      {
        values: Object.values(visitedCounts)
      }
    ]
  };

  console.log("Updated totalByVisited:", currentDataSets.totalByVisited);
}

export async function refreshPlacemarkMap(map: LeafletMap) {
  if (!loggedInUser.token) placemarkService.restoreSession();
  const pathParts = window.location.pathname.split("/");
  const categoryId = pathParts[pathParts.indexOf("category") + 1];
  console.log("This the categoryId in Maps: ", categoryId);

  // Set categoryTitle if not already set
  // localStorage.setItem("categoryTitle", category.title); // Replace dynamically if needed

  // await placemarkService.refreshPlacemarksInfo();

  currentPlacemarks.placemarks.forEach((placemark: Placemark) => {
    if (typeof placemark !== "string") {
      const popup = `${placemark.title}, ${placemark.country}, ${placemark.address} | Visited: ${placemark.visited} | Geo: ${placemark.lat} / ${placemark.long}`;
      map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), popup);
      console.log("These are the coordinates: ", placemark.lat, placemark.long);
    }
  });
  const lastPlacemark = currentPlacemarks.placemarks[currentPlacemarks.placemarks.length - 1];
  if (lastPlacemark) map.moveTo(parseFloat(lastPlacemark.lat), parseFloat(lastPlacemark.long));

  computeByCountry(currentPlacemarks.placemarks);
  computeByVisited(currentPlacemarks.placemarks);
}

// import { currentDataSets, currentPlacemarks } from "$lib/runes.svelte";
// import type { Placemark } from "../types/placemark-types";
// import { placemarkService } from "./placemark-service";

// // Function to compute the chart data by country
// export function computeByCountry(placemarkList: Placemark[]) {
//   const countryCounts: Record<string, number> = {};
//   placemarkList.forEach((placemark) => {
//     const country = placemark.country;
//     console.log("This is the country for the chart: ", country);
//     countryCounts[country] = (countryCounts[country] || 0) + 1;
//   });

//   // Reassign currentDataSets to trigger reactivity
//   currentDataSets.totalByCountry.labels = Object.keys(countryCounts);
//   currentDataSets.totalByCountry.datasets[0].values = Object.values(countryCounts);
// }

// // Function to compute the chart data by visited status
// export function computeByVisited(placemarkList: Placemark[]) {
//   const visitedCounts: Record<string, number> = {};
//   placemarkList.forEach((placemark) => {
//     const visited = placemark.visited;
//     visitedCounts[visited] = (visitedCounts[visited] || 0) + 1;
//   });

//   // Reassign currentDataSets to trigger reactivity
//   currentDataSets.totalByVisited.labels = Object.keys(visitedCounts);
//   currentDataSets.totalByVisited.datasets[0].values = Object.values(visitedCounts);
// }

// // Function to refresh placemark map and trigger chart updates
// export async function refreshPlacemarkMap(map: LeafletMap) {
//   const pathParts = window.location.pathname.split("/");
//   const categoryId = pathParts[pathParts.indexOf("category") + 1];
//   console.log("This is the categoryId in Maps: ", categoryId);
//   const category = await placemarkService.getCategoryById(categoryId);
//   // currentPlacemarks.placemarks = category?.placemarks;

//   // Make sure we have placemarks
//   category?.placemarks.forEach((placemark: Placemark) => {
//     if (typeof placemark !== "string") {
//       const popup = `${placemark.title}, ${placemark.country}, ${placemark.address} | Visited: ${placemark.visited} | ${placemark.lat} ${placemark.long}  `;
//       map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), popup);
//       console.log("These are the coordinates: ", placemark.lat, placemark.long);
//     }
//   });

//   // Get the last placemark and move the map to that location
//   const lastPlacemark = currentPlacemarks.placemarks[currentPlacemarks.placemarks.length - 1];
//   if (lastPlacemark) map.moveTo(parseFloat(lastPlacemark.lat), parseFloat(lastPlacemark.long));

//   // Compute charts after setting placemarks
//   computeByCountry(currentPlacemarks.placemarks);
//   computeByVisited(currentPlacemarks.placemarks);
// }

// import { currentDataSets, currentPlacemarks } from "$lib/runes.svelte";
// import type { Placemark } from "../types/placemark-types";
// import { placemarkService } from "./placemark-service";

// // Function to compute the chart data by country
// export function computeByCountry(placemarkList: Placemark[]) {
//   const countryCounts: Record<string, number> = {};
//   placemarkList.forEach((placemark) => {
//     const country = placemark.country;
//     console.log("This is the country for the chart: ", country);
//     countryCounts[country] = (countryCounts[country] || 0) + 1;
//   });

//   // Reassign currentDataSets to trigger reactivity
//   currentDataSets.totalByCountry.labels = Object.keys(countryCounts);
//   currentDataSets.totalByCountry.datasets[0].values = Object.values(countryCounts);
// }

// // Function to compute the chart data by visited status
// export function computeByVisited(placemarkList: Placemark[]) {
//   const visitedCounts: Record<string, number> = {};
//   placemarkList.forEach((placemark) => {
//     const visited = placemark.visited;
//     visitedCounts[visited] = (visitedCounts[visited] || 0) + 1;
//   });

//   // Reassign currentDataSets to trigger reactivity
//   currentDataSets.totalByVisited.labels = Object.keys(visitedCounts);
//   currentDataSets.totalByVisited.datasets[0].values = Object.values(visitedCounts);
// }

// // Function to refresh placemark map and trigger chart updates
// export async function refreshPlacemarkMap(map: LeafletMap) {
//   const pathParts = window.location.pathname.split("/");
//   const categoryId = pathParts[pathParts.indexOf("category") + 1];
//   console.log("This is the categoryId in Maps: ", categoryId);
//   const category = await placemarkService.getCategoryById(categoryId);

//   // Filter the placemarks by categoryId
//   const filteredPlacemarks = category?.placemarks;

//   // Ensure there are placemarks in the filtered list

//   // Add filtered placemarks to the map
//   filteredPlacemarks.forEach((placemark: Placemark) => {
//     const popup = `${placemark.title}, ${placemark.country}, ${placemark.address} | Visited: ${placemark.visited}`;
//     map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), popup);
//     console.log("These are the coordinates: ", placemark.lat, placemark.long);
//   });

//   // Get the last placemark and move the map to that location
//   const lastPlacemark = filteredPlacemarks[filteredPlacemarks.length - 1];
//   if (lastPlacemark) map.moveTo(parseFloat(lastPlacemark.lat), parseFloat(lastPlacemark.long));

//   // Compute charts after setting placemarks
//   computeByCountry(filteredPlacemarks);
//   computeByVisited(filteredPlacemarks);
// }

// import { currentDataSets, currentPlacemarks } from "$lib/runes.svelte";
// import type { Placemark } from "../types/placemark-types";
// import { placemarkService } from "./placemark-service";

// // Function to compute the chart data by country
// export function computeByCountry(placemarkList: Placemark[]) {
//   const countryCounts: Record<string, number> = {};
//   placemarkList.forEach((placemark) => {
//     const country = placemark.country;
//     console.log("This is the country for the chart: ", country);
//     countryCounts[country] = (countryCounts[country] || 0) + 1;
//   });

//   // Reassign currentDataSets to trigger reactivity
//   currentDataSets.totalByCountry.labels = Object.keys(countryCounts);
//   currentDataSets.totalByCountry.datasets[0].values = Object.values(countryCounts);
// }

// // Function to compute the chart data by visited status
// export function computeByVisited(placemarkList: Placemark[]) {
//   const visitedCounts: Record<string, number> = {};
//   placemarkList.forEach((placemark) => {
//     const visited = placemark.visited;
//     visitedCounts[visited] = (visitedCounts[visited] || 0) + 1;
//   });

//   // Reassign currentDataSets to trigger reactivity
//   currentDataSets.totalByVisited.labels = Object.keys(visitedCounts);
//   currentDataSets.totalByVisited.datasets[0].values = Object.values(visitedCounts);
// }

// // Function to refresh placemark map and trigger chart updates
// export async function refreshPlacemarkMap(map: LeafletMap) {
//   // Extract categoryId from the URL
//   const pathParts = window.location.pathname.split("/");
//   const categoryId = pathParts[pathParts.indexOf("category") + 1];
//   console.log("This is the categoryId in Maps: ", categoryId);

//   // Fetch category data
//   const category = await placemarkService.getCategoryById(categoryId);
//   if (!category) {
//     console.log("Category not found.");
//     return; // Stop if no category is found
//   }

//   // Filter placemarks based on the categoryId
//   const filteredPlacemarks = category.placemarks.filter((placemark: Placemark) => {
//     return placemark.categoryId === categoryId; // Assuming placemarks have categoryId
//   });

//   // Make sure we have filtered placemarks
//   if (filteredPlacemarks.length === 0) {
//     console.log("No placemarks for this category.");
//     return; // Stop if no placemarks for the category
//   }

//   // Add filtered placemarks to the map
//   filteredPlacemarks.forEach((placemark: Placemark) => {
//     const popup = `${placemark.title}, ${placemark.country}, ${placemark.address} | Visited: ${placemark.visited} | ${placemark.lat} ${placemark.long}`;
//     map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), popup);
//     console.log("These are the coordinates: ", placemark.lat, placemark.long);
//   });

//   // Get the last placemark and move the map to that location
//   const lastPlacemark = filteredPlacemarks[filteredPlacemarks.length - 1];
//   if (lastPlacemark) {
//     map.moveTo(parseFloat(lastPlacemark.lat), parseFloat(lastPlacemark.long));
//   }

//   // Update the state with the filtered placemarks
//   currentPlacemarks.placemarks = filteredPlacemarks;

//   // Compute charts based on filtered placemarks
//   computeByCountry(filteredPlacemarks);
//   computeByVisited(filteredPlacemarks);

//   // Explicitly trigger reactivity (ensure that Svelte updates the chart)
//   currentDataSets.totalByCountry = { ...currentDataSets.totalByCountry };
//   currentDataSets.totalByVisited = { ...currentDataSets.totalByVisited };
// }
