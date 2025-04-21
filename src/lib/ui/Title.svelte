<script>
  // https://medium.com/@ravipatel.it/a-comprehensive-guide-to-fetching-weather-data-using-javascript-fetch-api-13133d0bc2e6
  // @ts-nocheck
  // import  { titleLandingPage } from '../shared.svelte.js';
  import { titleLandingPage } from "$lib/shared.svelte";

  import { fly } from "svelte/transition";
  let visible = $state(true);

  let { title = "#instaPlaceMark", subtitle = "InstaMark your InstaPlaces" } = $props();

  let city = $state("");
  let weatherData = $state("");
  let errorMessage = $state("");

  const API_KEY = "c3e26a0b5387b001f6f548f5710c0baf";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/";

  // Function to fetch the weather data
  async function getWeather() {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }

      const data = await weatherResponse.json();
      weatherData = data;
      errorMessage = ""; // Reset error message if successful
    } catch (error) {
      console.error("Error fetching data:", error);
      errorMessage = "Failed to fetch weather data.";
      weatherData = null; // Clear the previous weather data if error occurs
    }
  }

  // Function to display weather forecast (not implemented fully here)
  function displayForecast(data) {
    const forecastBody = document.getElementById("forecastBody");
    forecastBody.innerHTML = "";

    // Forecast data comes in 3-hour intervals, so we'll filter to get daily forecasts
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
            <input class="input" type="text" bind:value={city} placeholder="Enter city name" />
          </div>
          <div class="column is-3">
            <!-- svelte-ignore event_directive_deprecated -->
            <button class="button is-info has-text-white" on:click={getWeather}>
              <!-- onclick="getWeather()"> -->
              Get Weather
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="columns has-background-white-bis">
      <!-- Display error message -->
      {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
      {/if}

      <!-- Display current weather if available -->
      {#if weatherData}
        <div class="column has-text-centered is-4">
          <p class="has-text-weight-bold">City</p>
          <p>{weatherData.name}</p>
        </div>
        <div class="column has-text-centered is-4">
          <p class="has-text-weight-bold">Temperature</p>
          <p>{weatherData.main.temp}°C</p>
        </div>
        <div class="column has-text-centered is-4">
          <p class="has-text-weight-bold">Condition</p>
          <p>{weatherData.weather[0].description}</p>
        </div>
      {/if}
    </section>
  </section>
</section>

<!-- <article class="content px-4">
    <div class="container mt-6">
      <div class="columns">
        <div class="column" >

          <label class="mt-2">
            <input type="checkbox" bind:checked={visible} />
            visible
          </label>
          
          {#if visible}
          <p class="title has-text-centered is-2 pt-4 pb-2" in:fly={{ y: 200, duration: 500 }} >
            {title} {titleLandingPage.titleShort}  {{titleShort}}! 
          </p>
          <p class="subtitle has-text-centered mb-6" in:fly={{ y: 200, duration: 500 }}>
            {subtitle}
          </p>
          {/if}
        </div>
      </div>
    </div>
    </article> -->
