<script lang="ts">
  // https://www.npmjs.com/package/svelte-fa
  import LoginForm from "./LoginForm.svelte";

  // Browser title
  let pageTitle = "Log in to PlaceMark"; // This can be dynamic
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>
<div class="container">
  <LoginForm />
</div>
