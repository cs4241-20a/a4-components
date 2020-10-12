import React, { useState, useEffect } from 'react';
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
  let [isLoggedIn, changeLoggedIn] = useState(false)
  let [appData, setAppData] = useState(null);

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
      <LoginOrContent appData={appData} isLoggedIn={isLoggedIn} changeLoggedIn={changeLoggedIn} setAppData={setAppData} />
    </main>
  );
}

function LoginOrContent(props) {
  function checkUser() {
    fetch('/user-existence', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(function( response ){
        if(response.userState === 'false') {
            console.log(`Created new user ${response.username}`);
            alert(`Creating new user ${response.username}. Welcome to Tagteam Marathon!`);
        } // If such a user already exists, exit silently
    });
  }

  const loadData = function() {
    fetch('/get-runs', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(parsedData => {
        if (!props.isLoggedIn){
          props.setAppData(parsedData);
          props.changeLoggedIn(!!parsedData);
        }
    });
  }

  useEffect(() => {
    checkUser();
    loadData();
  })

  if (!props.isLoggedIn) {
    return (
      <Login />
    );
  }

  return (
    <div class="container" id="user-content">
      <CompletedRuns runs={props.appData} changeLoggedIn={props.changeLoggedIn}/>
      <NewRunForm changeLoggedIn={props.changeLoggedIn}/>
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

function CompletedRuns(props) {
  let totalDist = 0;
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
          { 
            props.runs.map( (run, i) => {
              totalDist += parseInt(run.distance);
              if (true) {
                return ( <CompletedRunEntry run={run} index={i} changeLoggedIn={props.changeLoggedIn}/> );
              }
              return ( <EditableRunEntry run={run} index={i} changeLoggedIn={props.changeLoggedIn}/>);
            })
          }
        </table>
      </div>
      <div class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Total Distance (miles)</th>
            <th>Marathons Run</th> 
          </tr>
          <tr>
            <td>{ totalDist }</td>
            <td>{ (totalDist / 26.2).toFixed(2) }</td>
          </tr>
        </table>
      </div>
    </>
  );
}

function CompletedRunEntry(props) {
  return (
    <tr>
      <td>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu-${i}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Actions
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button class="dropdown-item" type="button" onclick={
                  () => {
                    fetch ('/delete-run', {
                        method: 'POST',
                        body: JSON.stringify({id: props.run._id}),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function handleDeleteRunResponse(response) {
                        if (response.status === 200) {  // OK
                            console.log(`Successfully deleted run.`);
                            props.changeLoggedIn(false);
                        } else {
                            console.error(`Failed to delete run.
                            Error: ${response.message}`);
                        }
                    });
                  }
                }>Delete Run</button>
                <button class="dropdown-item" type="button" onclick="prepareEdit(${i + 1}, '${data[i]._id}')">Edit Run</button>
                <button class="dropdown-item" type="button" onClick={
                  () => alert(props.run.notes ? props.run.notes : 'No notes exist for this run')
                  }>View Notes</button>
                <button class="dropdown-item" type="button" onClick={
                  () => {
                    let newNotes = prompt("Edit Run Notes", props.run.notes ? props.run.notes : "");
                    if(newNotes) {
                      let runToSend = {...props.run};
                      runToSend.notes = newNotes;
                      
                      fetch('/edit-run', {
                          method: 'POST',
                          body: JSON.stringify({run: runToSend, id: props.run._id}),
                          headers: {
                              "Content-Type": "application/json"
                          }
                      }).then(function handleEditRunResponse(response) {
                          if (response.status === 200) {  // OK
                              console.log(`Successfully edited run to ${JSON.stringify(runToSend)}`);
                              props.changeLoggedIn(false);  // Refresh the tables
                          } else {
                              console.error(`Failed to edit run to ${JSON.stringify(runToSend)}
                              Error: ${response.message}`);
                          }
                      });
                    }
                  }
                }>Edit Notes</button>
            </div>
        </div>
      </td>
      <td>{ props.run.name }</td>
      <td>{ props.run.location }</td>
      <td>{ props.run.distance }</td>
      <td>{ props.run.time }</td>
      <td>{ (props.run.distance * 60 / props.run.time).toFixed(2) }</td>
    </tr>
  );
}

function EditableRunEntry(props) {

}

function NewRunForm(props) {
  let [name, setName] = useState("");
  let [location, setLocation] = useState("");
  let [distance, setDistance] = useState(0);
  let [time, setTime] = useState(0);
  let [notes, setNotes] = useState("");

  return (
    <div class="container">
      <h2>New Run</h2>
      <form id="new-run-form">
        
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="input-name">Your Name</label>
          </div>
          <input class="form-control" type="text" id="input-name" placeholder="ex. Jane Doe" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="input-location">Location</label>
          </div>
          <input class="form-control" type="text" id="input-location" placeholder="ex. Bancroft Tower" value={location} onChange={(e)=>setLocation(e.target.value)} />
        </div>
        
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="input-distance"> Distance </label>
          </div>
          <input class="form-control" type="number" id="input-distance" placeholder="ex. 2.75" min="0" step="0.25" value={distance} onChange={(e)=>setDistance(e.target.value)} />
          <div class="input-group-append">
            <span class="input-group-text">miles</span>
          </div>
        </div>
        
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="input-time"> Time </label>
          </div>
          <input class="form-control" type="number" id="input-time" placeholder="ex. 30" min="0" value={time} onChange={(e)=>setTime(e.target.value)} />
          <div class="input-group-append">
            <span class="input-group-text">minutes</span>
          </div>
        </div>

        <div class="form-group">
          <label for="input-notes">Notes</label>
          <textarea class="form-control" id="input-notes" rows="3" value={notes} onChange={(e)=>setNotes(e.target.value)}></textarea>
        </div>
        
        <button class="btn btn-primary" id="form-submit" type="submit" onClick={
          () => {
            const body = {
                name: name,
                location: location,
                distance: distance,
                time: time,
                notes: notes,
            };

            fetch('/add-run', {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(function handleAddRunResponse(response) {
              if (response.status === 200) {  // OK
                console.log(`Successfully added run ${JSON.stringify(body)}`);
                props.changeLoggedIn(false);
              } else {
                console.error(`Failed to add run ${JSON.stringify(body)};
                Error: ${response.message}`);
                debugger;
              }
            });
          }
        }>Submit Run</button>
      </form>
    </div>
  );
}

export default App;
