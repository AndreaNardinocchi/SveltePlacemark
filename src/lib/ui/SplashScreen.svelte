<script>
  import HomepageCategoryCard from "./HomepageCategoryCard.svelte";
  import HomepageTextCard from "./HomepageTextCard.svelte";
</script>

<section class="hero is-fullheight is-default is-bold">
  <div class="hero-head"></div>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="columns is-vcentered mt-6"></div>
      <main class="columns mb-4 mt-3">
        <div class="column is-6">
          <HomepageCategoryCard />
        </div>
        <div class="column is-6 mt-6">
          <h1 class="title is-2 mb-5">
            <span class="icon mr-5"><i class="fas fa-map-marker-alt"></i></span><span
              class="icon mr-4"><i class="fas fa-plane"></i></span
            >
            <p>PlaceMark</p>
          </h1>
          <h2 class="subtitle is-4 mt-2">Add your next journey!</h2>
          <p class="has-text-centered">
            <a class="button is-medium" href="/signup">
              <span class="icon"><i class="fas fa-map-marker-alt"></i></span><span>Sign Up</span>
            </a>
            <a class="button is-medium is-info has-text-white" href="/login">
              <span class="icon"
                ><i class="fas fa-plane" aria-hidden="true" style="color: #ffffff;"></i>
              </span><span>Login</span>
            </a>
          </p>
        </div>
      </main>
      <!-- Second Placemark Section Starts Here -->
      <main class="columns mb-4">
        <div class="column is-6 mt-6">
          <HomepageTextCard />
        </div>
        <div class="column is-6">
          <HomepageCategoryCard
            image="{'https://i.ibb.co/xK9dvTd1/museum.jpg'},"
            alt="{'museum'},"
            category={"Museums"}
          />
        </div>
      </main>
      <!-- Second Placemark Section Ends Here -->
      <main class="columns mb-4">
        <div class="column is-6">
          <HomepageCategoryCard
            image="{'https://i.ibb.co/pBN2Xs9y/park.jpg'},"
            alt="{'park'},"
            category={"Parks"}
          />
        </div>
        <div class="column is-6 mt-6">
          <HomepageTextCard
            image="{'https://i.ibb.co/LhhGK9Qg/airplane1.png'},"
            text={"...and to place your mark on your next..."}
          />
        </div>
      </main>
      <!-- Second Placemark Section Starts Here -->
      <main class="columns">
        <div class="column is-6 mt-6">
          <HomepageTextCard
            image="{'https://i.ibb.co/n8cmdzcS/aircraft.png'},"
            text={"...wonderful journey!"}
          />
        </div>
        <div class="column is-6">
          <HomepageCategoryCard
            image="{'https://i.ibb.co/BKnZdnxF/beach.jpg'},"
            alt="{'beach'},"
            category={"Beaches"}
          />
        </div>
      </main>
    </div>
  </div>
</section>
