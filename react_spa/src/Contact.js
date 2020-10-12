import React, { Component } from "react";

var inputU = "";
var inputP = "";

class Contact extends Component {
    constructor(props) {
        super(props);
        this.load()
    }

    // load in our data from the server
    load() {

        fetch("/dreams")
            .then(response => response.json()) // parse the JSON from the server
            .then(dreams => {
                console.log(this.dreamsList)
                // remove the loading text
                document.getElementById("results").firstElementChild.remove();

                console.log(dreams);
                // iterate through every dream and add it to our page
                dreams.forEach(e => this.appendNewDream(e));
            });
    }

    appendNewDream(dream) {

        var row = document.getElementById("results").insertRow(1);
        var fn = row.insertCell(0);
        var ln = row.insertCell(1);
        var grade = row.insertCell(2);
        var accidents = row.insertCell(3);
        var dog = row.insertCell(4);
        var score = row.insertCell(5);

        var res = dream.split(" ");

        if(res.length <= 0) {
            fn.innerHTML = "No-Name-Given";
            ln.innerHTML = "No-Last-Name-Given";
            grade = "No-Data-Given";
            accidents = "No-Data-Given";
            dog = "No-Data-Given";
            score.innerHTML = "No-Grades";
        }
        else if(res.length == 1){
            fn.innerHTML = res[0];
            ln.innerHTML = "No-Last-Name-Given";
            grade.innerHTML = "No-Data-Given";
            accidents.innerHTML = "No-Data-Given";
            dog.innerHTML = "No-Data-Given";
            score.innerHTML = "No-Grades";
        }
        else if(res.length == 2){
            fn.innerHTML = res[0];
            ln.innerHTML = res[1];
            grade.innerHTML = "No-Data-Given";
            accidents.innerHTML = "No-Data-Given";
            dog.innerHTML = "No-Data-Given";
            score.innerHTML = "No-Grades";
        }
        else if(res.length == 3){
            fn.innerHTML = res[0];
            ln.innerHTML = res[1];
            grade.innerHTML = res[2];
            accidents.innerHTML = "No-Data-Given";
            dog.innerHTML = "No-Data-Given";
            score.innerHTML = "No-Grades";
        }
        else if(res.length == 4){
            fn.innerHTML = res[0];
            ln.innerHTML = res[1];
            grade.innerHTML = res[2];
            accidents.innerHTML = res[3];
            dog.innerHTML = "No-Data-Given";
            score.innerHTML = "No-Grades";
        }
        else if(res.length == 5){
            fn.innerHTML = res[0];
            ln.innerHTML = res[1];
            grade.innerHTML = res[2];
            accidents.innerHTML = res[3];
            dog.innerHTML = res[4];
            score.innerHTML = "No-Grades";
        }
        else{
            fn.innerHTML = res[0];
            ln.innerHTML = res[1];
            grade.innerHTML = res[2];
            accidents.innerHTML = res[3];
            dog.innerHTML = res[4];
            score.innerHTML = res[5];
        }
    }

    checkUandP(data) {

        if(data.length == 2){
            if(inputU == data[0] && inputP == data[1]){
                document.getElementById("hidden").style.display = "block" ;
                document.getElementById("login").style.display = "none";
            }
            else {
                alert("Incorrect username or password");
            }
        }
        else if(data.length == 3){
            if(inputU == data[0] && inputP == data[1] && "New User" == data[2]){
                alert("You have created a new account since you are the first user.");
                document.getElementById("hidden").style.display = "block" ;
                document.getElementById("login").style.display = "none";
            }
            else {
                alert("Incorrect username or password");
            }
        }
        else{
            console.log(data)
            alert("Incorrect username or password");
        }
    }

    submit(e) {
        console.log("submitting");
        // stop our form submission from refreshing the page
        e.preventDefault();
        inputU = document.getElementById("user").value;
        inputP = document.getElementById("pass").value;
        var loginInfo = document.getElementById("user").value + " " + document.getElementById("pass").value;
        console.log(loginInfo);

        fetch("/login", {
            method:'POST',
            body:JSON.stringify({ dream:loginInfo}),
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then( response => response.json() )
            .then( json => {
                this.checkUandP(json[0]);
            })
    };


    render() {
        return (
            <section class="container">
            <div id="background-new">

            </div>

            <form id="login">
            <label>
            <h3>
            Login
            </h3>
            <p>
            <i>Please enter your user information:</i>
        </p>
        <input id="user" type="text" maxlength="100" for="username" required placeholder="Username" />
            <input id="pass" type="text" maxlength="100" for="password" required placeholder="Password" />
            </label>
            <button type="submit" id="submit-dream" onClick={e => {this.submit(e)}} class="pure-button pure-button-primary">Login</button>
            </form>

            <div class="content" id="hidden">
            <h1 id="header">Your Class Roster:</h1>
        <table id="results" ref={this.dreamsList}>
            <colgroup>
            <col span="5" />
            </colgroup>
            <tr>
            <th class="title">First Name</th>
        <th class="title">Last Name</th>
        <th class="title">Grade</th>
            <th class="title"># Accidents</th>
            <th class="title">D.O.G. (Date of Graduaton)</th>
        <th class="title">Grade</th>
        </tr>
        </table>
        </div>

        </section>
    );
    }
}

export default Contact;