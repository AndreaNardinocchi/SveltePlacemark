<script lang="ts">
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview
  import { fly } from "svelte/transition";
  import PlacemarkLogin from "../../lib/ui/PlacemarkLogin.svelte";
  import UserCredentials from "../../lib/ui/UserCredentials.svelte";
  import { goto } from "$app/navigation";
  import Message from "../../lib/ui/Message.svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service";

  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function login() {
    console.log(`attempting to log in email: ${email} with password: ${password}`);
    let session = await placemarkService.login(email, password);
    if (session) {
      goto("/dashboard");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>

<section class="hero is-small is-dark mt-6 px-6">
  <div class="hero-body mt-6">
    <p class="title has-text-white">Log in</p>
  </div>
</section>
<section class="section">
  <section class="columns">
    <!-- svelte-ignore event_directive_deprecated -->
    <section class="column is-6 pt-5 pr-5 pb-6" in:fly={{ x: 200, duration: 2000 }}>
      {#if message}
        <Message {message} />
      {/if}
      <UserCredentials bind:email bind:password />
      <!-- Submit Button -->
      <div class="field is-grouped mt-3">
        <button onclick={() => login()} class="button is-info is-fullwidth has-text-white"
          >Log In</button
        >
      </div>
      <div class="field is-grouped">
        <p class="is-pulled-right">
          Don't have an account? <a href="/signup" data-cy="login-redirect" class="has-text-grey"
            >Sign up</a
          > now!
        </p>
      </div>
    </section>
    <section class="column is-6 px-4">
      <PlacemarkLogin />
    </section>
  </section>
</section>
