<script>
    let selectedFile = null;
    let fileName = "";
    let categoryImage = "";

    let category = "Restaurants";

  
    // Handle file selection
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
        body: formData,
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
            <span class="file-label">
              Choose an image…
            </span>
          </span>
          <span class="file-name">{fileName}</span>
        </label>
  
        {#if categoryImage}
          <div>
            <img id="category-image" src={categoryImage} alt="Category Image" style="max-width: 100%; margin-top: 10px;"  />
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
  </div>
  