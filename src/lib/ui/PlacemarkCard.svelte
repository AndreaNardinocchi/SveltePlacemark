<script lang="ts">
  // https://medium.com/@ravipatel.it/a-comprehensive-guide-to-fetching-weather-data-using-javascript-fetch-api-13133d0bc2e6
  // @ts-nocheck
  // import { preprocess } from "svelte/compiler";

  // let {
  //   titleShort = "Miami",
  //   country = "United States",
  //   description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //   website = "https://www.marriott.com",
  //   youShouldVisit = "What are you waiting for? Time to pay a visit to ",
  //   travelMeans = "plane",
  //   distance = "4.000 km away"
  // } = $props();

  // import { placemarkService } from "$lib/ui/services/placemark-service";
  // import type { Category, Placemark } from "$lib/ui/types/placemark-types";
  // import { onMount } from "svelte";
  // import { loggedInUser } from "$lib/runes.svelte";
  // import { goto } from "$app/navigation";

  // let user: User;

  // const token = loggedInUser.token;
  // const email = loggedInUser.email;
  // const loggedInUserId = loggedInUser._id;

  // let categoryId = "";
  // let placemarkId = "";
  // let travelMeans = "";
  // let destination = "";

  // let category: Category | null = null;

  // let placemark: Placemark = {
  //   title: "",
  //   lat: "",
  //   long: "",
  //   address: "",
  //   country: "",
  //   phone: "",
  //   website: "",
  //   visited: "",
  //   description: ""
  // };

  // onMount(async () => {
  //   try {
  //     const pathParts = window.location.pathname.split("/");
  //     console.log("Path parts:", pathParts);
  //     categoryId = pathParts[pathParts.indexOf("category") + 1];
  //     placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
  //     const token = loggedInUser.token;

  //     if (categoryId && token) {
  //       // Fetch full category
  //       const categoryResponse = await placemarkService.getCategoryById(categoryId);
  //       console.log("Fetched category: ", categoryResponse);

  //       // Fetch placemark by its ID
  //       const placemarkResponse = await placemarkService.getPlacemarkById(categoryId, placemarkId);
  //       console.log("Fetched placemark:", placemarkResponse);

  //       // Update the placemark state
  //       placemark = placemarkResponse; // Ensure placemark is updated

  //       // Set the destination and travel means
  //       if (placemark) {
  //         destination = placemark.country.toLowerCase().trim();
  //         console.log("Fetched destination: ", destination);

  //         if (token && email) {
  //           try {
  //             const users = await placemarkService.getAllUsers(token);
  //             const matchedUser = users.find((user) => user.email === email);
  //             if (matchedUser) {
  //               user = matchedUser;
  //               console.log("Matched user:", user);
  //               // Assuming userDetails.country contains the logged-in user's country
  //               let userCountry = matchedUser.country.toLowerCase().trim();
  //               console.log("userCountry:", userCountry);
  //             } else {
  //               console.log("No user found matching email.");
  //             }
  //           } catch (error) {
  //             console.error("Failed to fetch or filter user:", error);
  //           }
  //         } else {
  //           console.error("Missing token or email.");
  //         }

  //         if (destination === userCountry) {
  //           console.log("userCountry:", userCountry);
  //           travelMeans = "car, bus, or train";
  //         } else {
  //           travelMeans = "plane";
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // });

  // import { placemarkService } from "$lib/ui/services/placemark-service";
  // import type { Category, Placemark, User } from "$lib/ui/types/placemark-types";
  // import { onMount } from "svelte";
  // import { loggedInUser } from "$lib/runes.svelte";
  // import { goto } from "$app/navigation";

  // let user: User;
  // let categoryId = "";
  // let placemarkId = "";
  // let travelMeans = "";
  // let destination = "";
  // let distance = "";

  // let category: Category | null = null;

  // let placemark: Placemark = {
  //   title: "",
  //   lat: "",
  //   long: "",
  //   address: "",
  //   country: "",
  //   phone: "",
  //   website: "",
  //   visited: "",
  //   description: ""
  // };

  // const token = loggedInUser.token;
  // const email = loggedInUser.email;

  // onMount(async () => {
  //   try {
  //     const pathParts = window.location.pathname.split("/");
  //     console.log("Path parts:", pathParts);
  //     categoryId = pathParts[pathParts.indexOf("category") + 1];
  //     placemarkId = pathParts[pathParts.indexOf("placemark") + 1];

  //     if (categoryId && token) {
  //       // Fetch full category
  //       const categoryResponse = await placemarkService.getCategoryById(categoryId);
  //       console.log("Fetched category: ", categoryResponse);

  //       // Fetch placemark by its ID
  //       const placemarkResponse = await placemarkService.getPlacemarkById(categoryId, placemarkId);
  //       console.log("Fetched placemark:", placemarkResponse);

  //       // Update the placemark state
  //       placemark = placemarkResponse; // Ensure placemark is updated

  //       // Set the destination (country of the placemark)
  //       destination = placemark.country.toLowerCase().trim();
  //       console.log("Fetched destination: ", destination);

  //       if (email && token) {
  //         // Fetch user data
  //         const users = await placemarkService.getAllUsers(token);
  //         const matchedUser = users.find((user) => user.email === email);

  //         if (matchedUser) {
  //           user = matchedUser; // Assign the matched user to the `user` variable
  //           console.log("Matched user:", user);

  //           // Get userCountry from matched user
  //           let userCountry = matchedUser.country.toLowerCase().trim();
  //           console.log("userCountry:", userCountry);

  //           // Determine travel means after both destination and userCountry are available
  //           if (destination === userCountry) {
  //             travelMeans = "car, bus, or train";
  //           } else {
  //             travelMeans = "plane";
  //           }
  //           console.log("Travel means:", travelMeans);
  //         } else {
  //           console.log("No user found matching email.");
  //         }
  //       } else {
  //         console.error("Missing token or email.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // });

  // async function calculateDistance() {
  //   const email = loggedInUser.email; // Get the logged-in user's email
  //   const token = loggedInUser.token; // Get the logged-in user's token
  //   const pathParts = window.location.pathname.split("/");
  //   console.log("Path parts:", pathParts);
  //   categoryId = pathParts[pathParts.indexOf("category") + 1];
  //   placemarkId = pathParts[pathParts.indexOf("placemark") + 1];

  //   if (email && token) {
  //     try {
  //       // Fetch user data using email and token
  //       const users = await placemarkService.getAllUsers(token);
  //       const matchedUser = users.find((user) => user.email === email);

  //       if (matchedUser) {
  //         const userDetails = matchedUser; // Assign the matched user to the `userDetails` variable

  //         console.log("Matched user in calculation:", userDetails);

  //         const lat1 = userDetails.userLat;
  //         const long1 = userDetails.userLong;

  //         // If user details are not available, return early
  //         if (!lat1 || !long1) {
  //           console.error("User location data is missing.");
  //           return;
  //         }

  //         const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  //         const R = 6371; // Radius of the Earth in kilometers

  //         const category = await placemarkService.getCategoryById(categoryId);

  //         // Make sure category and placemarks are available
  //         if (!category || !category.placemarks) {
  //           console.error("Category or placemarks are missing.");
  //           return;
  //         }

  //         let distances: string[] = []; // To store distances to each placemark

  //         // Loop through placemarks in the category and calculate the distance for each one
  //         for (let i = 0; i < category.placemarks.length; i += 1) {
  //           const placemark = category.placemarks[i];

  //           // Ensure placemark contains lat/long
  //           if (!placemark.lat || !placemark.long) {
  //             console.warn(`Placemark ${placemark.title} is missing coordinates.`);
  //             continue;
  //           }

  //           const lat2 = placemark.lat;
  //           const long2 = placemark.long;

  //           // Haversine formula to calculate distance
  //           const dLat = toRadians(lat2 - lat1);
  //           const dLong = toRadians(long2 - long1);
  //           const a =
  //             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //             Math.cos(toRadians(lat1)) *
  //               Math.cos(toRadians(lat2)) *
  //               Math.sin(dLong / 2) *
  //               Math.sin(dLong / 2);
  //           const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //           let distance = R * c; // Distance in kilometers

  //           // Round the distance to 2 decimal places
  //           distance = Number(distance).toFixed(2);

  //           // Handle case for -Infinity
  //           if (distance === "-Infinity") {
  //             distance = "0";
  //           }

  //           // Format the distance and add to the distances array
  //           distances.push(`${distance} km away`);
  //         }

  //         // Output distances for each placemark (you could also display it in the UI)
  //         console.log(distances);
  //       } else {
  //         console.error("No matched user found.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   } else {
  //     console.error("Email or token missing.");
  //   }
  // }

  // function getDistanceToPlacemarks(userDetails: any, category: Category): string[] {
  //   let distances: string[] = [];

  //   if (category.placemarks) {
  //     for (let i = 0; i < category.placemarks.length; i += 1) {
  //       const placemark = category.placemarks[i];
  //       const distance = calculateDistance(userDetails.userLat, userDetails.userLong, placemark);
  //       distances.push(distance);
  //     }
  //   }

  //   return distances;
  // }

  // // onMount will fetch and assign:
  // onMount(async () => {
  //   distance = await calculateDistance();
  // });

  import { placemarkService } from "$lib/ui/services/placemark-service";
  import type { Category, Placemark, User } from "$lib/ui/types/placemark-types";
  import { onMount } from "svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { goto } from "$app/navigation";

  let user: User;
  let categoryId = "";
  let placemarkId = "";
  let travelMeans = "";
  let destination = "";
  let distance = ""; // This will store the final distance string
  let youShouldVisit = "";

  let category: Category | null = null;
  let placemark: Placemark = {
    title: "",
    lat: "",
    long: "",
    address: "",
    country: "",
    phone: "",
    website: "",
    visited: "",
    description: ""
  };

  const token = loggedInUser.token;
  const email = loggedInUser.email;

  onMount(async () => {
    try {
      const pathParts = window.location.pathname.split("/");
      console.log("Path parts:", pathParts);
      categoryId = pathParts[pathParts.indexOf("category") + 1];
      placemarkId = pathParts[pathParts.indexOf("placemark") + 1];

      if (categoryId && token) {
        // Fetch full category
        const categoryResponse = await placemarkService.getCategoryById(categoryId);
        console.log("Fetched category: ", categoryResponse);

        // Fetch placemark by its ID
        const placemarkResponse = await placemarkService.getPlacemarkById(categoryId, placemarkId);
        console.log("Fetched placemark:", placemarkResponse);

        // Update the placemark state
        placemark = placemarkResponse; // Ensure placemark is updated

        // Set the destination (country of the placemark)
        destination = placemark.country.toLowerCase().trim();
        console.log("Fetched destination: ", destination);

        if (email && token) {
          // Fetch user data
          const users = await placemarkService.getAllUsers(token);
          const matchedUser = users.find((user) => user.email === email);

          if (matchedUser) {
            user = matchedUser; // Assign the matched user to the `user` variable
            console.log("Matched user:", user);

            // Get userCountry from matched user
            let userCountry = matchedUser.country.toLowerCase().trim();
            console.log("userCountry:", userCountry);

            // Determine travel means after both destination and userCountry are available
            if (destination === userCountry) {
              travelMeans = "car, bus, or train";
            } else {
              travelMeans = "plane";
            }
            console.log("Travel means:", travelMeans);
          } else {
            console.log("No user found matching email.");
          }
        } else {
          console.error("Missing token or email.");
        }

        // Calculate distance after user and placemark data is fetched
        await calculateDistance();
        youShouldVisit = await getYouShouldVisit();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  // Function to calculate the distance between user and placemark
  async function calculateDistance() {
    const email = loggedInUser.email;
    const token = loggedInUser.token;

    const pathParts = window.location.pathname.split("/");
    console.log("Path parts:", pathParts);
    categoryId = pathParts[pathParts.indexOf("category") + 1];
    placemarkId = pathParts[pathParts.indexOf("placemark") + 1];

    if (email && token) {
      try {
        // Fetch user data using email and token
        const users = await placemarkService.getAllUsers(token);
        const matchedUser = users.find((user) => user.email === email);

        if (matchedUser) {
          const userDetails = matchedUser; // Assign the matched user to the `userDetails` variable

          console.log("Matched user in calculation:", userDetails);

          const lat1 = userDetails.userLat;
          const long1 = userDetails.userLong;

          // If user details are not available, return early
          if (!lat1 || !long1) {
            console.error("User location data is missing.");
            return;
          }

          const toRadians = (degrees: number) => degrees * (Math.PI / 180);
          const R = 6371; // Radius of the Earth in kilometers

          const category = await placemarkService.getCategoryById(categoryId);

          // Make sure category and placemarks are available
          if (!category || !category.placemarks) {
            console.error("Category or placemarks are missing.");
            return;
          }

          const placemark = category.placemarks.find((p) => p._id === placemarkId);

          if (placemark) {
            const lat2 = placemark.lat;
            const long2 = placemark.long;

            // Haversine formula to calculate distance
            const dLat = toRadians(lat2 - lat1);
            const dLong = toRadians(long2 - long1);
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) *
                Math.cos(toRadians(lat2)) *
                Math.sin(dLong / 2) *
                Math.sin(dLong / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let dist = R * c; // Distance in kilometers

            // Round the distance to 2 decimal places
            dist = Number(dist).toFixed(2);

            // Handle case for -Infinity
            if (dist === "-Infinity") {
              dist = "0";
            }

            // Update the distance string
            distance = `${dist} km away`;
            console.log("Calculated distance: ", distance);
          }
        } else {
          console.error("No matched user found.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    } else {
      console.error("Email or token missing.");
    }
  }

  async function getYouShouldVisit() {
    let youShouldVisit = "";
    const email = loggedInUser.email;
    const token = loggedInUser.token;

    const pathParts = window.location.pathname.split("/");
    const categoryId = pathParts[pathParts.indexOf("category") + 1];
    const placemarkId = pathParts[pathParts.indexOf("placemark") + 1];

    console.log("This is the placemarkId in youShouldVisit: ", placemarkId);

    if (!email || !token) {
      console.error("Missing email or token.");
      return youShouldVisit;
    }

    if (email && token) {
      const pathParts = window.location.pathname.split("/");
      const categoryId = pathParts[pathParts.indexOf("category") + 1];
      const placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
      const users = await placemarkService.getAllUsers(token);
      const matchedUser = users.find((user) => user.email === email);

      if (matchedUser) {
        const userDetails = matchedUser;
        console.log("Matched user in you should visit:", userDetails);

        const category = await placemarkService.getCategoryById(categoryId);
        console.log("Category in you youShouldVisit: ", category);

        if (!category || !category.placemarks) {
          console.error("Category or placemarks not found.");
          return youShouldVisit;
        }
        console.log("This is the placemarkId 2 in youShouldVisit: ", placemarkId);
        // const placemark = category.placemarks.find((p) => p.id === placemarkId);
        const placemark = await placemarkService.getPlacemarkById(categoryId, placemarkId);
        console.log("Placemark in you youShouldVisit: ", placemark);
        if (!placemark) {
          console.error("Placemark not found for id:", placemarkId);
          return youShouldVisit;
        }

        console.log("Placemark found:", placemark);

        const visit = placemark.visited;
        console.log("Placemark visited status:", visit);

        if (visit === "No") {
          youShouldVisit = `What are you waiting for? Time to pay a visit to ${placemark.title}!`;
        } else {
          youShouldVisit = `Although you have already been there, it is never a bad idea to visit again the ${placemark.title}.`;
        }

        console.log("You should visit message:", youShouldVisit);
        return youShouldVisit;
      } else {
        console.error("No matched user found.");
        return youShouldVisit;
      }
    }

    return youShouldVisit;
  }
</script>

{#if placemark}
  <main class="columns box container">
    <section class="column is-8 m-2">
      <p class="title is-size-4">{placemark.title}, {placemark.country}</p>
      <p>
        {placemark.description} Find out more on
        <a href={placemark.website} target="_blank" class="has-text-grey">{placemark.website}</a>.
      </p>
      <p class="mt-4">
        Hey! To get to {placemark.title}, you need to travel by {travelMeans}, and it is {distance}.
      </p>
      <p class="mt-4 mb-4">{youShouldVisit} {placemark.title}!</p>
      <div class="buttons pt-3">
        <a
          href={placemark.website}
          target="_blank"
          class="has-text-grey"
          style="word-wrap: break-word;"
        >
          <button class="button is-info has-text-white">Find out more</button>
        </a>
      </div>
    </section>
    <section class="column is-4">
      <figure class="image is-264x264 m-auto">
        <img
          src="https://i.ibb.co/M66kktn/travel.jpg"
          alt="Travel signs"
          style="border-radius: 10px;"
          border="0"
        />
      </figure>
    </section>
  </main>
{/if}
