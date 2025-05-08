import type { Category, Placemark } from "./ui/types/placemark-types";
import { writable } from "svelte/store";

export const subTitle = $state({ text: "" });
export const loggedInUser = $state({
  email: "",
  name: "",
  token: "",
  _id: ""
});

export const user = $state({
  firstName: "",
  lastName: "",
  userLat: "",
  userLong: "",
  country: "",
  street: "",
  addressCode: "",
  DOB: "",
  phoneNumber: "",
  email: "",
  password: "",
  _id: ""
});

export const category = $state({
  title: "",
  notes: "",
  userId: "",
  image: "",
  // img: "",
  _id: ""
});

export const placemark = $state({
  title: "",
  lat: "",
  long: "",
  address: "",
  country: "",
  phone: "",
  website: "",
  visited: "",
  description: "",
  img: "",
  _id: ""
});

export const currentDataSets = writable({
  totalByCountry: { labels: ["country"], datasets: [{ values: [0] }] },
  totalByVisited: { labels: ["Visited", "Not Visited"], datasets: [{ values: [0, 0] }] }
});

// export const currentDataSets = {
//   totalByCountry: {
//     labels: ["country"],
//     datasets: [
//       {
//         values: [0]
//       }
//     ]
//   },

//   totalByVisited: {
//     labels: ["Visited", "Not Visited"],
//     datasets: [
//       {
//         values: [0, 0]
//       }
//     ]
//   }
// };

export const currentCategories = $state({ categories: [] as Category[] });
export const currentPlacemarks = $state({ placemarks: [] as Placemark[] });
