<script lang="ts">
  import AccountModal from "./AccountModal.svelte";
  import { loggedInUser } from "$lib/runes.svelte";

  console.log("This is the first name:", loggedInUser, loggedInUser.firstName, loggedInUser.email);
</script>

<section class="box has-background-dark">
  <section class="content p-6">
    <p class="title is-size-1 has-text-white has-text-centered">
      - {loggedInUser.firstName}'s profile -
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
            Hi <span class="has-text-weight-bold">{loggedInUser.firstName}</span> !!
          </p>
          <p>Welcome to your user profile page!</p>
          <p>Please, take a moment to check your details in the box...</p>
        </div>
      </div>
      <div class="column is-6 is-size-5 box p-6">
        <p class="subtitle is-3 has-text-weight-bold has-text-centered">
          {loggedInUser.firstName}'s account details
        </p>
        <hr />
        <div class="columns">
          <div class="column is-6 is-size-6">
            <p>
              <span class="has-text-weight-bold">First Name:</span><br />
              {loggedInUser.firstName}
            </p>
            <hr />
            <p>
              <span class="has-text-weight-bold">Last Name:</span><br />
              {loggedInUser.lastName}
            </p>
            <hr />
            <p><span class="has-text-weight-bold">Country:</span><br /> {loggedInUser.country}</p>
            <hr />
            <p><span class="has-text-weight-bold">Street:</span><br /> {loggedInUser.street}</p>
            <hr />
            <p>
              <span class="has-text-weight-bold">Address code:</span><br />
              {loggedInUser.addressCode}
            </p>
            <hr />
          </div>
          <div class="column is-6 is-size-6">
            <p>
              <span class="has-text-weight-bold">Date of birth:</span><br />
              {loggedInUser.DOB}
            </p>
            <hr />
            <p>
              <span class="has-text-weight-bold">Phone number:</span><br />
              {loggedInUser.phoneNumber}
            </p>
            <hr />
            <p>
              <span class="has-text-weight-bold">Email:</span><br />
              <span style="word-wrap: break-word;">{loggedInUser.email}</span>
            </p>
            <hr />
            <p>
              <span class="has-text-weight-bold">Password:</span><br />
              {loggedInUser.password}
            </p>
            <hr />
            <p>
              <span class="has-text-weight-bold">Coordinates (lat/long):</span><br />
              {loggedInUser.userLat}<br />
              {loggedInUser.userLong}
            </p>
            <hr />
          </div>
        </div>
        <div>
          <a class="button is-danger m-2" href={`/account/deleteuser/${loggedInUser._id}`}>
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
        </div>
      </div>
    </div>
  </div>
</section>
