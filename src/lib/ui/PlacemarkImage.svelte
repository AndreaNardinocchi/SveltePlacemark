<script lang="ts">
  import { onMount } from "svelte";
  import imageService from "./services/image-service"; // adjust the path if needed
  import { placemarkService } from "./services/placemark-service";
  /**A dispatcher is a function created inside a Svelte component using createEventDispatcher.
   * It lets the component send custom events upward to its parent instGrid.svelte.
   * I am using it to let the instGrid.svelte component know that an image has been uploaded.
   * https://levelup.video/posts/sending-events-up-the-svelte-component-tree-with-createeventdispatcher
   * https://svelte.dev/docs/svelte/svelte#createEventDispatcher
   * */
  import { createEventDispatcher } from "svelte";

  /**Let's say an Outer component contains an Inner component, and we want an event from the Inner component
   * to be propagated to the Outer component.
   * Method: Event forwarding using dispatcher
   * https://stackoverflow.com/questions/61569655/svelte-event-forwarding-with-dispatcher-vs-passing-in-handling-function-which
   * */
  const dispatch = createEventDispatcher();

  let categoryId = "";
  let placemarkId = "";
  // Holds the file selected by the user (or null if no file is selected)
  let selectedFile: File | null = null;
  // Stores a preview URL of the selected image for displaying before upload
  let previewUrl: string | null = null;
  let fileName = "";
  let isUploading = false; // To handle upload state
  // let message = "";

  onMount(() => {
    /**
     * The below variables will enable me to retrieve tha category and placemark ids
     * https://css-tricks.com/snippets/javascript/get-url-and-url-parts-in-javascript/
     * https://www.slingacademy.com/article/isolating-file-paths-and-directories-using-javascript-string-methods-without-extracting-filename-extension/
     */
    const pathParts = window.location.pathname.split("/");
    categoryId = pathParts[pathParts.indexOf("category") + 1];
    placemarkId = pathParts[pathParts.indexOf("placemark") + 1];
  });

  // Called when the user selects a file
  // https://www.webdevtutor.net/blog/typescript-etargetfiles
  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      selectedFile = files[0];
      fileName = selectedFile.name;

      // Generating a preview using FileReader
      // https://stackoverflow.com/questions/27254735/filereader-onload-with-result-and-parameter
      // https://www.javascripttutorial.net/web-apis/javascript-filereader/
      const reader = new FileReader();
      reader.onload = () => {
        previewUrl = reader.result as string;
        console.log("This is the previewURL: ", previewUrl);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  // Called when the user clicks "Upload Image"
  async function handleUpload() {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    // Indicate that the upload is in progress
    isUploading = true;
    // Calling the uploadImage() function and passing in ids and selected file.
    const success = await imageService.uploadImage(categoryId, placemarkId, selectedFile);
    console.log("Upload success: ", success, categoryId, placemarkId, selectedFile);

    if (success) {
      await placemarkService.refreshPlacemarksInfo();
      // Dispatching the event to the InstaGrid.svelte component that the image upload is successfull
      dispatch("uploaded");
      selectedFile = null;
      fileName = "";
      previewUrl = null;
    } else {
      alert("We could not upload your image! ");
    }

    isUploading = false; // Reset uploading state
  }
</script>

<div class="box p-4 pt-5 card-content">
  <div class="file has-name is-fullwidth">
    <label class="file-label">
      <!-- svelte-ignore event_directive_deprecated -->
      <input class="file-input" type="file" accept="image/*" on:change={handleFileChange} />
      <span class="file-cta has-text-white has-background-grey-dark">
        <span class="file-icon"><i class="fas fa-upload"></i></span>
        <span class="file-label">Choose an image…</span>
      </span>
      {#if fileName}
        <span class="file-name">{fileName}</span>
      {/if}
    </label>

    <!-- svelte-ignore event_directive_deprecated -->
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
      <!-- svelte-ignore a11y_img_redundant_alt -->
      <img src={previewUrl} alt="Preview Image" style=" max-width: 30%; display: block;" />
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
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
