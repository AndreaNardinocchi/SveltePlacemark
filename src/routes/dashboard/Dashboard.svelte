<script lang="ts">
  import type { Category } from "$lib/ui/types/placemark-types";
  import { goto } from "$app/navigation";
  import { placemarkService } from "$lib/ui/services/placemark-service";
  import { loggedInUser } from "$lib/runes.svelte";
  import { onMount } from "svelte";
  import ListCategories from "$lib/ui/ListCategories.svelte";
  import DashboardBanner from "$lib/ui/DashboardBanner.svelte";
    //import Category from "../category/[id]/Category.svelte";

  // // ✅ Use $state for reactive values
  // let categories = $state<Category[]>([]);

  // let categories: Category[] =[]

  // onMount(async () => {
  //   categories = await placemarkService.getAllCategories(loggedInUser.token);
  // });

  // let title = $state("");
  // let userid = loggedInUser._id;
  // console.log("Thi is the userid when trying to add a new category:", loggedInUser._id);
  // let notes = $state("");
  // // let img = $state("https://i.ibb.co/TBx4BWR3/collage.jpg");
  // let image = $state("");

  // ✅ Runes-style reactivity using `effect`
  // https://svelte.dev/docs/svelte/$effect and https://www.reddit.com/r/sveltejs/comments/1785b6q/when_the_effect_rune_is_supposed_to_run/
  // $effect(() => {
  //   if (title === "Restaurants") {
  //     image = "https://i.ibb.co/gZjF0ppp/jerk-pasta-recipe.png";
  //     notes =
  //       "All restaurants you would like to dine or you already had the pleasure to be in can be added and listed here. Just a handy note for your next trip.";
  //   } else if (title === "Museums") {
  //     image = "https://i.ibb.co/HD39FR6p/man-2590655-big.jpg";
  //     notes =
  //       "This is the category in which all worldwide famous museums or art galleries you wish to visit or you already visited can be added to.";
  //   } else if (title === "Beaches") {
  //     image = "https://i.ibb.co/LhrJWjcb/coast-7366616.jpg";
  //     notes =
  //       "There are surely so many beaches you would like to sunbath in and relish the sweet marine breeze caressing your skin. Why not list them all here?";
  //   } else if (title === "Parks") {
  //     image = "https://i.ibb.co/pjbvydw1/parks.jpg";
  //     notes =
  //       "Sometimes, there is no better thing to do than slipping in your running shoes for a jog in the park. Which park are you gonna go next though?";
  //   } else {
  //     image = "";
  //     notes = "";
  //   }
  // });

  let message = $state("");

  // $effect(() => {
  //   const exTitle = title; // Get the current value of title reactively
  //   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map we are passing category.title to the category when we map its array
  //   const existingTitles = categories.map((category) => category.title);

  //   // Check if the current title already exists in the categories
  //   if (existingTitles.includes(exTitle)) {
  //     message = "This category already exists. Please choose a different title.";
  //     title = ""; // Clear the title to prevent adding the same category
  //     goto("/dashboard"); // Redirect to the dashboard
  //   }
  // });

  console.log("This is the userid", loggedInUser._id, loggedInUser.email, loggedInUser.password);

  // async function addCategory() {
  //   let category: Category = {
  //     title: title,
  //     userid: userid,
  //     notes: notes,
  //     // img: img,
  //     image: image,
  //     placemarks: []
  //   };

  //   let success = await placemarkService.addCategory(category);
  //   if (success) {
  //     console.log(`You are adding the category ${category.title}`);
  //     goto("/dashboard");
  //   } else {
  //     message = "Error Trying to sign up";
  //   }
  // }
</script>

<!-- <DashboardBanner /> -->
