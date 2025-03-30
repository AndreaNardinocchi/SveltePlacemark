<script>
    // Defining category and placemarks as mock data
    export let category = {
      _id: '123',
      placemarks: [
        {
          _id: '1',
          title: 'Eiffel Tower',
          lat: 48.8584,
          long: 2.2945,
          address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
          phone: '+33 892 70 12 39',
          country: 'France',
          website: 'https://www.toureiffel.paris/',
          description: 'An iconic landmark in Paris, France.',
          visited: 'Yes'
        },
        {
          _id: '2',
          title: 'Great Wall of China',
          lat: 40.4319,
          long: 116.5704,
          address: 'Huairou, China',
          phone: '+86 10 6162 1551',
          country: 'China',
          website: 'https://www.thegreatwallofchina.com/',
          description: 'A series of fortifications made of various materials.',
          visited: 'No'
        },
        {
          _id: '3',
          title: 'Statue of Liberty',
          lat: 40.6892,
          long: -74.0445,
          address: 'New York, NY 10004, United States',
          phone: '+1 212-363-3200',
          country: 'United States',
          website: 'https://www.nps.gov/stli/index.htm',
          description: 'A colossal neoclassical sculpture on Liberty Island.',
          visited: 'Yes'
        }
      ]
    };
  </script>
  
  <!-- Each placemark will be shown here -->
  {#each category.placemarks as placemark}
    <div class="card has-text-dark-grey">
      <header class="card-header has-text-centered">
        <p class="card-header-title">
          <a href={`/category/${category._id}/placemark/${placemark._id}`} class="has-text-grey">
            {placemark.title}
          </a>
        </p>
        <p class="has-text-right mt-4"><i class="fas fa-solid fa-plane"></i></p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="columns">
            <div class="column is-3">
              <p><span class="has-text-weight-bold">Placemark Name:</span><br>{placemark.title}</p>
              <p><span class="has-text-weight-bold">Geolocation (lat/long):</span><br> {placemark.lat} / {placemark.long}</p>
              <p><span class="has-text-weight-bold">Address:</span><br> {placemark.address}</p>
              <p><span class="has-text-weight-bold">Phone number:</span><br> {placemark.phone}</p>
            </div>
            <div class="column is-5 pr-5 pb-4">
              <p><span class="has-text-weight-bold">Country:</span><br> {placemark.country}</p>
              <p><span class="has-text-weight-bold">Website:</span><br>
                <span style="word-wrap: break-word;">
                  <a href={placemark.website} target="_blank" class="has-text-grey">{placemark.website}</a>
                </span>
              </p>
              <p><span class="has-text-weight-bold">Description:</span><br> {placemark.description}</p>
              <p><span class="has-text-weight-bold">Visited:</span> {placemark.visited}</p>
            </div>
            <div class="column is-4">
              <p><span class="has-text-weight-bold">Map Placeholder:</span><br></p>
              <iframe 
                class="mt-2"
                title={placemark.title}
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19694.431967599397!2d-8.4167813!3d51.901040949999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48449bee2f866ab1%3A0x4b0e792b7b212ab7!2sDistrict%20Health%20%26%20Leisure!5e0!3m2!1sen!2sie!4v1739290933254!5m2!1sen!2sie`}
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                height="200"
                style="border:0; white; box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);border-radius: 15px;"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href={`/category/${category._id}/editplacemark/${placemark._id}`} class="button card-footer-item" aria-label="edit icon">
          <span class="icon is-small">
            <i class="fas fa-solid fa-edit"></i>
          </span>
        </a>
        <a href={`/category/${category._id}/deleteplacemark/${placemark._id}`} class="button card-footer-item" aria-label="delete icon">
          <span class="icon is-small">
            <i class="fas fa-solid fa-trash"></i>
          </span>
        </a>
      </footer>
    </div>
  {/each}
  