<script>
    // Example data that you will replace with actual values or fetched data
    let accCat0 = "Category 1";
    let accCatId0 = "1";
    let accCat1 = "Category 2";
    let accCatId1 = "2";
    let accCat2 = "Category 3";
    let accCatId2 = "3";
    let accCat3 = "Category 4";
    let accCatId3 = "4";
    let createdTimeStamp = "2023-03-29";  // Example timestamp
  </script>
  
  <section class="box has-background-grey-dark">
    <section class="content p-3">
      <p class="subtitle has-text-white is-size-3 has-text-weight-bold"> - Your Categories - </p>
    </section>
  </section>
  
  <section class="box">
    <section class="content pl-4">
      <div class="columns">
        <div class="column">
          <p class="is-size-4 mb-2">
            <a href={`/category/${accCatId0}`} class="has-text-grey-light">{accCat0}</a>
          </p>
          <p class="is-size-4 mb-2">
            <a href={`/category/${accCatId1}`} class="has-text-grey-light">{accCat1}</a>
          </p>
          <p class="is-size-4 mb-2">
            <a href={`/category/${accCatId2}`} class="has-text-grey-light">{accCat2}</a>
          </p>
          <p class="is-size-4 mb-6">
            <a href={`/category/${accCatId3}`} class="has-text-grey-light">{accCat3}</a>
          </p>
          <p class="is-size-7">* If you have added any categories, they will get displayed in this box. </p>
        </div>
      </div>
    </section>
  </section>
  
  <section class="box has-background-grey-dark">
    <section class="content p-3">
      <p class="subtitle has-text-white is-size-3 has-text-weight-bold"> - About Your Account - </p>
    </section>
  </section>
  
  <section class="box">
    <section class="content pl-4">
      <div class="columns">
        <div class="column">
          <p class="is-size-6 mb-2">Created on: {createdTimeStamp}</p>
        </div>
      </div>
    </section>
  </section>
  