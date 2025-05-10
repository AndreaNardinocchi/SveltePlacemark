<script lang="ts">
  // https://medium.com/@ravipatel.it/a-comprehensive-guide-to-fetching-weather-data-using-javascript-fetch-api-13133d0bc2e6
  // @ts-nocheck
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import type { Category, Placemark, User } from "$lib/ui/types/placemark-types";
  import { onMount } from "svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";
  import DOMPurify from "dompurify";

  let map: any;
  import LeafletMapMulti from "./LeafletMapMulti.svelte";

  /**
   * This is to sanitize any inputs where needed
   * https://github.com/cure53/DOMPurify?tab=readme-ov-file#running-dompurify-on-the-server
   */
  function sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input); // Use DOMPurify to clean the input
  }

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
      /**
       * The below variables will enable me to retrieve tha category and placemark ids
       * https://css-tricks.com/snippets/javascript/get-url-and-url-parts-in-javascript/
       * https://www.slingacademy.com/article/isolating-file-paths-and-directories-using-javascript-string-methods-without-extracting-filename-extension/
       */
      const pathParts = window.location.pathname.split("/");
      console.log("Path parts:", pathParts);
      categoryId = pathParts[pathParts.indexOf("category") + 1];
      placemarkId = pathParts[pathParts.indexOf("placemark") + 1];

      if (categoryId && token) {
        // Get category
        const categoryResponse = await placemarkService.getCategoryById(categoryId);
        console.log("Fetched category: ", categoryResponse);

        // Get Placemark
        const placemarkResponse = await placemarkService.getPlacemarkById(placemarkId);
        console.log("Fetched placemark:", placemarkResponse);

        // Update placemark data
        placemark = placemarkResponse;

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
            // if (destination === userCountry) {
            if (destination.toLowerCase().includes(userCountry.toLowerCase())) {
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
    console.log("CategoryId in Placemark page: ", categoryId);
    const placemarkId = pathParts[pathParts.indexOf("placemark") + 1];

    console.log("This is the placemarkId in youShouldVisit: ", placemarkId);

    if (!email || !token) {
      console.error("Missing email or token.");
      return youShouldVisit;
    }

    if (email && token) {
      // const pathParts = window.location.pathname.split("/");
      // const categoryId = pathParts[pathParts.indexOf("category") + 1];
      // const placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
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
        const placemark = await placemarkService.getPlacemarkById(placemarkId);
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

{#if placemark.title}
  <main class="columns box container" in:fly={{ x: -200, duration: 2000 }}>
    <section class="column is-8 m-2">
      <p class="title is-size-4">
        {sanitizeInput(placemark.title)}, {sanitizeInput(placemark.country)}
      </p>
      <p>
        {sanitizeInput(placemark.description)} Find out more on
        <a href={sanitizeInput(placemark.website)} target="_blank" class="has-text-grey"
          >{sanitizeInput(placemark.website)}</a
        >.
      </p>
      <p class="mt-4">
        Hey! To get to {sanitizeInput(placemark.title)}, you need to travel by {sanitizeInput(
          travelMeans
        )}, and it is {sanitizeInput(distance)}.
      </p>
      <p class="mt-4 mb-4">{sanitizeInput(youShouldVisit)}</p>
      <div class="buttons pt-3">
        <a
          href={sanitizeInput(placemark.website)}
          target="_blank"
          class="has-text-grey"
          style="word-wrap: break-word;"
        >
          <button class="button is-info has-text-white">Find out more</button>
        </a>
      </div>
    </section>
    <section class="column is-4">
      <LeafletMapMulti
        lat={parseFloat(placemark.lat)}
        lng={parseFloat(placemark.long)}
        popupText={`${placemark.title}, ${placemark.country} `}
        height={30}
      />
      <!-- <figure class="image is-264x264 m-auto">
        <img
          src="https://i.ibb.co/M66kktn/travel.jpg"
          alt="Travel signs"
          style="border-radius: 10px;"
          border="0"
        />
      </figure> -->
    </section>
  </main>
{/if}
