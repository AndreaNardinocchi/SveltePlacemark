<!-- <script lang="ts">
  import AccountModal from "./AccountModal.svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import type { User } from "./types/placemark-types";
  import SignupForm from "../../routes/signup/SignupForm.svelte";
  import PlacemarkSignup from "./PlacemarkSignup.svelte";

  import { onMount } from "svelte";

  let user: User | null = null;

  let firstName = "";
  let lastName = "";
  let userLat = "";
  let userLong = "";
  let country = "";
  let street = "";
  let addressCode = "";
  let DOB = "";
  let phoneNumber = "";
  let email = "";
  let password = "";

  onMount(() => {
    const unsubscribe = loggedInUser.subscribe((value: User | null) => {
      if (value) {
        user = value;
        firstName = value.firstName ?? "";
        lastName = value.lastName ?? "";
        userLat = value.userLat ?? "";
        userLong = value.userLong ?? "";
        country = value.country ?? "";
        street = value.street ?? "";
        addressCode = value.addressCode ?? "";
        DOB = value.DOB ?? "";
        phoneNumber = value.phoneNumber ?? "";
        email = value.email ?? "";
        password = value.password ?? "";
      }
    });

    return unsubscribe;
  });

  // console.log("This is the first name:", loggedInUser, loggedInUser.firstName, loggedInUser.email);
</script>

