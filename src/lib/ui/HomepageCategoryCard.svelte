<script>
    let { image = "https://i.ibb.co/v42p9nCY/restaurant.jpg", alt = "restaurant", category = "Restaurants"} = $props();
</script>

<section class="column is-6 p-4">
    <section class="card has-text-centered has-background-black">
      <header class="card-header">
        <p class="card-header-title is-size-4 is-centered has-text-white"></p>
      </header>
      <div class="card-image">
        <figure class="image is-264x264 m-auto">
          <img src={image} alt={alt} >
        </figure>
      </div>
      <!-- The column container below needs to ensure full-width -->
      <div class="columns is-centered">
        <div class="column is-12 has-text-centered"> <!-- Set column to be full-width to center content -->
          <article class="card-content">
            <p class="content subtitle is-size-4 has-text-weight-bold has-text-white has-text-centered">
              {category}
            </p>
          </article>
        </div>
      </div>
    </section>
  </section>