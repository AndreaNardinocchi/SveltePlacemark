// import { currentDataSets } from "$lib/runes.svelte";
// import type { Placemark } from "../types/placemark-types";

// export function computeByCountry(placemarkList: Placemark[]) {
//   placemarkList.forEach((placemark) => {
//     if (placemark.country == "United States of America") {
//       currentDataSets.totalByCountry.datasets[0].values[0] += placemark.country;
//     } else if (placemark.country !== "United States of America") {
//       currentDataSets.totalByCountry.datasets[0].values[1] += placemark.country;
//     }
//   });
// }

// export function computeByVisited(placemarkList: Placemark[]) {
//   placemarkList.forEach((placemark) => {
//     if (placemark.country == "United States of America") {
//       currentDataSets.totalByCountry.datasets[0].values[0] += placemark.country;
//     } else if (placemark.country !== "United States of America") {
//       currentDataSets.totalByCountry.datasets[0].values[1] += placemark.country;
//     }
//   });
// }

import { currentDataSets } from "$lib/runes.svelte";
import type { Placemark } from "../types/placemark-types";

export function computeByCountry(placemarkList: Placemark[]) {
  /**  : Record<string, number> is a typeScript type annotation, which basically means that we are expecting
   * an object where keys are strings and values are numbers and '={}' initializes it as an empty object.
   * https://www.typescriptlang.org/docs/handbook/utility-types.html
   */
  const countryCounts: Record<string, number> = {};
  placemarkList.forEach((placemark) => {
    const country = placemark.country;
    console.log("This is the country for the chart: ", country);
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });

  currentDataSets.totalByCountry.labels = Object.keys(countryCounts);
  currentDataSets.totalByCountry.datasets[0].values = Object.values(countryCounts);
}

export function computeByVisited(placemarkList: Placemark[]) {
  const visitedCounts: Record<string, number> = {};
  placemarkList.forEach((placemark) => {
    const visited = placemark.visited;
    visitedCounts[visited] = (visitedCounts[visited] || 0) + 1;
  });
  currentDataSets.totalByVisited.labels = Object.keys(visitedCounts);
  currentDataSets.totalByVisited.datasets[0].values = Object.values(visitedCounts);
}

// import { currentDataSets } from "$lib/runes.svelte";
// import type { Placemark } from "../types/placemark-types";

// export function computeByCountry(placemarkList: Placemark[]) {
//   const countryCounts: Record<string, number> = {};

//   placemarkList.forEach((placemark) => {
//     const country = placemark.country;
//     countryCounts[country] = (countryCounts[country] || 0) + 1;
//   });

//   // ✅ Replace the entire object to trigger Svelte reactivity
//   currentDataSets.totalByCountry = {
//     labels: Object.keys(countryCounts),
//     datasets: [{ values: Object.values(countryCounts) }]
//   };
// }

// export function computeByVisited(placemarkList: Placemark[]) {
//   const visitedCounts: Record<string, number> = {};

//   placemarkList.forEach((placemark) => {
//     const visited = placemark.visited ? "Visited" : "Not Visited";
//     visitedCounts[visited] = (visitedCounts[visited] || 0) + 1;
//   });

//   // ✅ Replace the entire object to trigger Svelte reactivity
//   currentDataSets.totalByVisited = {
//     labels: Object.keys(visitedCounts),
//     datasets: [{ values: Object.values(visitedCounts) }]
//   };
// }
