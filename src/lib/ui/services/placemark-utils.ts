/** The 'get' function is used to access the current value of the 'writable' store directly,
 * as it was used in 'rune.svelte.ts' to make the  'currentDataSets' reactive.
 * https://stackoverflow.com/questions/59126405/is-it-possible-to-access-svelte-store-from-external-js-files
 * */
import { get } from "svelte/store";
import { loggedInUser } from "$lib/runes.svelte";
import { currentDataSets } from "$lib/runes.svelte"; // Moved store here
import { placemarkService } from "./placemark-service";
import LeafletMap from "../LeafletMap.svelte";
import type { Placemark } from "../types/placemark-types";

// Function to compute placemark counts by country
export function computeByCountry(placemarkList: Placemark[]) {
  const countryCounts: Record<string, number> = {};
  console.log("This is the PLACEMARKLIST: ", placemarkList);

  if (!placemarkList || placemarkList.length === 0) {
    console.warn("No placemarks available for computing chart.");
    return;
  }

  // Counting how many placemarks are in each country
  placemarkList.forEach((placemark) => {
    const country = placemark.country || "Unknown";
    countryCounts[country] = (countryCounts[country] || 0) + 1; // Increase count for each placemark country
  });

  // Updating the currentDataSets store with new country data for the chart
  const current = get(currentDataSets);
  // Setting the value of 'currentDataSets' store by updating it with new data.
  currentDataSets.set({
    // Spreading the current data from 'current' into the new object.
    ...current,
    totalByCountry: {
      /**
       * Object.keys(countryCounts) retrieves an array of keys from the countryCounts object,
       * which represent the country names. These keys will be used as labels on our chart.
       * https://www.w3schools.com/jsref/jsref_object_keys.asp
       * */
      labels: Object.keys(countryCounts),
      // Object.values(countryCounts) retrieves an array of values
      // https://www.w3schools.com/jsref/jsref_object_values.asp
      datasets: [{ values: Object.values(countryCounts) }]
    }
  });

  console.log("Updated totalByCountry:", {
    labels: Object.keys(countryCounts),
    values: Object.values(countryCounts)
  });
}

// Function to compute placemark counts by visited status
export function computeByVisited(placemarkList: Placemark[]) {
  const visitedCounts: Record<string, number> = {};

  if (!placemarkList || placemarkList.length === 0) {
    console.warn("No placemarks available for computing chart.");
    return;
  }

  // Counting how many placemarks are visited or not
  placemarkList.forEach((placemark) => {
    // If placemark.visited is null or undefined, the value of visited will be set to "Unknown"
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
    const visited = placemark.visited?.toString() ?? "Unknown";
    visitedCounts[visited] = (visitedCounts[visited] || 0) + 1; // Increase count for each visited status
  });
  // Updating the currentDataSets store with new visited data for the chart
  const current = get(currentDataSets);
  // Setting the value of 'currentDataSets' store by updating it with new data.
  currentDataSets.set({
    // Spreading the current data from 'current' into the new object.
    ...current,
    totalByVisited: {
      /**
       * Object.keys(VisitedCounts) retrieves an array of keys from the visitedCounts object,
       * which represent the visited placemarks. These keys will be used as labels on our chart.
       * https://www.w3schools.com/jsref/jsref_object_keys.asp
       * */
      labels: Object.keys(visitedCounts),
      // Object.values(visitedCounts) retrieves an array of values
      // https://www.w3schools.com/jsref/jsref_object_values.asp
      datasets: [{ values: Object.values(visitedCounts) }]
    }
  });

  console.log("Updated totalByVisited:", {
    labels: Object.keys(visitedCounts),
    values: Object.values(visitedCounts)
  });
}

// Function to refresh the map with placemarks
export async function refreshPlacemarkMap(map: LeafletMap, placemarkList: Placemark[]) {
  if (!loggedInUser.token) {
    placemarkService.restoreSession();
  }

  // Add each placemark to the map with a popup showing its details
  placemarkList.forEach((placemark) => {
    // Skip invalid placemarks https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
    if (typeof placemark !== "string") {
      const popup = `${placemark.title}, ${placemark.country}, ${placemark.address} | Visited: ${placemark.visited} | Geo: ${placemark.lat} / ${placemark.long}`;
      map.addMarker(parseFloat(placemark.lat), parseFloat(placemark.long), popup);
    }
  });

  // Moving the map to the last placemark's coordinates
  const lastPlacemark = placemarkList[placemarkList.length - 1];
  if (lastPlacemark) {
    map.moveTo(parseFloat(lastPlacemark.lat), parseFloat(lastPlacemark.long));
  }
  // Recomputing the charts with the updated placemark data
  computeByCountry(placemarkList);
  computeByVisited(placemarkList);
}
