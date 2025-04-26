<script lang="ts">
  import { onMount } from "svelte";
  import imageService from "./services/image-service"; // adjust the path if needed

  let categoryId = "";
  let placemarkId = "";
  let selectedFile: File | null = null;
  let previewUrl: string | null = null;
  let fileName = "";
  let isUploading = false; // To handle upload state

  // Extract IDs once on component mount
  onMount(() => {
    const pathParts = window.location.pathname.split("/");
    categoryId = pathParts[pathParts.indexOf("category") + 1];
    placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
  });

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      selectedFile = files[0];
      fileName = selectedFile.name;

      const reader = new FileReader();
      reader.onload = () => {
        previewUrl = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  async function handleUpload() {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    isUploading = true; // Set uploading state
    const success = await imageService.uploadImage(categoryId, placemarkId, selectedFile);
    console.log("Upload success: ", success, categoryId, placemarkId, selectedFile);

    if (success) {
      alert("✅ Image uploaded successfully!");
      // Reset form after successful upload
      selectedFile = null;
      fileName = "";
      previewUrl = null;
    } else {
      alert("❌ Failed to upload image.");
    }

    isUploading = false; // Reset uploading state
  }
</script>

<div class="box p-4 pt-5 card-content">
  <div class="file has-name is-fullwidth">
    <label class="file-label">
      <input
        class="file-input"
        type="file"
        accept="image/*"
        on:change={handleFileChange}
      />
      <span class="file-cta has-text-white has-background-grey-dark">
        <span class="file-icon"><i class="fas fa-upload"></i></span>
        <span class="file-label">Choose an image…</span>
      </span>
      {#if fileName}
        <span class="file-name">{fileName}</span>
      {/if}
    </label>

    <button
      class="button is-info ml-4 has-text-white"
      on:click={handleUpload}
      disabled={!selectedFile || isUploading}
    >
      {#if isUploading}
        <span class="loader"></span> Uploading...
      {:else}
        Upload Image
      {/if}
    </button>
  </div>

  {#if previewUrl}
    <div class="mt-4">
      <img src={previewUrl} alt="Preview Image" style="max-width: 100%; display: block;" />
    </div>
  {/if}
</div>

<style>
  .loader {
    border: 2px solid transparent;
    border-top: 2px solid #fff;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>


