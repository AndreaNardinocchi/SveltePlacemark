<!-- Submit Button
      <div class="field is-grouped">
        <button class="button is-info has-text-white is-fullwidth">Submit</button>
      </div>
      <div class="field is-grouped">
        <p class="is-pulled-right">
          Don't have an account? <a href="/signup" data-cy="login-redirect" class="has-text-grey">Sign up</a> now!
        </p>
      </div> -->
<!-- </form> -->

<script lang="ts">
  import UserCredentialsReal from "./UserCredentialsReal.svelte";
  import HomepageTextCard from "./HomepageTextCard.svelte";
  import Fa from "svelte-fa";
  import { faPlane } from "@fortawesome/free-solid-svg-icons";
  // import { fly } from "svelte/transition";
  // import { inview } from "svelte-inview";

  // let isInView: boolean = false;
  let { email = $bindable(""), password = $bindable("") } = $props();

  // Use $effect to watch changes to isInView and trigger side effects
  // $effect(() => {
  //   // This function will run every time `isInView` changes
  //   console.log(isInView); // You can use this to debug or trigger actions
  // });
</script>

<!-- <div
  class="wrapper"
  use:inview={{ unobserveOnEnter: true, rootMargin: "-10%" }}
  on:change={({ detail }) => {
    isInView = detail.inView; // This will now trigger the effect
  }}
> -->
<!-- {#if isInView}
    <div in:fly={{ x: 200, duration: 1000 }}> -->
<!-- <UserCredentialsReal /> -->
<h2 class="subtitle is-size-4 pt-4 mb-4">Let's take off...</h2>
<!-- Email Field with Icon -->
<div class="field">
  <label class="label">
    Email
    <div class="control has-icons-left">
      <input class="input" type="text" placeholder="Enter email" name="email" bind:value={email} />

      <span class="icon is-small is-left">
        <!-- FontAwesome icon for email -->
        <i class="fa fa-envelope"></i>
      </span>
    </div>
  </label>
</div>
<!-- Password Field with Icon -->
<div class="field">
  <label class="label">
    Password
    <div class="control has-icons-left">
      <input
        class="input"
        type="password"
        placeholder="Enter Password"
        name="password"
        bind:value={password}
      />
      <!--  -->
      <span class="icon is-small is-left">
        <!-- FontAwesome icon for password -->
        <i class="fa fa-key"></i>
      </span>
    </div>
  </label>
</div>
<!-- </div> -->
<!-- {/if}
</div> -->
