<script>
    // Define reactive variables for the form fields
    let title = '';
    let lat = '';
    let long = '';
    let address = '';
    let country = '';
    let phone = '';
    let website = '';
    let visited = '';
    let description = '';
  
    // Handle form submission
    function handleSubmit(event) {
      event.preventDefault();
  
      // Here you can handle the form data, e.g., sending it to a backend API.
      const formData = {
        title,
        lat,
        long,
        address,
        country,
        phone,
        website,
        visited,
        description
      };
  
      // Example of logging the form data (replace this with actual logic to send data)
      console.log(formData);
  
      // You could submit the form using fetch or other methods
      // fetch('/category/{category._id}/addplacemark', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: { 'Content-Type': 'application/json' }
      // });
    }
  </script>
  
  <form class="box" on:submit={handleSubmit}>
    <label>Enter Placemark Details:</label>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label">Title</label>
          <input class="input" type="text" placeholder="Enter Title" bind:value={title} />
        </div>
        <div class="field">
          <label class="label">Latitude</label>
          <input class="input" type="number" step="any" placeholder="Enter Latitude" bind:value={lat} />
        </div>
        <div class="field">
          <label class="label">Longitude</label>
          <input class="input" type="number" step="any" placeholder="Enter Longitude" bind:value={long} />
        </div>
      </div>
    </div>
  
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label">Address</label>
          <input class="input" type="text" placeholder="Enter address" bind:value={address} />
        </div>
        <div class="field">
          <label class="label">Country</label>
          <input class="input" type="text" placeholder="Enter country" bind:value={country} />
        </div>
      </div>
    </div>
  
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label">Phone Number</label>
          <input class="input" type="number" placeholder="Enter phone number" bind:value={phone} />
        </div>
        <div class="field">
          <label class="label">Website</label>
          <input class="input" type="text" placeholder="Enter website URL" bind:value={website} />
        </div>
        <div class="field">
          <label class="label">Visited?</label>
          <select class="p-2" bind:value={visited} style="font-size:100%; width: 100%; border-radius: 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.005), 0 6px 20px 0 rgba(0, 0, 0, 0.13); border-color: #d9d9d9">
            <option value="" disabled selected>Select your answer</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
    </div>
  
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <div class="control">
            <label class="label">Description</label>
            <textarea class="textarea" placeholder="Enter a description" bind:value={description}></textarea>
          </div>
        </div>
      </div>
    </div>
  
    <div class="columns">
      <div class="column is-3">
        <button class="button is-info has-text-white" type="submit">
          Add your placemark
        </button>
      </div>
      <div class="column is-9">
        <p class="has-text-right">
          *Find your exact placemarks coordinates on
          <a href="https://www.gps-coordinates.net/" target="_blank" class="has-text-grey">https://www.gps-coordinates.net/</a>
          <span class="ml-1 icon is-small">
            <i class="fas fa-solid fa-folder-open"></i>
          </span>
        </p>
      </div>
    </div>
  </form>
  