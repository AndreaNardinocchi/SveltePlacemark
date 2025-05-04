<script>
  // https://www.npmjs.com/package/dompurify
  import DOMPurify from "dompurify";

  let {
    image = "https://i.ibb.co/v42p9nCY/restaurant.jpg",
    alt = "restaurant",
    category = "Restaurants"
  } = $props();

  // Sanitize values
  const safeImage = DOMPurify.sanitize(image);
  const safeAlt = DOMPurify.sanitize(alt);
  const safeCategory = DOMPurify.sanitize(category);
</script>

<section class="card has-text-centered has-background-black">
  <header class="card-header">
    <p class="card-header-title is-size-4 is-centered has-text-white"></p>
  </header>
  <div class="card-image">
    <figure class="image is-264x264 m-auto">
      <img src={safeImage} alt={safeAlt} />
    </figure>
  </div>

  <div class="columns is-centered">
    <div class="column is-12 has-text-centered">
      <article class="card-content">
        <p class="content subtitle is-size-4 has-text-weight-bold has-text-white has-text-centered">
          {safeCategory}
        </p>
      </article>
    </div>
  </div>
</section>
