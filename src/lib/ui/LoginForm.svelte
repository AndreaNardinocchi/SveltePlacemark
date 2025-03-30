<script lang="ts">
  import HomepageTextCard from './HomepageTextCard.svelte';
  import Fa from 'svelte-fa';
  import { faPlane } from '@fortawesome/free-solid-svg-icons';
  let { title = "Log in", 
        label1 = "Email", 
        label2 = "Password", 
        header = "PlaceMark", 
        subtitle = "Place your mark on your next journey!",
        email = $bindable(""),
        password = $bindable("")
      } = $props();
  
</script>
<section class="hero is-small is-dark mt-6 px-6">
  <div class="hero-body mt-6">
    <p class="title has-text-white">{title}</p>
  </div>
</section>
<section class="section">
  <section class="columns">
    <section class="column is-6 pt-5 pr-5 pb-6">
      <form action="/authenticate" method="POST" >
        <h2 class="subtitle is-size-4 pt-4 mb-4">Let's take off...</h2>
        <!-- Email Field with Icon -->
        <div class="field">
          <label class="label">
            {label1}
            <div class="control has-icons-left">
              <input class="input" type="text" placeholder="Enter email" name="email" bind:value={email}/>
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
            {label2}
            <div class="control has-icons-left">
              <input class="input" type="password" placeholder="Enter Password" name="password" bind:value={password}/>
              <span class="icon is-small is-left">
                <!-- FontAwesome icon for password -->
                <i class="fa fa-key"></i>
              </span>
            </div>
          </label>
        </div>
        <!-- Submit Button -->
        <div class="field is-grouped">
          <button class="button is-info has-text-white is-fullwidth">Submit</button>
        </div>
        <div class="field is-grouped">
          <p class="is-pulled-right">
            Don't have an account? <a href="/signup" data-cy="login-redirect" class="has-text-grey">Sign up</a> now!
          </p>
        </div>
      </form>
    </section>
    <section class="column is-6 px-4">
      <!-- Image Section with Plane Icon -->
      <section class="image has-text-centered">
        <Fa style="font-size: 160px; color: #000000;" icon={faPlane} />
      </section>
      <p class="title is-size-1 mt-3 pl-4">{header}</p>
      <p class="subtitle has-text-weight-bold pl-4">{subtitle}</p>
    </section>
  </section>
</section>