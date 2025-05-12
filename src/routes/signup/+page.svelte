<script lang="ts">
  import SignupForm from "./SignupForm.svelte";

  // Browser title
  let pageTitle = "Sign Up for PlaceMark";
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="container">
  <SignupForm />
</div>
