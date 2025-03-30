<script>
    let navbarBurgers = [];

  // Function to toggle navbar menu visibility
  // @ts-ignore
    const toggleNavbar = (event) => {
    const target = event.target.dataset.target;
    const targetElement = document.getElementById(target);
    
    // Toggle 'is-active' class on the clicked burger and the target menu
    event.target.classList.toggle('is-active');
    // @ts-ignore
    targetElement.classList.toggle('is-active');
  };
  
  // Store the reference to navbar burger elements after component mount
  import { onMount } from 'svelte';
  import CategoryBrand from './ui/CategoryBrand.svelte';
  onMount(() => {
    navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));
  });
  </script>
<!-- svelte-ignore a11y_no_redundant_roles -->
<nav class="navbar mb-6 is-fixed-top " role="navigation" aria-label="account navigation">
    <div class="navbar-brand pl-4">
      <a  href="/dashboard">
        <CategoryBrand />
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
            <a id="dashboard" class="button" href="/dashboard"> Dashboard </a>
            <a class="button" id="lifestyle" href="/lifestyle"> Lifestyle </a>
            <a class="button" id="news" href="/news"> News </a>
            <a id="about" class="button" href="/about"> About </a>
            <a id="account" class="button" href="/account"> Account </a>
            <a id="logout" class="button" href="/logout"> Logout </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
