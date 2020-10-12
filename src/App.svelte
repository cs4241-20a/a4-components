<script>
  // figure out what to display
  var loggedIn = false;
  
  window.onload = function() {
     // check if logged in
    console.log("the window on load ran")
    fetch('/checkLogin', {
          method:'GET'
      })
      .then(function(response){
        return response.json(); 
      })
      .then( json => {
          console.log(json)
          if (json.loggedIn === "true") {
            loggedIn = true;
          }
          else {
            // hide login and show table
            console.log("user not logged in")
            document.getElementById("login").hidden = false;  
          }
    })
    
    return false;
  }
  
  $: if (loggedIn) {
    // hide login and show table
    console.log("user logged in")
    document.getElementById("login").hidden = true;
    document.getElementById("main").hidden = false;
  }
  
  // handle login
  const performLogin = function( e ) {
      e.preventDefault();

      fetch('/login', {
          method:'GET'
      })
      .then( response => response.json() )
      .then( url => {
          // check if logged in properly
          fetch('/checkLogin', {
                method:'GET'
            })
            .then( response => response.text() )
            .then( text => {
                if (text === "logged in") {
                  loggedIn = true;
                }
          })
        window.location.href=url
      })

      return false;
  }
  // handle logout
  const logout = function(e) {
    e.preventDefault();

    fetch("/logout", {
      method: "GET"
    }).then(url => {
      window.location.href = "/";
    });
    
    loggedIn = false;
    
    // show login screen
    console.log("user not logged in")
    document.getElementById("login").hidden = false;
    document.getElementById("main").hidden = true;

    return false;
  };
  
  
  // handle everything else
  const clear = function(e) {
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
    button.onclick = submit;

    const clearButton = document.querySelector("#clearButton");
    clearButton.innerHTML = "Clear";
    clearButton.onclick = clear;
  };

  const retrieveInput = function() {
    console.log("Some version of submit hit");
    // create json listing of input params
    const manufacturer = document.querySelector("#clubManufacturer"),
      model = document.querySelector("#clubModel"),
      type = document.querySelector("#clubType"),
      loft = document.querySelector("#clubLoft"),
      distance = document.querySelector("#clubDistance"),
      json = {
        manufacturer: manufacturer.value,
        model: model.value,
        type: type.value,
        loft: Number(loft.value).toFixed(1),
        distance: Number(distance.value).toFixed(1),
        ballSpeed: (distance.value / 1.75).toFixed(1),
        swingSpeed: (distance.value / 1.75 / 1.5).toFixed(1)
      };

    // check for empty values
    for (const [key, value] of Object.entries(json)) {
      if (typeof value === 'string' && value === "") {
        console.warn("Must specify value for " + key + "!");
        return false;
      }
    }


    // verify distance and loft are numbers
    if (isNaN(loft.value)) {
      console.warn("Loft must be a number!");
      return false;
    }
    if (isNaN(distance.value)) {
      console.warn("Distance must be a number!");
      return false;
    }

    return JSON.stringify(json);
  };

  const submit = function(e) {
    // prevent default form action from being carried out
    e.preventDefault();

    // retrieve input
    const json = retrieveInput();

    // verify json is valid
    if (!json) {
      // don't clear invalid requests
      return false;
    }

    // add to server and update promise
    promise = fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json
    })
    .then(response => response.json());

    // clear inputs now that we have retrieved them
    clear(e);
    return false;
  };

  const submitEdits = function(dataID) {
    // retrieve input
    const json = retrieveInput();

    // verify json is valid
    if (!json) {
      return;
    }

    var object = JSON.parse(json);
    object._id = dataID;
    const body = JSON.stringify(object)

    console.log("trying to post edit")
    
    // add to server and update promise
    promise = fetch("/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body
    }).then(response => response.json());

    return false;
  };
  
  const edit = function(dataID) {  
    var element = null;
    
    // get fields
    fetch("/golfbagItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({_id: dataID})
    }).then(function(response) {
        return response.json(); // wait on response
    }).then(function(array) {
        console.log(array)
        element = array[0];
      
        const manufacturer = document.querySelector("#clubManufacturer"),
          model = document.querySelector("#clubModel"),
          type = document.querySelector("#clubType"),
          loft = document.querySelector("#clubLoft"),
          distance = document.querySelector("#clubDistance");

        manufacturer.value = element.manufacturer;
        model.value = element.model;
        type.value = element.type;
        loft.value = element.loft;
        distance.value = element.distance;

        // change submit button to become "update field"
        const button = document.querySelector("#addButton");
        button.innerHTML = "Update";
        button.onclick = function(e) {
          e.preventDefault(); //prevent reload
          submitEdits(dataID); //submit edits
          clear(e); //clear the inputs and reset buttons
        };

        const clearButton = document.querySelector("#clearButton");
        clearButton.innerHTML = "Cancel";
    });

    return false;
  };
  
  const deleteFunc = function(dataID) {
    // remove entry from database
    promise = fetch("/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: dataID })
    }).then(response => response.json());

    // now that item is deleted, it can't be edited
    // handle weird edge case of deleting item while editing it
    const clearButton = document.querySelector("#clearButton");
    if (clearButton.innerHTML === "Cancel") {
      clearButton.click();
    }

    return false;
  };
  
    const getGolfBag = function() {
      const p = fetch( '/golfBag', {
        method:'GET' 
      })
      .then( response => response.json() )
      .then( json => {
        console.log(json)
        return json 
      })
   
      return p
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
      button.onclick = submit;
  
      const clearButton = document.querySelector("#clearButton");
      clearButton.innerHTML = "Clear";
      clearButton.onclick = clearInput;
    }
  
    let promise = getGolfBag()
  </script>
  
<div id="login" hidden="true">
  <head>
      <title>Golf Club Tracker - Login</title>
      <meta charset="utf-8">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/yegor256/tacit@gh-pages/tacit-css-1.5.1.min.css"/>
      <script src="login.js" defer></script>
  </head>

  <body>
      <section>
          <div class="centeredItem">
              <div style="text-align:center;" id="content-wrapper">
                  <h1 style="font-size:400%;" id="loginTitle">Golf Club Tracker</h1>
                  <br>
                  <button on:click={performLogin} style="font-size:200%; color:blue;" id="loginButton">Login via GitHub</button>
              </div>
          </div>
      </section>
  </body>
</div>


<div id="main" hidden="true">
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
          Keep track of your clubs! Free estimates of your ball & swing speed!
        </h2>
        <button on:click={logout} style="position:absolute;top:0;right:0;" id="logoutButton">Logout</button>
      </div>
      <br>
  
    <div class="inputForm">
      <form style="text-align:center;"  id="clubForm">
        <input type="text" id="clubManufacturer" placeholder="Manufacturer" />
        <input type="text" id="clubModel" placeholder="Model" />
        <input type="text" id="clubType" placeholder="Club Type" />
        <input type="number" id="clubLoft" placeholder="Club Loft (degrees)" />
        <input type="number" id="clubDistance" placeholder="Club Carry (yds)" />
        <button on:click={submit} id="addButton">Submit</button>
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
                  <button on:click={edit(club._id)}>Edit</button>
                  <button on:click={deleteFunc(club._id)}>Delete</button>
                </tr>
              {/each}
            
            </tbody>
          </table>
        </div>
      </div>
    {/await}
  </body>
</div>
  