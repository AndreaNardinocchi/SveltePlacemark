<script lang="ts">
  import { goto } from "$app/navigation";

  function goToSignup() {
    goto("/signup");
  }
</script>

<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="column has-text-centered">
        <figure class="image is-128x128 m-auto">
          <img src="https://i.ibb.co/v6YZd79k/airplane-down.png" alt="airplane-down" />
        </figure>
        <h3 class="title mt-6">Sorry pal, your email is taken already!</h3>
        <p class="subtitle is-4 mt-4">
          How about you try again with a different one...before we crash, ah?
        </p>
        <div class="column is-offset-4">
          <div class="buttons mt-6">
            <button on:click={goToSignup} class="button is-text has-text-grey">
              <h2 class="has-text-weight-bold is-size-3 mt-4">back to signup →</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
