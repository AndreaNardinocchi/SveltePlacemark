<script >
    // Define the type of the prop `categories`
    export let categories = ["Restaurants", "Museums"];
  </script>
  
  <section>
    <!-- {#each categories as category (category._id)} -->
    {#each categories as category }
      <section class="columns box pt-2 mx-1 mb-5">
        <section class="column is-8">
          <div class="box-link-hover-shadow">
            <h2 class="title">
              <!-- <a href={`/category/${category._id}`} class="has-text-grey">{category.title}</a> -->
              <a href={`/category/${category}`} class="has-text-grey">{category}</a>
            </h2>
            <div class="notes">
              <div class="content card-content">
                <!-- <p class="subtitle">{category.notes}</p>
                <a href={`/category/${category._id}`} class="button" aria-label="Folder open"> -->
                    <p class="subtitle">{category}</p>
                <a href={`/category/${category}`} class="button" aria-label="Folder open">
                  <span class="icon is-small">
                    <i class="fas fa-solid fa-folder-open"></i>
                  </span>
                </a>
                <!-- <a href={`/dashboard/deletecategory/${category._id}`} class="button" aria-label="Folder delete"> -->
                <a href={`/dashboard/deletecategory/${category}`} class="button" aria-label="Folder delete">
                  <span class="icon is-small">
                    <i class="fas fa-solid fa-trash"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section class="column is-4">
          <div class="card-image">
            <!-- <a href={`/category/${category._id}`}> -->
            <a href={`/category/${category}`}>
              <figure class="image is-264x264">
                <!-- <img src={category.image} alt={category.title} style="border-radius: 10px;" /> -->
                <img src={category} alt={category} style="border-radius: 10px;" />
              </figure>
            </a>
          </div>
        </section>
      </section>
    {/each}
  </section>
  