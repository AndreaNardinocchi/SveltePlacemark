<script lang="ts">
  import Fa from 'svelte-fa';
  import { faPlane } from '@fortawesome/free-solid-svg-icons';
  let { header = "Log in", label1 = "Email", label2 = "Password", title = "PlaceMark", subtitle = "Place your mark on your next journey!" } = $props();
</script>

<section class="section mt-6">
  <h1 class="title pt-4 pb-6">{header}</h1>

  <section class="columns">
    <section class="column is-6 mt-5 pt-5 pr-5">
      <form action="/authenticate" method="POST">
        <!-- Email Field with Icon -->
        <div class="field">
          <label class="label">{label1}
          <div class="control has-icons-left">
            <input class="input" type="text" placeholder="Enter email" name="email" />
            <span class="icon is-small is-left">
              <!-- FontAwesome icon for email -->
              <i class="fa fa-envelope"></i>
            </span>
          </div>
        </label>
        </div>

        <!-- Password Field with Icon -->
        <div class="field">
          <label class="label">{label2}
          <div class="control has-icons-left">
            <input class="input" type="password" placeholder="Enter Password" name="password" />
            <span class="icon is-small is-left">
              <!-- FontAwesome icon for password -->
              <i class="fa fa-key"></i>
            </span>
          </div>
        </label>
        </div>

        <!-- Submit Button -->
        <div class="field is-grouped">
          <button class="button is-info has-text-white">Submit</button>
          <p class="has-text-centered">
            Don't have an account? <a href="/signup" data-cy="login-redirect">Sign up Here</a>
            </p>
        </div>
      </form>

    </section>

    <section class="column is-6 px-4">
      <!-- Image Section with Plane Icon -->
      <section class="image has-text-centered">
        <Fa style="font-size: 160px; color: #000000;" icon={faPlane} />
      </section>
      <p class="title is-size-1 mt-3 pl-4">{title}</p>
      <p class="subtitle has-text-weight-bold pl-4">{subtitle}</p>
    </section>
  </section>
</section>
