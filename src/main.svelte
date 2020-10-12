<script>
    import { onMount } from 'svelte';
    let table, studentForm;
    onMount(() => {
      // define variables that reference elements on our page
      //const studentsList = document.getElementById("students");
      studentForm = document.getElementById("studentForm");
      // const senseiElement = document.getElementById("sensei");
      table = document.getElementById("studentTable");
      // const classSize = document.getElementById("size");
      // const classRate = document.getElementById("totalrate");
    });

    //let studentsList = null;
    //let studentForm = null;
    let senseiElement = null;
    //let table = null;
    let classSize = null;
    let classRate = null;


    // a helper function that creates a table row for a given student
    function enrollStudent(student) {
      // Create an empty <tr> element and add it to the last position of the table:
      let row = table.insertRow(-1);
      row.style.backgroundColor = '#eee';

      // Insert new cells (<td> elements) at the 1st, 2nd, and 3rd position of the "new" <tr> element:
      let cell1 = row.insertCell(0);
      cell1.style.textAlign = 'center';
      cell1.style.padding = '10px';
      let cell2 = row.insertCell(1);
      cell2.style.textAlign = 'center';
      cell2.style.padding = '10px';
      let cell3 = row.insertCell(2);
      cell3.style.textAlign = 'center';
      cell3.style.padding = '10px';
      let cell4 = row.insertCell(3);
      cell4.style.textAlign = 'center';
      cell4.style.padding = '10px';
      let cell5 = row.insertCell(4);
      cell5.className = "buttonColumn";

      let btn = document.createElement('input');
      btn.type = "button";
      btn.value = "Remove";
      btn.className = "deleteButton";
      btn.onclick = function(){
        fetch("/delete", {
          method:"POST",
          body:JSON.stringify({id: student._id}),
          headers: {
          "Content-Type": "application/json"
          }
        })
        .then( response => response.json() )
        .then( json => {
          table.deleteRow(row.rowIndex);
          getRoster();
        })
      };
      let btn2 = document.createElement('input');
      btn2.type = "button";
      btn2.value = "Edit";
      btn2.className = "editButton";
      btn2.onclick = function(){
        if(btn2.value === "Edit"){
          row.contentEditable = true;
          btn2.value = "Submit";
          cell1.style.border = "2px dotted black";
          cell2.style.border = "2px dotted black";
          cell3.style.border = "2px dotted black";
          cell4.style.border = "2px dotted black";
        }
        else if(btn2.value === "Submit"){
          row.contentEditable = false;
          btn2.value = "Edit";
          cell1.style.border = "";
          cell2.style.border = "";
          cell3.style.border = "";
          cell4.style.border = "";

          let newStudent = updateStudent(student._id, cell1.innerText,
                        cell2.innerText, cell3.innerText, cell4.innerText);
        }
      };
      cell5.appendChild(btn2);
      cell5.appendChild(btn);

      // Add some text to the new cells:
      cell1.innerHTML = student.name;
      cell2.innerHTML = student.belt;
      cell3.innerHTML = student.age;
      cell4.innerHTML = student.record;
    }

    function submitForm(e) {
      e.preventDefault();

      // get dream value and add it to the list
      let name = studentForm.elements.name.value;
      let belt = studentForm.elements.belt.value;
      let age = studentForm.elements.age.value;
      let record = studentForm.elements.winrate.value;

      fetch("/add", {
        method:"POST",
        body:JSON.stringify({ "sensei": senseiElement,
          name, belt, age, record }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then( response => response.json() )
      .then( json => {
        enrollStudent(json);
        getRoster();
      });
      // reset form
      studentForm.reset();
      studentForm.elements.name.focus();
    }

    function getRoster(){
      fetch("/results", {
        method:"GET",
        headers: {
          "sensei": senseiElement
        }
      })
      .then( response => response.json() )
      .then( json => {
        listStudents(json);
      })
    }

    function updateStudent(id, name, belt, age, record){
        fetch("/update", {
        method:"POST",
        body:JSON.stringify({id,
          "sensei": senseiElement,
          name, belt, age, record}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then( response => response.json() )
      .then( json => {
        getRoster();
        return json;
      })
    }

    function listStudents(json){
      let winrate = 0;
      let numRows = table.rows.length-1;
      // first delete all existing rows on the user page
      for(let i=0; i<numRows; i++){
        table.deleteRow(1);
      }
      // then display all information from the database
      for(let j=0; j<json.length; j++) {
        enrollStudent(json[j]);
        winrate = winrate + Number(json[j].record);
      }
      classSize = json.length;
      winrate = winrate / json.length;
      let final = (Math.round(winrate * 1000) / 1000);
      classRate = final;
    }

    function login(e) {
      e.preventDefault();

      let sensei = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      fetch('/login', {
        method: "POST",
        body: JSON.stringify({sensei, password}),
        headers: {
          "Content-Type":"application/json"
        }
      })
              .then(async function(response) {
                if (response.status === 200) {
                  let json = await response.json();
                  let username = json.username;
                  document.title = "Dojo Roster Management";
                  document.getElementById("loginPage").hidden = true;
                  document.getElementById("mainPage").hidden = false;
                  senseiElement = username;
                  getRoster();
                }
                else {
                  window.alert("Incorrect username or password");
                }
              });
    }

    function createAccount(e) {
      e.preventDefault();

      let sensei = document.getElementById("newUsername").value;
      let password = document.getElementById("newPassword").value;

      fetch('/newaccount', {
        method: "POST",
        body: JSON.stringify({sensei, password}),
        headers: {
          "Content-Type":"application/json"
        }
      })
              .then(function(response) {
                if (response.ok) {
                  window.alert("Created new account - Now Login!");
                } else {
                  window.alert("Error occured - new account was not created");
                }
              })
    }
</script>

<div id="loginPage" style="text-align: center">
  <h2>Login</h2>
  <form>
    <div style="text-align: center">
      <label>Last Name:</label>
      <input id="username" type="text" name="username" />
    </div>
    <div>
      <label>Password:</label>
      <input id="password" type="password" name="password" />
    </div>
    <div>
      <button id="login" on:click={login}>Log In</button>
    </div>
  </form>

  <div style="margin-top: 5em">
    <h2>New Account</h2>
    <form>
      <input id="newUsername" name="username" type="text" placeholder="Last Name">
      <input id="newPassword" name="password" type="password" placeholder="Password">
      <button id="create" on:click={createAccount}>Create</button>
    </form>
  </div>
</div>

<div id="mainPage" hidden>
  <div class="grid-container">

    <div id="class-info">
      <p>
        <strong>Class Information </strong>
      </p>
      <div class="flex-span">
        <p class="col1"> <strong> Sensei: </strong> </p>
        <p id="sensei">{senseiElement}</p>
        <p class="col1"> <strong> Class Size: </strong> </p>
        <p id="size">{classSize}</p>
        <p class="col1"> <strong> Win Rate: </strong> </p>
        <p id="totalrate"> {classRate} </p>
      </div>
    </div>

    <form id="studentForm">
      <label>
        <strong>New Student Information</strong>
        <input name="name" type="text" maxlength="100" required placeholder="Full Name">
        <input name="belt" type="text" maxlength="100" placeholder="Belt Color">
        <input name="age" type="text" maxlength="100" placeholder="Age">
        <input name="winrate" type="number" min="0" pattern="^\d*(\.\d{0,2})?$"
               step="0.001" max="1" placeholder="Win %: 0.500">
      </label>
      <button type="submit" id="submitstudent" on:click={submitForm}>Enroll</button>
    </form>

  </div>

  <br>
  <section class="students">
    <p id="center">
      <strong>Student Roster</strong>
    </p>
    <hr id="line" size="5" noshade>
    <table id="studentTable">
      <tr>
        <th>Name</th>
        <th>Belt</th>
        <th>Age</th>
        <th>W/L Ratio</th>
        <th></th>
      </tr>
    </table>
  </section>
</div>

<style>
  /* this file is loaded by index.html and styles the page */

  * {
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    margin: 2em 1em;
    line-height: 1.5em;
  }

  h1 {
    font-style: italic;
    color: indigo;
    max-width: calc(100% - 5rem);
    line-height: 1.1;
  }

  .flex-span {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 5px;
    max-width: 75%;
  }

  .col1 {
    color: indigo;
  }

  .grid-container {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;
    background-color: lavender;
    padding: 10px;
  }

  #class-info {
    background-color: #eee;
    grid-column-start: 1;
    grid-column-end: 2;
    padding-left: 1em
  }

  #studentForm {
    background-color: #eee;
    display: grid;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-gap: 1em;
    padding: 1em;
  }

  #submitstudent {
    background-color: #bbbbf2;
    color: black;
    border: 2px solid currentColor;
    border-radius: .25em;
  }

  #submitstudent:hover {
    background-color: lavender;
  }

  #studentForm input {
    border: 1px solid silver;
    display: block;
    font-size: 16px;
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
  }

  #loginPage{
    width: 40%;
    margin: auto;
  }

  form input {
    border: 1px solid silver;
    display: block;
    font-size: 16px;
    padding: 5px;
    margin: auto;
    margin-bottom: 10px;
  }

  form button {
    background-color: #bbbbf2;
    color: black;
    border: 2px solid currentColor;
    border-radius: .25em;
    cursor: pointer;
    font-size: inherit;
    line-height: 1.4em;
    padding: 0.25em 1em;
    max-width: 17ch;
  }

  form button:hover {
    background-color: lavender;
  }

  #center {
    text-align: center;
  }

  ul {
    list-style-type: none;
    padding: 0;
    border: 1px solid gray;
  }

  ul li {
    padding: 8px 16px;
    border-bottom: 1px solid black;
    background: lavender
  }

  ul li:last-child {
    border-bottom: none
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  th {
    background-color: indigo;
    color: white;
  }

  .deleteButton {
    background-color: red;
    border: 2px solid currentColor;
    border-radius: .25em;
    cursor: pointer;
  }

  .editButton {
    background-color: #bbbbf2;
    border: 2px solid currentColor;
    border-radius: .25em;
    cursor: pointer;
  }

  #line {
    margin-bottom: 10px;
  }
</style>