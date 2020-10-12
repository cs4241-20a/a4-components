import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  if (true) {
    return (
      <>
        <NavBar />
        <MainDisplay />
      </>
    );
  }
}

function NavBar() {
  return (
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="#">Tagteam Marathon</a>
      <ul class="navbar-nav mr-auto"></ul>
      <a class="btn btn-primary" href="/auth/github">Login with GitHub</a>
    </nav>
  );
}

function MainDisplay() {
  return (
    <main role="main">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-3">Tagteam Marathon</h1>
          <p>Welcome to Tagteam Marathon!</p>
          <p>
            Tagteam Marathon is an app that helps you track how far your team has 
            run. No matter where you are or how fast you're going, you can help 
            your team run a collective marathon.
          </p>
        </div>
      </div>
      <LoginOrContent />
    </main>
  );
}

function LoginOrContent() {
  let loggedIn = false;

  if (loggedIn) {
    return (
      <Login />
    );
  }

  return (
    <div class="container" id="user-content">
      <CompletedRuns />
      <NewRunForm />
    </div>
  );
}

function Login() {
  return (
    <div class="container" id="guest-content">
      <h2>Welcome</h2>
      <p>Please sign in to continue.</p>
    </div>
  );
}

function CompletedRuns() {
  return (
    <>
      <h2>Completed Runs</h2>
      <div class="table-responsive">
        <table class="table" id="runs-table">
          <tr>
            <th>Actions</th>
            <th>Runner</th>
            <th>Location</th>
            <th>Distance (miles)</th>
            <th>Time (minutes)</th>
            <th>Speed (miles/hour)</th>
          </tr>
        </table>
      </div>
      <div class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Total Distance (miles)</th>
            <th>Marathons Run</th> 
          </tr>
          <tr>
            <td id="total-distance"></td>
            <td id="num-marathons"></td>
          </tr>
        </table>
      </div>
    </>
  );
}

function NewRunForm() {
  return (
    <div class="container">
      <h2>New Run</h2>
      <form id="new-run-form">
        
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="input-name">Your Name</label>
          </div>
          <input class="form-control" type="text" id="input-name" placeholder="ex. Jane Doe" />
        </div>
        
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="input-location">Location</label>
          </div>
          <input class="form-control" type="text" id="input-location" placeholder="ex. Bancroft Tower" />
        </div>
        
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="input-distance"> Distance </label>
          </div>
          <input class="form-control" type="number" id="input-distance" placeholder="ex. 2.75" min="0" step="0.25" />
          <div class="input-group-append">
            <span class="input-group-text">miles</span>
          </div>
        </div>
        
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="input-time"> Time </label>
          </div>
          <input class="form-control" type="number" id="input-time" placeholder="ex. 30" min="0" />
          <div class="input-group-append">
            <span class="input-group-text">minutes</span>
          </div>
        </div>

        <div class="form-group">
          <label for="input-notes">Notes</label>
          <textarea class="form-control" id="input-notes" rows="3"></textarea>
        </div>
        
        <button class="btn btn-primary" id="form-submit" type="submit">Submit Run</button>
      </form>
    </div>
  );
}

export default App;
