<script lang="ts">
  let { email = $bindable(""), password = $bindable("") } = $props();

  /** Input sanitizing 
  * https://stackoverflow.com/questions/62426548/how-do-i-make-svelte-update-input-components-like-react-does#62431731
  /**
   * @param {{ target: { value: string; }; }} e
   */
  function sanitizeEmail(e) {
    e.target.value = e.target.value.replace(/ /g, ""); // remove spaces
    email = e.target.value;
  }

  /**
   * @param {{ target: { value: string; }; }} e
   */
  function sanitizePassword(e) {
    e.target.value = e.target.value.replace(/ /g, ""); // remove spaces
    password = e.target.value;
  }
</script>

<h2 class="subtitle is-size-4 pt-4 mb-4">Let's take off...</h2>
<!-- Email Field with Icon -->
<div class="field">
  <label class="label">
    Email
    <div class="control has-icons-left">
      <!-- svelte-ignore event_directive_deprecated -->
      <input
        class="input"
        type="text"
        placeholder="Enter email"
        name="email"
        bind:value={email}
        on:input={sanitizeEmail}
      />

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
        on:input={sanitizePassword}
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
