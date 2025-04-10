<script lang="ts">
  import PlacemarkSignup from "$lib/ui/PlacemarkSignup.svelte";
  import PlacemarkSignupImage from "$lib/ui/PlacemarkSignupImage.svelte";
  import { goto } from "$app/navigation";
  import type { User } from "$lib/ui/types/placemark-types";
  import Message from "$lib/ui/Message.svelte";
  import { placemarkService } from "$lib/ui/services/placemark-service";

  let firstName = $state("");
  let lastName = $state("");
  let userLat = $state("");
  let userLong = $state("");
  let country = $state("");
  let street = $state("");
  let addressCode = $state("");
  let DOB = $state("");
  let phoneNumber = $state("");
  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function signup() {
    const user: User = {
      firstName: firstName,
      lastName: lastName,
      userLat: userLat,
      userLong: userLong,
      country: country,
      street: street,
      addressCode: addressCode,
      DOB: DOB,
      phoneNumber: phoneNumber,
      email: email,
      password: password
    };
    let success = await placemarkService.signup(user);
    // const success = true;
    if (success) {
      console.log(`You are signing up ${firstName} ${lastName} ${email} and ${password}`);
      goto("/login");
    } else {
      message = "Error Trying to sign up";
    }
  }
</script>

<section class="hero is-small has-background-grey mt-6 px-6">
  <div class="hero-body mt-6">
    <p class="title has-text-white">Sign up</p>
  </div>
</section>
<section class="px-3">
  <section class="columns is-multiple">
    <!-- Left Column for PlacemarkSignup -->
    <section class="column is-8 px-4">
      {#if message}
        <Message {message} />
      {/if}
      <section class="section">
        <PlacemarkSignup
          bind:firstName
          bind:lastName
          bind:userLat
          bind:userLong
          bind:country
          bind:street
          bind:addressCode
          bind:DOB
          bind:phoneNumber
          bind:email
          bind:password
        />

        <!-- Button section -->
        <div class=" field is-grouped">
          <button onclick={() => signup()} class="button is-info has-text-white px-5 is-fullwidth"
            >Sign Up</button
          >
        </div>
        <div class="is-grouped">
          <p class="has-text-right is-size-7">
            *Find your exact location coordinates on
            <a href="https://www.gps-coordinates.net/" target="_blank" class="has-text-grey"
              >https://www.gps-coordinates.net/
            </a>
            <span class="ml-1 icon is-small">
              <i class="fas fa-solid fa-folder-open"></i>
            </span>
          </p>
          <p class="is-pulled-right">
            Already have an account? <a href="/login" data-cy="login-redirect" class="has-text-grey"
              >Log in</a
            > here
          </p>
        </div>
      </section>
    </section>
    <section class="column is-4 px-6">
      <PlacemarkSignupImage />
    </section>
  </section>
</section>
