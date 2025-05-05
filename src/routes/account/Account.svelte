<script lang="ts">
  // https://dev.to/maciekgrzybek/animate-on-scroll-with-svel
  // https://www.npmjs.com/package/svelte-inview
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import StatsAccount from "$lib/ui/StatsAccount.svelte";
</script>

<section class="section mt-6 pt-6">
  <UserDetails />
  <div class="columns mt-2">
    <div class="column is-3"></div>
    <div class="column is-6">
      <hr />
    </div>
    <div class="column is-3"></div>
  </div>
  <section class="pt-4">
    <StatsAccount />
  </section>
</section>
