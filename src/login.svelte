<script>
  export let userName = null;

  function signIn(e) {
    e.preventDefault()

    console.log(window.location.hostname)
    console.log(document.getElementById("user").value)
    fetch("/signin", {
      method: "POST",
      body: JSON.stringify({ user: document.getElementById("user").value,
                            password: document.getElementById("password").value,
                           check: document.getElementById("check").checked }),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json.value)
      if(json.value == true) {
        console.log("Sending to new page!")
        userName = document.getElementById("user").value
        console.log(userName)
        location.reload()
      }
      else if (json.value == false) {
        var display = document.getElementById("errorText")
        display.innerHTML = "Wrong Password! Try Again."
      }
      else {
        var display = document.getElementById("errorText")
        display.innerHTML = "User does not exist. Make a new account!"
      }
    })
  }

  function sendToTasks(signedIn) {
    if(signedIn == true)
      window.location = '/signin'
  }
</script>

<div class="" align="center">
  <h1>Sign In</h1>
  <form class="form-signin" action="/signin" method="POST">
    <div class="form-group col-sm-4" align="left">
      <label for="user">Username</label>
      <input type="text" class="form-control" id="user" aria-describedby="emailHelp">
    </div>
    <div class="form-group col-sm-4" align="left">
      <label for="password" >Password</label>
      <input type="password" class="form-control" id="password" align="center">
    </div>
    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="check">
      <label class="form-check-label" for="check">Make new account</label>
    </div>
    <button type="submit" class="btn btn-large btn-primary" align="center" on:click={signIn}>Submit</button>
  </form>
</div>
<p id="errorText" align="center">
</p>

<style>
  #errorText {
    color: red;
    margin-top: 20px;
  }
</style>
