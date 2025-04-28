<!-- <script lang="ts">



  /**
   * @type {string | Blob | null}
   */
  let selectedFile = null;
  let fileName = "";
  let categoryImage = "";

  let category = "Restaurants";

  // Handle file selection
  /**
   * @param {{ target: { files: string | any[]; }; }} event
   */
  function handleFileChange(event) {
    if (event.target.files.length > 0) {
      selectedFile = event.target.files[0];
      fileName = selectedFile.name;

      // Read the file as a data URL for preview
      const reader = new FileReader();
      reader.onload = () => {
        categoryImage = reader.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    // You can use fetch to submit the form with the selected file
    const formData = new FormData();
    formData.append("imagefile", selectedFile);

    // Replace with your API endpoint and submit logic
    fetch(`/category/${category._id}/uploadimage`, {
      method: "POST",
      body: formData
    });
  }
</script>

<div class="box p-4 pt-5 card-content">
  <form on:submit={handleSubmit} enctype="multipart/form-data">
    <div id="file-select" class="file has-name is-fullwidth">
      <label class="file-label">
        <input
          class="file-input"
          name="imagefile"
          type="file"
          accept="image/png, image/jpeg"
          on:change={handleFileChange}
        />
        <span class="file-cta has-text-white has-background-grey-dark">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label"> Choose an image… </span>
        </span>
        <span class="file-name">{fileName}</span>
      </label>

      {#if categoryImage}
        <div>
          <img
            id="category-image"
            src={categoryImage}
            alt="Category Image"
            style="max-width: 100%; margin-top: 10px;"
          />
        </div>
      {/if}

      <button type="submit" class="button is-info ml-4 has-text-white" disabled={!selectedFile}>
        Upload image
      </button>

      <a href={`/category/${category._id}/deleteimage`} class="button ml-2" aria-label="trash icon">
        <span class="icon is-small">
          <i class="fas fa-solid fa-trash"></i>
        </span>
      </a>
    </div>
  </form>
</div> -->
<!-- <script lang="ts">
  import { placemarkService } from "./services/placemark-service";
  import type { Category } from "./types/placemark-types";

  let selectedFile: File | null = null;
  let fileName = "";
  let categoryImage: string | ArrayBuffer | null = null;

  const pathParts = window.location.pathname.split("/");
  const categoryId = pathParts[pathParts.indexOf("category") + 1];
  console.log("This is the categoryId on CategoryImage: ", categoryId);

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      selectedFile = target.files[0];
      fileName = selectedFile.name;

      const reader = new FileReader();
      reader.onload = () => {
        categoryImage = reader.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (!selectedFile || !categoryId) return;

    const uploadedUrl = await placemarkService.uploadCategoryImage(categoryId, selectedFile);
    console.log("This is the uploadedUrl: ", uploadedUrl);
    if (uploadedUrl) {
      const category = await placemarkService.getCategoryById(categoryId);
      if (category) {
        console.log("✅ Image uploaded:", uploadedUrl);
        categoryImage = uploadedUrl;
        category.img = uploadedUrl;
      }
    } else {
      console.error("❌ Image upload failed.");
    }
  }

  async function handleDelete() {
    if (!categoryId) return;

    const category = await placemarkService.getCategoryById(categoryId);
    if (!category) return;

    const success = await placemarkService.deleteCategoryImage(categoryId);

    if (success) {
      console.log("🗑️ Image deleted.");
      categoryImage = null;
      selectedFile = null;
      fileName = "";
      category.img = "";
    } else {
      console.error("❌ Failed to delete image.");
    }
  }
</script>

<div class="box p-4 pt-5 card-content">
  <form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
    <div id="file-select" class="file has-name is-fullwidth">
      <label class="file-label">
        <input
          class="file-input"
          name="imagefile"
          type="file"
          accept="image/png, image/jpeg"
          on:change={handleFileChange}
        />
        <span class="file-cta has-text-white has-background-grey-dark">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label"> Choose an image… </span>
        </span>
        <span class="file-name">{fileName}</span>
      </label>

      {#if categoryImage}
        <div>
          svelte-ignore a11y_img_redundant_alt
          <img
            id="category-image"
            src={categoryImage as string}
            alt="Category Image"
            style="max-width: 100%; margin-top: 10px;"
          />
        </div>
      {/if}

      <button type="submit" class="button is-info ml-4 has-text-white" disabled={!selectedFile}>
        Upload image
      </button>

      <button type="button" class="button ml-2" on:click={handleDelete} aria-label="trash icon">
        <span class="icon is-small">
          <i class="fas fa-solid fa-trash"></i>
        </span>
      </button>
    </div>
  </form>
</div> -->

<script lang="ts">
  import { placemarkService } from "./services/placemark-service";
  import type { Category } from "./types/placemark-types";

  let selectedFile: File | null = null;
  let fileName = "";
  let categoryImage: string | null = null;
  let isUploading = false;
  let isDeleting = false;

  // Extract categoryId from URL path
  const pathParts = window.location.pathname.split("/");
  const categoryId = pathParts[pathParts.indexOf("category") + 1];

  console.log("This is the categoryId on CategoryImage: ", categoryId);

  // Initial fetch of image (optional, for displaying existing image)
  async function loadCategoryImage() {
    if (!categoryId) return;
    const category = await placemarkService.getCategoryById(categoryId);
    if (category?.img) {
      categoryImage = category.img;
    }
  }

  loadCategoryImage();

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      selectedFile = target.files[0];
      fileName = selectedFile.name;

      const reader = new FileReader();
      reader.onload = () => {
        categoryImage = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (!selectedFile || !categoryId) return;

    isUploading = true;

    const success = await placemarkService.uploadCategoryImage(categoryId, selectedFile);
    if (success) {
      const category = await placemarkService.getCategoryById(categoryId);
      if (category?.img) {
        console.log("✅ Image uploaded!");
        categoryImage = category.img;
        fileName = "";
        selectedFile = null;
      }
    } else {
      console.error("❌ Image upload failed.");
    }

    isUploading = false;
  }

  async function handleDelete() {
    if (!categoryId) return;

    const confirmDelete = confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;

    isDeleting = true;

    const success = await placemarkService.deleteCategoryImage(categoryId);
    if (success) {
      console.log("🗑️ Image deleted.");
      categoryImage = null;
      selectedFile = null;
      fileName = "";
    } else {
      console.error("❌ Failed to delete image.");
    }

    isDeleting = false;
  }
</script>

<div class="box p-4 pt-5 card-content">
  <form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
    <div id="file-select" class="file has-name is-fullwidth">
      <label class="file-label">
        <input
          class="file-input"
          name="imagefile"
          type="file"
          accept="image/png, image/jpeg"
          on:change={handleFileChange}
        />
        <span class="file-cta has-text-white has-background-grey-dark">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label"> Choose an image… </span>
        </span>
        <span class="file-name">{fileName}</span>
      </label>

      {#if categoryImage}
        <div>
          <!-- svelte-ignore a11y_img_redundant_alt -->
          <img src={categoryImage} alt="Category Image" class="preview-img" />
        </div>
      {/if}

      <button type="submit" class="button is-info ml-4 has-text-white" disabled={!selectedFile}>
        Upload image
      </button>

      <button type="button" class="button ml-2" on:click={handleDelete} aria-label="trash icon">
        <span class="icon is-small">
          <i class="fas fa-solid fa-trash"></i>
        </span>
      </button>
    </div>
  </form>
</div>

<style>
  .preview-img {
    max-width: 100%;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
