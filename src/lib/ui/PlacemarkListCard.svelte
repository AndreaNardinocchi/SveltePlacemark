<script>
  let { children } = $props();
</script>

<!-- Each placemark will be shown here -->

<div class="card has-text-dark-grey">
  {@render children()}
</div>
