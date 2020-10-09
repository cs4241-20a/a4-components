<div class="" align="center">
    <h1>Sign In</h1>
    <form class="form-signin" action="/signin" method="POST">
      <div class="form-group col-sm-4" align="left">
        <label for="user">Username</label>
        <input type="text" class="form-control" id="user" aria-describedby="emailHelp">
        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
      </div>
      <div class="form-group col-sm-4" align="left">
        <label for="password" >Password</label>
        <input type="password" class="form-control" id="password" align="center">
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="check">
        <label class="form-check-label" for="check">Make new account</label>
      </div>
      <button type="submit" class="btn btn-large btn-primary" align="center">Submit</button>
    </form>
  </div>
  <p id="errorText" align="center">
  </p>
