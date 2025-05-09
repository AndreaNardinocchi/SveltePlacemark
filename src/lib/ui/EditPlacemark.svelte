<script lang="ts">
  /****************** Version 1 **********************************************************************************/
  import { placemarkService } from "./services/placemark-service";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import type { Category, Placemark } from "./types/placemark-types";
  import { loggedInUser } from "$lib/runes.svelte";

  let categoryId = "";
  let placemarkId = "";
  // svelte-ignore non_reactive_update
  let category: Category | null = null;

  let placemark: Placemark = {
    title: "",
    lat: "",
    long: "",
    address: "",
    country: "",
    phone: "",
    website: "",
    visited: "",
    description: "",
    categoryId: categoryId
  };

  onMount(async () => {
    // Split the current URL to get categoryId and placemarkId
    const pathParts = window.location.pathname.split("/");
    console.log("Path parts:", pathParts); // Log the full path to see if it's what you expect

    // Try to get categoryId and placemarkId from the URL
    categoryId = pathParts[pathParts.indexOf("category") + 1];
    placemarkId = pathParts[pathParts.indexOf("editplacemark") + 1];
    const token = loggedInUser.token;

    // Check if the values are correctly set
    console.log("categoryId:", categoryId);
    console.log("placemarkId:", placemarkId);

    // If either ID is missing, log an error, or token
    if (!categoryId || !placemarkId || !token) {
      console.error("Invalid categoryId or placemarkId", { categoryId, placemarkId });
      return; // Stop the rest of the logic if IDs are invalid
    }

    if (categoryId && placemarkId && token) {
      try {
        console.log("categoryId and placemarkId:", categoryId, placemarkId);
        // Fetch the category and placemark data
        category = await placemarkService.getCategoryById(categoryId);
        console.log("Fetched category:", category);
        console.log("This is the token:", token);

        const myPlacemark = await placemarkService.getPlacemarkById(placemarkId);
        console.log("This is myPlacemark :", myPlacemark);
        if (placemark) {
          placemark = myPlacemark;
        } else {
          console.error("Placemark not found for ID:", placemarkId);
        }
      } catch (error) {
        console.error("Error fetching placemarks:", error);
      }
    }
  });

  async function updatePlacemark(updatedPlacemark: {
    title: string;
    lat: string;
    long: string;
    address: string;
    country: string;
    phone: string;
    website: string;
    visited: string;
    description: string;
  }) {
    // Don’t fetch the placemark again — use the current form values
    const newPlacemark = await placemarkService.getPlacemarkById(placemarkId);

    console.log("This is the updated placemark: ", updatedPlacemark);

    console.log("This is the placemark returned by the database: ", newPlacemark); //  Correct object

    if (updatedPlacemark) {
      goto(`/category/${categoryId}`);
    } else {
      alert("Failed to update placemark.");
    }
  }
</script>

<!-- <script lang="ts">
  /************************************ Version 2 *****************************************/
  import { placemarkService } from "./services/placemark-service";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import type { Category, Placemark } from "./types/placemark-types";
  import { loggedInUser } from "$lib/runes.svelte";

  let categoryId = "";
  let placemarkId = "";
  // svelte-ignore non_reactive_update
  let category: Category | null = null;
  // Split the current URL to get categoryId and placemarkId
  const pathParts = window.location.pathname.split("/");
  // Try to get categoryId and placemarkId from the URL
  categoryId = pathParts[pathParts.indexOf("category") + 1];

  let placemark: Placemark = {
    title: "",
    lat: "",
    long: "",
    address: "",
    country: "",
    phone: "",
    website: "",
    visited: "",
    description: "",

    categoryId: categoryId
  };

  onMount(async () => {
    // Split the current URL to get categoryId and placemarkId
    const pathParts = window.location.pathname.split("/");
    console.log("Path parts:", pathParts); // Log the full path to see if it's what you expect

    // Try to get categoryId and placemarkId from the URL
    categoryId = pathParts[pathParts.indexOf("category") + 1];
    placemarkId = pathParts[pathParts.indexOf("editplacemark") + 1];
    const token = loggedInUser.token;

    // Check if the values are correctly set
    console.log("categoryId:", categoryId);
    console.log("placemarkId:", placemarkId);

    // If either ID is missing, log an error, or token
    if (!categoryId || !placemarkId || !token) {
      console.error("Invalid categoryId or placemarkId", { categoryId, placemarkId });
      return; // Stop the rest of the logic if IDs are invalid
    }

    if (categoryId && placemarkId && token) {
      try {
        console.log("categoryId and placemarkId:", categoryId, placemarkId);
        // Fetch the category and placemark data
        category = await placemarkService.getCategoryById(categoryId);
        console.log("Fetched category:", category);
        console.log("This is the token:", token);

        const myPlacemark = await placemarkService.getPlacemarkById(placemarkId);
        console.log("This is myPlacemark :", myPlacemark);
        if (placemark) {
          placemark = myPlacemark;
        } else {
          console.error("Placemark not found for ID:", placemarkId);
        }
      } catch (error) {
        console.error("Error fetching placemarks:", error);
      }
    }
  });

  async function updatePlacemark(placemark: Placemark) {
    const updatedPlacemark = {
      title: placemark.title,
      lat: placemark.lat,
      long: placemark.long,
      address: placemark.address,
      country: placemark.country,
      phone: placemark.phone,
      website: placemark.website,
      visited: placemark.visited,
      description: placemark.description
    };

    const success = await placemarkService.updatePlacemark(
      placemarkId,
      categoryId,
      updatedPlacemark
    );
    console.log("This is the updatedPlacemark: ", updatedPlacemark);

    if (success) {
      console.log("Placemark updated successfully");
      goto(`/category/${categoryId}`);
    } else {
      alert("Failed to update placemark.");
    }
  }
