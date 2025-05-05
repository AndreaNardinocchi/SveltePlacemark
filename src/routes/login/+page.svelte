<script context="module">
  // https://www.npmjs.com/package/svelte-fa
  import LoginForm from "./LoginForm.svelte";

  // @ts-ignore
  export const load = async ({ page }) => ({
    props: {
      key: page.path
    }
  });

  /**
   * @type {any}
   */
  export let key;

  let pageTitle = "Log in to PlaceMark"; // This can be dynamic
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>
<div class="container">
  <LoginForm />
</div>
