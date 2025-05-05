<script lang="ts">
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { goto } from "$app/navigation";
  import type { User } from "$lib/ui/types/placemark-types";
  import Message from "$lib/ui/Message.svelte";
  import PlacemarkSignup from "$lib/ui/PlacemarkSignup.svelte";
  import PlacemarkSignupImage from "$lib/ui/PlacemarkSignupImage.svelte";
  import { fly } from "svelte/transition";
  // import bcrypt from "bcryptjs";

  // Form state variables
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
  let message = $state(""); // To show error or success messages

  // Function to handle the signup process
  async function signup() {
    console.log("Signup function triggered");

    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

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
      password: password //hashedPassword // store hashed password
    };

    //   try {
    //     // Hash the password before sending it to the backend
    //     const saltRounds = 10;
    //     bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
    //       if (err) {
    //         console.error("Error hashing password", err);
    //         message = "Error hashing password";
    //         return;
    //       }

    //       // Replace the plain password with the hashed password
    //       user.password = hashedPassword;

    //       // Log the user object (with hashed password) being sent for signup
    //       console.log("Signing up user with data:", user);

    //       // Make the API call to the signup service
    //       const addedUser = await placemarkService.signup(user);

    //       // Log the backend response to verify
    //       console.log("Signup response:", addedUser);

    //       // Check if the response has an _id (indicating successful signup)
    //       if (addedUser) {
    //         console.log(`Successfully signed up ${user.firstName} ${user.lastName} ${user.email}`);
    //         // Redirect to login page after successful signup
    //         goto("/login");
    //       } else {
    //         console.error("Signup failed on the backend: No user _id returned");
    //         message = "Error trying to sign up";
    //       }
    //     });
    //   } catch (error) {
    //     console.error("Error during signup:", error);
    //     message = "Error trying to sign up";
    //   }
    // }

    try {
      // Log the user object being sent for signup
      console.log("Signing up user with data:", user);

      // Make the API call to the signup service
      const addedUser = await placemarkService.signup(user);

      // Log the backend response to verify
      console.log("Signup response:", addedUser);

      // Check if the response has an _id (indicating successful signup)
      if (addedUser) {
        console.log(
          `Successfully signed up ${user.firstName} ${user.lastName} ${user.email} ${user.password}`
        );
        // Redirect to login page after successful signup
        goto("/login");
      } else {
        console.error("Signup failed on the backend: No user _id returned");
        message = "Error trying to sign up";
      }
    } catch (error) {
      // Log the error in case of failure
      console.error("Error during signup:", error);
      message = "Error trying to sign up";
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
    <section class="column is-8 px-4" in:fly={{ y: 200, duration: 3000 }}>
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
