<script lang="ts">
  // https://medium.com/@ravipatel.it/a-comprehensive-guide-to-fetching-weather-data-using-javascript-fetch-api-13133d0bc2e6
  // @ts-nocheck
  import { titleLandingPage } from "$lib/shared.svelte";
  import { fly } from "svelte/transition";
  import { placemarkService } from "./services/placemark-service";
  import { placemark } from "$lib/runes.svelte";
  import { onMount } from "svelte"; // ✅ Import onMount

  let visible = $state(true);

  let { title = "#instaPlaceMark", subtitle = "InstaMark your InstaPlaces" } = $props();

  // Reactive state variables for user input and results
  let city = $state(""); // City to fetch weather for
  let weatherData = $state(""); // Resulting weather data
  let errorMessage = $state(""); // Any error that occurs during fetch

  const API_KEY = "c3e26a0b5387b001f6f548f5710c0baf";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/";

  // Function to fetch the weather data
  async function getWeather() {
    /**
     * The below variables will enable me to retrieve tha category and placemark ids
     * https://css-tricks.com/snippets/javascript/get-url-and-url-parts-in-javascript/
     * https://www.slingacademy.com/article/isolating-file-paths-and-directories-using-javascript-string-methods-without-extracting-filename-extension/
     */
    const pathParts = window.location.pathname.split("/");
    const categoryId = pathParts[pathParts.indexOf("category") + 1];
    const placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
    const placemark = await placemarkService.getPlacemarkById( placemarkId);
    city = city?.trim() || placemark.country;

    if (!city) {
      errorMessage = "City or country not found in placemark.";
      return;
    }

    try {
      // Fetch weather data from OpenWeatherMap API
      const weatherResponse = await fetch(
        `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }

      const data = await weatherResponse.json();
      weatherData = data;
      errorMessage = "";
    } catch (error) {
      console.error("Error fetching data:", error);
      errorMessage = "Failed to fetch weather data.";
      weatherData = null;
    }
  }

  // Auto-fetch on component mount
  onMount(() => {
    getWeather();
  });

  function displayForecast(data) {
    const forecastBody = document.getElementById("forecastBody");
    forecastBody.innerHTML = "";

    const dailyForecasts = data.list.filter((item) => item.dt_txt.includes("12:00:00"));
    dailyForecasts.forEach((forecast) => {
      const date = new Date(forecast.dt_txt).toLocaleDateString();
    });
  }
</script>

<section class="has-background-white container">
  <!-- Weather Widget Section -->
  <section class="box">
    <section class="columns mt-6 pt-6 pb-4 px-6">
      <div class="column is-4">
        <p class="title has-text-centered is-5">#instaWeather</p>
      </div>
      <div class="column is-8">
        <div class="columns">
          <div class="column is-9">
            <input
              class="input"
              type="text"
              bind:value={city}
              placeholder="Enter city or country"
            />
          </div>
          <div class="column is-3">
            <!-- svelte-ignore event_directive_deprecated -->
            <button class="button is-info has-text-white" on:click={getWeather}>
              Get Weather
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="columns has-background-white-bis">
      {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
      {/if}

      <!-- This block is only displayed if both weather data and the city are available -->
      {#if weatherData && city}
        <!-- Column for displaying the name of the country or city -->
        <div class="column has-text-centered is-4">
          <p class="has-text-weight-bold">Country or City</p>
          <p>{weatherData.name}</p>
        </div>
        <!-- Column for displaying the temperature -->
        <div class="column has-text-centered is-4">
          <p class="has-text-weight-bold">Temperature</p>
          <p>{weatherData.main.temp}°C</p>
        </div>
        <!-- Column for displaying the weather condition -->
        <div class="column has-text-centered is-4">
          <p class="has-text-weight-bold">Condition</p>
          <p>{weatherData.weather[0].description}</p>
        </div>
      {/if}
    </section>
  </section>
</section>
