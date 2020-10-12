<script>
  let name = "username";
  let inputRoute = ""
  let inputDistance= ""
  let inputTime= ""
  let tableData = []
  sendAndRecieve("/load")
  
  function sendAndRecieve(action){
    console.log(action);
    let json = {
      route: inputRoute,
      time: inputTime,
      distance: inputDistance,
      fitness: inputTime * inputDistance
    },
    body = JSON.stringify(json);

  fetch(action, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body
  })
    .then(response => response.json())
    .then(json=>{
    tableData = json
    console.log(tableData)
  })
  }
  
  function btn_add(){
    //sanitize inputs here
  if (inputRoute === "") {
    alert("Please input a route");
    return false;
  }
  if (tableData.some(row => row.route === inputRoute)) {
    alert("Can't have duplicate route names");
    return false;
  }
  if (inputTime === "") {
    alert("Please input a time in minutes");
    return false;
  }
  if (inputDistance === "") {
    alert("Please input a distance in miles");
    return false;
  }

  sendAndRecieve("/add");

  }
  function btn_update(){
    //sanitize inputs here

  if (inputRoute === "") {
    alert("Please input the route");
    return false;
  }
  if (!tableData.some(row => row.route === inputRoute)) {
    alert("That route does not exist");
    return false;
  }
  if (inputTime === "") {
    alert("Please input the time in minutes");
    return false;
  }
  if (inputDistance === "") {
    alert("Please input the distance in miles");
    return false;
  }

  sendAndRecieve("/update");

  }
  function btn_delete(){
    // prevent default form action from being carried out

  //sanitize inputs here
  if (inputRoute === "") {
    alert("Please input the route");
    return false;
  }
  if (!tableData.some(row => row.route === inputRoute)) {
    alert("That route does not exist");
    return false;
  }

  sendAndRecieve("/delete");
  }
  function btn_clear(){
    inputRoute = "";
    inputTime = "";
    inputDistance = "";
    console.log(tableData)
  }
</script>

<main>
	<h1>{name}'s Training Log</h1> <hr />

    <form id="input" class="pure-form pure-form-aligned">
      <fieldset>
        <div class="pure-control-group">
          <label for="inputRoute">Route Name</label>
          <input type="text" id="inputRoute" bind:value={inputRoute} /><br />
        </div>
        <div class="pure-control-group">
          <label for="inputTime">Time (only in whole minutes)</label>
          <input type="text" id="inputTime" bind:value={inputTime} /><br />
        </div>
        <div class="pure-control-group">
          <label for="inputDistance">Distance (in miles)</label>
          <input type="text" id="inputDistance" bind:value={inputDistance} /><br />
        </div>
        <p></p>
      </fieldset>
    </form>
    <div class="pure-controls">
      <button id="add-button" class="pure-button button-add" on:click|preventDefault={btn_add}>
        Add
      </button>
      <button
        id="update-button"
        class="pure-button button-update"
        on:click|preventDefault={btn_update}
      >
        Update
      </button>
      <button id="delete-button" class="pure-button button-delete" on:click|preventDefault={btn_delete}>
        Delete
      </button>
      <button id="clear-button" class="pure-button button-clear" on:click|preventDefault={btn_clear}>
        Clear
      </button>
    </div>
    <hr />
    <table class="pure-table">
      <thead>
        <tr>
          <th>Route</th>
          <th>Time</th>
          <th>Distance</th>
          <th>Fitness Score</th>
        </tr>
      </thead>
        <tbody>
          {#each tableData as row}
            <tr>
              <td>{row.route}</td>
              <td>{row.time}</td>
              <td>{row.distance}</td>
              <td>{row.fitness}</td>
            </tr>
          {/each}
        </tbody>
    </table>
    <p></p>
    <button
      id="logout-button"
      class="pure-button button-logout"
      on:click|preventDefault={()=>window.location.replace("/logout")}
      >
      Logout
    </button>
</main>