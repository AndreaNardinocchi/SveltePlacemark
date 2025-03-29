<script lang="ts">
    // https://www.npmjs.com/package/svelte-fa
    import Fa from 'svelte-fa'
    import { faPlane } from '@fortawesome/free-solid-svg-icons'
    let { header = "Log in", label1 = "Email", label2="Password", title="PlaceMark", subtitle="Place your mark on your next journey!" } = $props();

</script>
<section class="section mt-6">
  <h1 class="title pt-4 pb-6">{header}</h1>
<section class="columns">
<section class = "column is-6 mt-5 pt-5 pr-5">
  <form action="/authenticate" method="POST">
    <div class="field control has-icons-left">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label class="label">{label1}</label> <input class="input" type="text" placeholder="Enter email" name="email">
      <span class="icon is-small is-left">
          <!-- <Fa style="font-size: 20px;" icon={faEnvelope} /> -->
          <i class="fa fa-envelope"></i>
      </span>  
  </div>
    <div class="field control has-icons-left">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label class="label">{label2}</label> <input class="input" type="password" placeholder="Enter Password" name="password">
      <span class="icon is-small is-left">
          <i class="fa fa-key"></i>
      </span>
  </div>
    <div class="field is-grouped">
      <button class="button is-info has-text-white">Submit</button>
    </div>
  </form>
</section>
<section class="column is-6 px-4">
  <section  class="image has-text-centered">
      <Fa style="font-size: 160px; color: #000000;" icon={faPlane} />
    <!-- <i class="fas fa-plane fa-10x" style="color: #000000;"></i> -->
  </section>
  <p class="title is-size-1 mt-3 pl-4">{title}</p>
  <p class="subtitle has-text-weight-bold pl-4">{subtitle}</p>
</section>
</section>
</section> 