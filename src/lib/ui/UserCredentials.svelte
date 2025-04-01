<script lang="ts">
    import HomepageTextCard from './HomepageTextCard.svelte';
    import Fa from 'svelte-fa';
    import { faPlane } from '@fortawesome/free-solid-svg-icons';
    import { fly } from 'svelte/transition';
    import { inview } from 'svelte-inview';
    let { 
          email = $bindable(""),
          password = $bindable("")
        } = $props();

    let isInView: boolean = false;
    
  </script>
  

    <form action="/authenticate" method="POST" >
      <h2 class="subtitle is-size-4 pt-4 mb-4">Let's take off...</h2>
      <!-- Email Field with Icon -->
      <div class="field">
        <label class="label">
          Email
          <div class="control has-icons-left">
            <input class="input" type="text" placeholder="Enter email" name="email" bind:value={email}  />  
            
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
            <input class="input" type="password" placeholder="Enter Password" name="password" bind:value={password}/>
            <!--  -->
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
 
