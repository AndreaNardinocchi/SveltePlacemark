<script>
    // https://medium.com/@ravipatel.it/a-comprehensive-guide-to-fetching-weather-data-using-javascript-fetch-api-13133d0bc2e6
    // @ts-nocheck
    import { preprocess } from "svelte/compiler";

      let { titleShort  = "Miami", 
      country = "United States", 
      description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 
      website = "https://www.marriott.com", 
      youShouldVisit="What are you waiting for? Time to pay a visit to ", travelMeans="plane", distance="4.000 km away" } = $props();

</script>

<main class="columns box container">
    <section class="column is-8 m-2 ">
      <p class="title is-size-4">{titleShort}, {country}</p>
      <p>
        {description} Find out more on <a href="{website}" target="_blank" class="has-text-grey">{website}</a>.
      </p>
      <p class="mt-4">Hey! To get to {titleShort}, you need to travel by {travelMeans}, and it is {distance}.</p>
      <p class="mt-4 mb-4">{youShouldVisit}{titleShort}!</p>
      <div class="buttons pt-3">
        <a href="{website}" target="_blank" class="has-text-grey" style="word-wrap: break-word;">
        <button class="button is-info has-text-white">Find out more</button>
        </a>
      </div>
    </section>
    <section class="column is-4 ">
      <figure class="image is-264x264 m-auto">
        <img src="https://i.ibb.co/M66kktn/travel.jpg" alt="Travel signs" style="border-radius: 10px;" border="0">
      </figure>
    </section>
    </main>