<!-- {#if loggedInUser} -->

<!-- <section class="box has-background-dark">
  <section class="content p-6">
    <p class="title is-size-1 has-text-white has-text-centered">
      - {firstName}'s profile -
    </p>
  </section>
</section>
<div class="columns mt-2">
  <div class="column is-3"></div>
  <div class="column is-6">
    <hr />
  </div>
  <div class="column is-3"></div>
</div>
<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column is-6 mt-6 pt-6 pr-6 mb-5">
        <div class="about-avatar is-size-5">
          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="mb-6" alt="" />
          <p class="is-size-4 pb-2">
            Hi <span class="has-text-weight-bold">{firstName}</span> !!
          </p>
          <p>Welcome to your loggedInUser profile page!</p>
          <p>Please, take a moment to check your details in the box...</p>
        </div>
      </div>
      <div class="column is-6 is-size-5 box p-6">
        <p class="subtitle is-3 has-text-weight-bold has-text-centered">
          {firstName}'s account details
        </p>
        <hr />
        <div class="columns">
          <div class="column is-6 is-size-6">
            <p>
              <span class="has-text-weight-bold">First Name:</span><br />
              {firstName}
            </p>
            <hr />
            <p>
              <span class="has-text-weight-bold">Last Name:</span><br />
              {lastName}
            </p>
            <hr />
            <p><span class="has-text-weight-bold">Country:</span><br /> {country}</p>
            <hr />
            <p><span class="has-text-weight-bold">Street:</span><br /> {street}</p>
            <hr />
            <p>
              <span class="has-text-weight-bold">Address code:</span><br />
              {addressCode}
            </p>
            <hr />
          </div>
          <div class="column is-6 is-size-6">
            <p>
              <span class="has-text-weight-bold">Date of birth:</span><br />
              {DOB}
            </p>
            <hr />
            <p>
              <span class="has-text-weight-bold">Phone number:</span><br />
              {phoneNumber}
            </p>
            <hr />
            <p>
              <span class="has-text-weight-bold">Email:</span><br />
              <span style="word-wrap: break-word;">{email}</span>
            </p>
            <hr />
            <p>
              <span class="has-text-weight-bold">Password:</span><br />
              {password}
            </p>
            <hr />
            <p>
              <span class="has-text-weight-bold">Coordinates (lat/long):</span><br />
              {userLat}<br />
              {userLong}
            </p>
            <hr />
          </div>
        </div>
        <div>
          <a class="button is-danger m-2" href={`/account/deleteloggedInUser/${loggedInUser._id}`}>
            Delete account
          </a>
          <!-- <AccountModal
            bind:country
            bind:street
            bind:userLat
            bind:userLong
            bind:addressCode
            bind:phoneNumber
            bind:email
            bind:password
          /> -->
<!-- </div>
      </div>
    </div>
  </div>
</section>   -->

<!-- {/if} -->

<!-- src/lib/components/UserProfile.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { placemarkService } from "./services/placemark-service";
  import { loggedInUser } from "$lib/runes.svelte";
  import type { User } from "./types/placemark-types";
  import { goto } from "$app/navigation";

  // let user: User | null = null; // Make it nullable initially

  let user: User;

  const token = loggedInUser.token;
  const email = loggedInUser.email;
  const loggedInUserId = loggedInUser._id;

  console.log("This is the loggedInuserId: ", loggedInUserId);

  onMount(async () => {
    if (token && email) {
      try {
        const users = await placemarkService.getAllUsers(token);
        const matchedUser = users.find((user) => user.email === email);
        if (matchedUser) {
          user = matchedUser;
          console.log("Matched user:", user);
        } else {
          console.log("No user found matching email.");
        }
      } catch (error) {
        console.error("Failed to fetch or filter user:", error);
      }
    } else {
      console.error("Missing token or email.");
    }
  });

  async function deleteUser(userId: string) {
    if (!userId) {
      console.error("No user ID provided.");
      return;
    }

    // Optional: Confirmation before deleting the account
    // const confirmed = confirm(
    //   "Are you sure you want to delete your account? This action is permanent."
    // );
    // if (!confirmed) return;

    const success = await placemarkService.deleteUser(userId);
    console.log("This is the userId: ", userId, success);
    if (success && token) {
      console.log(`User ${userId} deleted successfully.`);
      goto("/"); // Redirect to home or login page
    } else {
      console.error("Failed to delete user.");
    }
  }
</script>

{#if user}
  <!-- Display user profile if available -->
  <section class="box has-background-dark">
    <section class="content p-6">
      <p class="title is-size-1 has-text-white has-text-centered">
        - {user.firstName}'s profile -
      </p>
    </section>
  </section>

  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-6 mt-6 pt-6 pr-6 mb-5">
          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="mb-6" alt="Avatar" />
          <p class="is-size-4 pb-2">
            Hi <strong>{user.firstName}</strong> !!
          </p>
          <p>Welcome to your profile page!</p>
          <p>Please, take a moment to check your details in the box...</p>
        </div>
        <div class="column is-6 box p-6 is-size-5">
          <p class="subtitle is-3 has-text-weight-bold has-text-centered">
            {user.firstName}'s account details
          </p>
          <hr />
          <div class="columns">
            <div class="column is-6 is-size-6">
              <p><strong>First Name:</strong><br />{user.firstName}</p>
              <hr />
              <p><strong>Last Name:</strong><br />{user.lastName}</p>
              <hr />
              <p><strong>Country:</strong><br />{user.country}</p>
              <hr />
              <p><strong>Street:</strong><br />{user.street}</p>
              <hr />
              <p><strong>Address Code:</strong><br />{user.addressCode}</p>
              <hr />
            </div>
            <div class="column is-6 is-size-6">
              <p><strong>Date of Birth:</strong><br />{user.DOB}</p>
              <hr />
              <p><strong>Phone Number:</strong><br />{user.phoneNumber}</p>
              <hr />
              <p>
                <span class="has-text-weight-bold">Email:</span><br /><span
                  style="word-wrap: break-word;"
                >
                  {user.email}</span
                >
              </p>
              <hr />
              <p><strong>Password:</strong><br />{user.password}</p>
              <hr />
              <p><strong>Coordinates:</strong><br />{user.userLat}, {user.userLong}</p>
              <hr />
            </div>
          </div>
          <!-- Check that user._id exists and is not null -->
          {#if user}
            <button class="button is-danger m-2" on:click={() => deleteUser(user?._id || "")}>
              Delete Account
            </button>
          {/if}
          <button class="button is-light m-2 js-modal-trigger" data-target="modal-js-example">
            Update account
          </button>
        </div>
      </div>
    </div>
  </section>
{:else}
  <section class="section has-text-centered">
    <p class="title is-4">No user logged in.</p>
  </section>
{/if}
