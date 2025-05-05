<script>
  // https://www.npmjs.com/package/dompurify
  import DOMPurify from "dompurify";
  let {
    image = "https://i.ibb.co/cKdVXzh7/airplane.jpg",
    text = "PlaceMark is the app to mark all your loved travel destinations..."
  } = $props();
  // Sanitize values
  const safeImage = DOMPurify.sanitize(image);
</script>

<h2 class="subtitle is-4 mt-2 has-text-centered">{text}</h2>
<figure class="image is-264x264 m-auto">
  <img src={safeImage} alt="airplane" />
</figure>
