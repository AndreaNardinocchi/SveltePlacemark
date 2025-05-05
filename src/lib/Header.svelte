<script>
  import CategoryBrand from "./ui/CategoryBrand.svelte";
  import { loggedInUser } from "./runes.svelte";

  // Add a function to toggle the menu visibility
  let isMenuActive = false;

  const toggleMenu = () => {
    isMenuActive = !isMenuActive;
  };
</script>

<nav class="navbar is-fixed-top px-1" aria-label="main navigation">
  <div class="navbar-brand">
    <a href="/dashboard">
      <CategoryBrand />
    </a>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span class="navbar-burger" data-target="navbarMenu" on:click={toggleMenu}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </span>
  </div>

  <!-- Toggle mobile menu visibility based on isMenuActive -->
  <div id="navbarMenu" class="navbar-menu" class:is-active={isMenuActive}>
    <!-- Conditional class -->
    <div class="navbar-end">
      <a class="navbar-item" id="dashboard" href="/dashboard">Home</a>
      <a class="navbar-item" id="lifestyle" href="/lifestyle">Lifestyle</a>
      <a class="navbar-item" id="news" href="/news">News</a>
      <a class="navbar-item" id="about" href="/about">About</a>
      <a class="navbar-item" id="account" href="/account">Account</a>
      <a class="navbar-item" id="logout" href="/logout">
        Logout <span class="is-size-7">[{loggedInUser.name}]</span>
      </a>
    </div>
  </div>
</nav>

<style>
  /* The following CSS rules will enable the menu to properly work for screen smaller than 768px
https://www.codingeasypeasy.com/blog/create-a-responsive-navigation-bar-html-css-and-javascript-examples */
  /* Initially hide the menu on smaller screens */
  .navbar-menu {
    display: none;
  }

  .navbar-menu.is-active {
    display: block; /* Show the menu when is-active is applied */
  }

  /* Styles for larger screens */
  @media (min-width: 768px) {
    .navbar-menu {
      display: flex !important;
    }
    .navbar-burger {
      display: none;
    }
  }
</style>
