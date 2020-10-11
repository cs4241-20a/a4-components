<script>
    const getGolfBag = function() {
      const p = fetch( '/read', {
        method:'GET' 
      })
      .then( response => response.json() )
      .then( json => {
        console.log(json)
        return json 
      })
   
      return p
    }
  
    const addGolfBag = function( e ) {
      const todo = document.querySelector('input').value
      promise = fetch( '/add', {
        method:'POST',
        body: JSON.stringify({ name:todo, completed:false }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then( response => response.json() )
    }
  
    const clearInput = function( e ) {
      e.preventDefault();
  
      const manufacturer = document.querySelector("#clubManufacturer"),
        model = document.querySelector("#clubModel"),
        type = document.querySelector("#clubType"),
        loft = document.querySelector("#clubLoft"),
        distance = document.querySelector("#clubDistance");
  
      manufacturer.value = "";
      model.value = "";
      type.value = "";
      loft.value = "";
      distance.value = "";
  
      // reset buttons
      const button = document.querySelector("#addButton");
      button.innerHTML = "Submit";
      button.onclick = addGolfBag;
  
      const clearButton = document.querySelector("#clearButton");
      clearButton.innerHTML = "Clear";
      clearButton.onclick = clearInput;
    }
  
    let promise = getGolfBag()
  </script>
  
  
  <head>
    <title>Golf Club Tracker</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/yegor256/tacit@gh-pages/tacit-css-1.5.1.min.css"/>
    <script src="script.js"></script>
  </head>
  <body>
    <div style="text-align:center;">
        <h1>Golf Club Tracker</h1>
        <h2>
          Keep track of your clubs by distance! Free estimates of your ball &
          swing speed!
        </h2>
        <button style="position:absolute;top:0;right:0;" id="logoutButton">Logout</button>
      </div>
      <br>
  
    <div class="inputForm">
      <form style="text-align:center;"  id="clubForm">
        <input type="text" id="clubManufacturer" placeholder="Manufacturer" />
        <input type="text" id="clubModel" placeholder="Model" />
        <input type="text" id="clubType" placeholder="Club Type" />
        <input type="number" id="clubLoft" placeholder="Club Loft (degrees)" />
        <input type="number" id="clubDistance" placeholder="Club Carry (yds)" />
        <button on:click={addGolfBag} id="addButton">Submit</button>
        <button on:click={clearInput} id="clearButton">Clear</button>
      </form>
    </div>
  
    {#await promise then clubs}
      <div class="grid-container">
        <div class="golfBag">
          <table>
            <thead>
              <tr>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Type</th>
                <th>Loft (degrees)</th>
                <th>Distance (yds)</th>
                <th>Ball Speed (mph)</th>
                <th>Swing Speed (mph)</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody id="clubs"></tbody>
            <tbody>
  
              {#each clubs as club}
                <tr>
                  <td>{club.manufacturer}</td>
                  <td>{club.model}</td>
                  <td>{club.type}</td>
                  <td>{club.loft}</td>
                  <td>{club.distance}</td>
                  <td>{club.ballSpeed}</td>
                  <td>{club.swingSpeed}</td>
                  <button>Edit</button>
                  <button>Delete</button>
                </tr>
              {/each}
            
            </tbody>
          </table>
        </div>
      </div>
    {/await}
  </body>
  