import React, { Component } from "react";
import './Content/style.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.dreamsList = React.createRef();
        this.load()
    }

    // a helper function that creates a list item for a given dream
    appendNewDream(dream) {
        
    }

    // load in our data from the server
    load() {

        fetch("/dreams")
            .then(response => response.json()) // parse the JSON from the server
            .then(dreams => {
                console.log(this.dreamsList)
                // remove the loading text
                document.getElementById("results").firstElementChild.remove();

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

        var res = dream.split(" ");

        if(res.length <= 0) {
            fn.innerHTML = "No-Name-Given";
            ln.innerHTML = "No-Last-Name-Given";
            grade = "No-Data-Given";
            accidents = "No-Data-Given";
            dog = "No-Data-Given";
        }
        else if(res.length == 1){
            fn.innerHTML = res[0];
            ln.innerHTML = "No-Last-Name-Given";
            grade.innerHTML = "No-Data-Given";
            accidents.innerHTML = "No-Data-Given";
            dog.innerHTML = "No-Data-Given";
        }
        else if(res.length == 2){
            fn.innerHTML = res[0];
            ln.innerHTML = res[1];
            grade.innerHTML = "No-Data-Given";
            accidents.innerHTML = "No-Data-Given";
            dog.innerHTML = "No-Data-Given";
        }
        else if(res.length == 3){
            fn.innerHTML = res[0];
            ln.innerHTML = res[1];
            grade.innerHTML = res[2];
            accidents.innerHTML = "No-Data-Given";
            dog.innerHTML = "No-Data-Given";
        }
        else if(res.length == 4){
            fn.innerHTML = res[0];
            ln.innerHTML = res[1];
            grade.innerHTML = res[2];
            accidents.innerHTML = res[3];
            dog.innerHTML = "No-Data-Given";
        }
        else{
            fn.innerHTML = res[0];
            ln.innerHTML = res[1];
            grade.innerHTML = res[2];
            accidents.innerHTML = res[3];
            dog.innerHTML = res[4];
        }
    }

    // listen for the form to be submitted and add a new dream when it is
    submit(e) {
        console.log("submitting");

        e.preventDefault();

        fetch("/add", {
            method:'POST',
            body:JSON.stringify({ dream:document.querySelector("form").elements.dream.value}),
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then( response => response.json() )
            .then( json => {
                this.appendNewDream(json.dream);
            })

        // reset form
        document.querySelector("form").reset();
        document.querySelector("form").elements.dream.focus();
    };

    remove(e){

        console.log("removing");

        // stop our form submission from refreshing the page
        e.preventDefault();

        fetch("/remove", {
            method:'delete',
            body:JSON.stringify({ dream:document.getElementById("removeItem").value}),
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then( response => response.json() )
            .then( dreams => {
                var tableHeaderRowCount = 1;
                var table = document.getElementById('results');
                var rowCount = table.rows.length;
                for (var i = tableHeaderRowCount; i < rowCount; i++) {
                    table.deleteRow(tableHeaderRowCount);
                }

                // iterate through every dream and add it to our page
                dreams.forEach(this.appendNewDream);
            })

        // reset form
        document.querySelector("form").dreamsForm.reset();
        document.querySelector("form").dreamsForm.elements.dream.focus();

    };

    modify(e){

        console.log("modifying");

        var passIn = document.getElementById("mod-dream").value + " : " + document.getElementById("new-dream").value;

        // stop our form submission from refreshing the page
        e.preventDefault();

        fetch("/modify", {
            method:'POST',
            body:JSON.stringify({ dream:passIn}),
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then( response => response.json() )
            .then( dreams => {
                var tableHeaderRowCount = 1;
                var table = document.getElementById('results');
                var rowCount = table.rows.length;
                for (var i = tableHeaderRowCount; i < rowCount; i++) {
                    table.deleteRow(tableHeaderRowCount);
                }

                // iterate through every dream and add it to our page
                dreams.forEach(this.appendNewDream);
            })

        // reset form
        document.querySelector("form").reset();
        document.querySelector("form").elements.dream.focus();

    };


    render() {
        return (
            <section class="container">

            <div id="forms">
            <form>
            <label>
            <h3>
            Enroll in a class!
        </h3>
        <p>
        <i>Enter your information seperated by space(" ") charecters.</i>
        </p>
        <textarea name="dream" type="text" maxlength="100" for="enroll information" required placeholder="First-N Last-N Grade # D.O.G."></textarea>
            </label>
            <button type="submit" id="submit-dream" onClick={e => {this.submit(e)}} class="pure-button pure-button-primary">Enroll</button>
            </form>

            <form>
            <label>
            <h3>
            Drop a class!
        </h3>
        <p>
        <i>Enter your First and Last name seperated by a space(" ").</i>
        </p>
        <input id="removeItem" for="first and last name" type="text" maxlength="100" required placeholder="First-Name Last-Name" />
            </label>
            <button type="delete" id="delete-dream" onClick={e => {this.remove(e)}} class="pure-button pure-button-primary">Drop</button>
            </form>

            <form>
            <label>
            <h3>
            Modify Enrollment Information:
            </h3>
        <input name="mod-dream" id="mod-dream" type="text" onClick={e => {this.modify(e)}} for="current student information" required placeholder="First-Name Last-Name" />
            </label>
            <label>
            <p>
            Replace with:
    </p>
        <textarea name="new-dream" id="new-dream" type="text" maxlength="100" for="updated student information" required placeholder="First-N Last-N Grade # D.O.G."></textarea>
            </label>
            <button type="submit" class="pure-button pure-button-primary" id="mod-submit-dream">Update Info</button>
        </form>
        </div>
        <div id="background-new">

            </div>
            <div class="content">

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
        </tr>
        </table>
        </div>

            </section>
    );
    }
}

export default Home;