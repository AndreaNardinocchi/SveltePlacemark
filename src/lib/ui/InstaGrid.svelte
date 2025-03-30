<script>
// @ts-nocheck
    import { titleLandingPage } from '$lib/shared.svelte';
    import { fly } from 'svelte/transition';
    let visible = $state(true);

    let { image = "https://i.ibb.co/M66kktn/travel.jpg", 
    alt1 = "image1",
    alt2 = "image2",
    alt3 = "image3",
    alt4 = "image4",
    alt5 = "image5",
    alt6 = "image6",
    alt7 = "image7",
    alt8 = "image8",
    alt9 = "image9",
    alt10 = "image10",
    alt11 = "image11",
    alt12 = "image12",
    } = $props();

</script>


<section class="section">
  <div class="container has-text-centered">
    
      <button class="mb-6 px-6 button is-info has-text-white" on:click={() => visible = !visible}>
        {visible ? 'Hide #instaPlaceGallery' : 'Show #instaPlaceGallery'} 
      </button>
      
      {#if visible}
      <h5 class="title has-text-centered is-size-5 " in:fly={{ y: 200, duration: 500 }} out:fly={{ y: -200, duration: 500 }}>@{titleLandingPage.titleShort}</h5>
      
      <div class="columns is-multiline pt-3">
        <div class="column is-4" in:fly={{ y: 200, duration: 500 }} out:fly={{ x: 200, duration: 500 }}>
          <figure class="image">
            <img src={image} style="border-radius: 10px;" alt={alt1}>
          </figure>
        </div>
        <div class="column is-4" in:fly={{ y: 200, duration: 1000 }} out:fly={{ x: 200, duration: 1000 }}>
          <figure class="image">
            <img src="https://i.ibb.co/M66kktn/travel.jpg" style="border-radius: 10px;" alt={alt2}>
          </figure>
        </div>
        <div class="column is-4" in:fly={{ y: 200, duration: 1200 }} out:fly={{ x: 200, duration: 1200 }}>
          <figure class="image">
            <img src="https://i.ibb.co/M66kktn/travel.jpg" style="border-radius: 10px;" alt={alt3}>
          </figure>
        </div>
        <div class="column is-4" in:fly={{ y: 200, duration: 500 }} out:fly={{ x: -200, duration: 500 }}>
          <figure class="image">
            <img src="https://i.ibb.co/M66kktn/travel.jpg" style="border-radius: 10px;" alt={alt4}>
          </figure>
        </div>
        <div class="column is-4" in:fly={{ y: 200, duration: 1000 }} out:fly={{ x: -200, duration: 1000 }}>
          <figure class="image">
            <img src="https://i.ibb.co/M66kktn/travel.jpg" style="border-radius: 10px;" alt={alt5}>
          </figure>
        </div>
        <div class="column is-4" in:fly={{ y: 200, duration: 1200 }} out:fly={{ x: -200, duration: 1200 }}>
          <figure class="image">
            <img src="https://i.ibb.co/M66kktn/travel.jpg" style="border-radius: 10px;" alt={alt6}>
          </figure>
        </div>
        <div class="column is-4" in:fly={{ y: 200, duration: 500 }} out:fly={{ x: 200, duration: 500 }}>
          <figure class="image">
            <img src="https://i.ibb.co/M66kktn/travel.jpg" style="border-radius: 10px;" alt={alt7}>
          </figure>
        </div>
        <div class="column is-4" in:fly={{ y: 200, duration: 1000 }} out:fly={{ x: 200, duration: 1000 }}>
          <figure class="image">
            <img src="https://i.ibb.co/M66kktn/travel.jpg" style="border-radius: 10px;" alt={alt8}>
          </figure>
        </div>
        <div class="column is-4" in:fly={{ y: 200, duration: 1200 }} out:fly={{ x: 200, duration: 1200 }}>
          <figure class="image">
            <img src="https://i.ibb.co/M66kktn/travel.jpg" style="border-radius: 10px;" alt={alt9}>
          </figure>
        </div>
        <div class="column is-4" in:fly={{ y: 200, duration: 500 }} out:fly={{ x: -200, duration: 500 }}>
          <figure class="image">
            <img src="https://i.ibb.co/M66kktn/travel.jpg" style="border-radius: 10px;" alt={alt10}>
          </figure>
        </div>
        <div class="column is-4" in:fly={{ y: 200, duration: 1000 }} out:fly={{ x: -200, duration: 1000 }}>
          <figure class="image">
            <img src="https://i.ibb.co/M66kktn/travel.jpg" style="border-radius: 10px;" alt={alt11}>
          </figure>
        </div>
        <div class="column is-4" in:fly={{ y: 200, duration: 1200 }} out:fly={{ x: -200, duration: 1200 }}>
          <figure class="image">
            <img src="https://i.ibb.co/M66kktn/travel.jpg" style="border-radius: 10px;" alt={alt12}>
          </figure>
        </div>
      </div>
      {/if}
    </div>
    <div class ="columns has-text-centered">
      <div class ="column is-4 ">
      </div>
      <div class ="column is-4 is-offset-1 has-text-centered ">
        <div class="buttons mt-6 ">
          <a href="/category/" >
            <!-- {categoryId} -->
         <h2 class="title is-size-3 has-text-grey">Back to category →</h2> 
          </a>
        </div>
      </div>
      <div class ="column is-4 has-text-centered">
      </div>
    </div>
    
  </section>
