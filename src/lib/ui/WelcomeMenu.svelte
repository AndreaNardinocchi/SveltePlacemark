<!-- <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation" >
    <div class="navbar-brand pl-4">
      <a  href="/">
        {{> category-brand}}
      </a>
      <span class="navbar-burger" data-target="navbarMenu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      </span>
    </div>
    <div id="navbarMenu" class="navbar-menu pr-4 ">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button" id="home" href="/"> Home </a>
            <a class="button" id="login" href="/login"> Log in </a>
            <a class="button" id="signup" href="/signup"> Sign up </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <script>
    document.getElementById("{{active}}").classList.add("is-info");
 
                            document.addEventListener('DOMContentLoaded', () => {
  
        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener('click', () => {
  
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);
  
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
  
          });
        });
      });
  </script> -->

  <script>
    import CategoryBrand from "./CategoryBrand.svelte";
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
              href="/" 
              class:is-info={active === 'home'} 
              on:click={() => setActive('home')}>Home</a>
            <a 
              class="button" 
              id="login" 
              href="/login" 
              class:is-info={active === 'login'} 
              on:click={() => setActive('login')}>Log in</a>
            <a 
              class="button" 
              id="signup" 
              href="/signup" 
              class:is-info={active === 'signup'} 
              on:click={() => setActive('signup')}>Sign up</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  