</script> -->

<div class="box mt-6">
  <label>
    Enter Placemark Details:
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label">
            Title
            <p class="control is-expanded has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Enter Title"
                bind:value={placemark.title}
              />
              <span class="icon is-small is-left">
                <i class="fa fa-plane" aria-hidden="true"></i>
              </span>
            </p>
          </label>
        </div>
        <div class="field">
          <label class="label">
            Latitude
            <p class="control is-expanded has-icons-left">
              <input
                class="input"
                type="number"
                step="any"
                placeholder="Enter Latitude"
                bind:value={placemark.lat}
              />
              <span class="icon is-small is-left">
                <i class="fas fa-compass" aria-hidden="true"></i>
              </span>
            </p>
          </label>
        </div>
        <div class="field">
          <label class="label">
            Longitude
            <p class="control is-expanded has-icons-left">
              <input
                class="input"
                type="number"
                step="any"
                placeholder="Enter longitude"
                bind:value={placemark.long}
              />
              <span class="icon is-small is-left">
                <i class="fas fa-compass" aria-hidden="true"></i>
              </span>
            </p>
          </label>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label">
            Address
            <p class="control is-expanded has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Enter our placemark address"
                bind:value={placemark.address}
              />
              <span class="icon is-small is-left">
                <i class="fa fa-address-card" aria-hidden="true"></i>
              </span>
            </p>
          </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <label class="label">
                Country
                <div class="select is-fullwidth">
                  <select
                    name="country"
                    placeholder="Select your country"
                    bind:value={placemark.country}
                  >
                    <option class="has-text-grey-light" value="" disabled selected
                      >Select your country</option
                    >
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Åland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia (Plurinational State of)"
                      >Bolivia (Plurinational State of)</option
                    >
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory"
                      >British Indian Ocean Territory</option
                    >
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cabo Verde">Cabo Verde</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Caribbean Netherlands">Caribbean Netherlands</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo, Democratic Republic of the"
                      >Congo, Democratic Republic of the</option
                    >
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Curaçao">Curaçao</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Eswatini (Swaziland)">Eswatini (Swaziland)</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and McDonald Islands"
                      >Heard Island and McDonald Islands</option
                    >
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, North">Korea, North</option>
                    <option value="Korea, South">Korea, South</option>
                    <option value="Kosovo">Kosovo</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People's Democratic Republic"
                      >Lao People's Democratic Republic</option
                    >
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libya">Libya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia North">Macedonia North</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">Micronesia</option>
                    <option value="Moldova">Moldova</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar (Burma)">Myanmar (Burma)</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn Islands">Pitcairn Islands</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Barthelemy">Saint Barthelemy</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Martin">Saint Martin</option>
                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                    <option value="Saint Vincent and the Grenadines"
                      >Saint Vincent and the Grenadines</option
                    >
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Sint Maarten">Sint Maarten</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and the South Sandwich Islands"
                      >South Georgia and the South Sandwich Islands</option
                    >
                    <option value="South Sudan">South Sudan</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania (United Republic of)"
                      >Tanzania (United Republic of)</option
                    >
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-Leste">Timor-Leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom of Great Britain and Northern Ireland"
                      >United Kingdom of Great Britain and Northern Ireland</option
                    >
                    <option value="United States of America">United States of America</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela (Bolivarian Republic of)"
                      >Venezuela (Bolivarian Republic of)</option
                    >
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label">
            Phone Number
            <div class="control has-icons-left">
              <input
                class="input"
                type="number"
                placeholder="Enter phone number"
                bind:value={placemark.phone}
              />
              <span class="icon is-small is-left">
                <i class="fa fa-phone" aria-hidden="true"></i>
              </span>
            </div>
          </label>
        </div>
        <div class="field">
          <label class="label">
            Website
            <div class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Enter webiste URL"
                bind:value={placemark.website}
              />
              <span class="icon is-small is-left">
                <i class="fa fa-info" aria-hidden="true"></i>
              </span>
            </div>
          </label>
        </div>
        <div class="field">
          <div class="control">
            <label class="label">
              Visited?
              <div class="select is-fullwidth">
                <select name="country" bind:value={placemark.visited}>
                  <option class="has-text-grey-light" value="" disabled selected
                    >Select your answer</option
                  >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <div class="control">
            <label class="label"
              >Description
              <textarea
                class="textarea"
                placeholder="Enter a description"
                bind:value={placemark.description}
              ></textarea>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6">
        {#if category && placemark}
          <button onclick={() => updatePlacemark(placemark)} class="button is-info has-text-white">
            Update your placemark
          </button>
          <a class="button is-dark has-text-white" href={`/category/${category._id}`}
            >Do not update</a
          >
        {/if}
      </div>
      <div class="column is-6">
        <p class="has-text-right">
          *Find your exact placemarks coordinates on
          <a href="https://www.gps-coordinates.net/" target="_blank" class="has-text-grey"
            >https://www.gps-coordinates.net/</a
          >
          <span class="ml-1 icon is-small">
            <i class="fas fa-solid fa-folder-open"></i>
          </span>
        </p>
      </div>
    </div>
  </label>
</div>
