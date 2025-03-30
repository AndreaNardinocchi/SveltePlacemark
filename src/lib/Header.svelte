
<script>
    import CategoryBrand from "./ui/CategoryBrand.svelte";
    let active = ""; // to track the active class on navigation buttons
    let isMenuActive = false;
  
    // To handle the active link highlight, e.g. when the page is active
    /**
     * @param {string} linkId
     */
    function setActive(linkId) {
      active = linkId;
    }
  </script>
  
  <nav class="navbar is-fixed-top" aria-label="main navigation">
    <!-- role="navigation"  -->
    <div class="navbar-brand pl-4">
      <a href="/" on:click={() => setActive('home')}>
        <!-- Assuming "category-brand" is a component or a placeholder -->
        <CategoryBrand />
      </a>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span 
        class="navbar-burger" 
        data-target="navbarMenu" 
        aria-expanded={isMenuActive ? "true" : "false"}
        on:click={() => isMenuActive = !isMenuActive}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </span>
    </div>
    
    <div id="navbarMenu" class="navbar-menu pr-4" class:is-active={isMenuActive}>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a 
              class="button" 
              id="home" 
              href="/dashboard" 
              class:is-info={active === 'home'} 
              on:click={() => setActive('home')}>Home</a>
            <a 
              class="button" 
              id="lifestyle" 
              href="/lifestyle" 
              class:is-info={active === 'lifestyle'} 
              on:click={() => setActive('lifestyle')}>Lifestyle</a>
            <a 
              class="button" 
              id="news" 
              href="/news" 
              class:is-info={active === 'news'} 
              on:click={() => setActive('news')}>News</a>
              <a 
              class="button" 
              id="about" 
              href="/about" 
              class:is-info={active === 'about'} 
              on:click={() => setActive('about')}>About</a>
            <a 
              class="button" 
              id="account" 
              href="/account" 
              class:is-info={active === 'account'} 
              on:click={() => setActive('account')}>Account</a>
            <a 
              class="button" 
              id="logout" 
              href="/logout" 
              class:is-info={active === 'logout'} 
              on:click={() => setActive('logout')}>Log out</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  