import React from 'react';
import './Form.css';

class Form extends React.Component {
  render(){
    return (
        <div>
            <form id="add_form">
                <h3 className="heading">Add new stats</h3>
                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label has-text-justified">Kills</label>
                    </div>
                    <div className="field-body">
                        <input className="field-body input is-inline" type="text" id="kills"/>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label has-text-justified">Assists</label>
                    </div>
                    <div className="field-body">
                        <input className="field-body input is-inline" type="text" id="assists"/>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label has-text-justified">Deaths</label>
                    </div>
                    <div className="field-body">
                        <input className="field-body input is-inline" type="text" id="deaths"/>
                    </div>
                </div>
                <button className="button is-success is-block" type="button" onClick={handle_add}>Add</button>
            </form>

            <hr />

            <form id="modify_form">
                <h3 className="heading">Modify selected row of stats</h3>
                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label has-text-justified">Kills</label>
                    </div>
                    <div className="field-body">
                        <input className="field-body input is-inline" type="text" id="modify_kills"/>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label has-text-justified">Assists</label>
                    </div>
                    <div className="field-body">
                        <input className="field-body input is-inline" type="text" id="modify_assists"/>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label has-text-justified">Deaths</label>
                    </div>
                    <div className="field-body">
                       <input className="field-body input is-inline" type="text" id="modify_deaths"/>
                    </div>
                </div>
                <button className="button is-info is-block" type="button" onClick={handle_modify}>Modify</button>
            </form>

            <hr />

            <form id="delete_form">
               <h3 className="heading">Delete selected row of stats</h3>
               <button className="button is-danger" type="button" onClick={handle_delete}>Delete</button>
            </form>
        </div>
    );
  }
}


/**
 * Send a /signin API HTTP request to log into the application with the
 * given username and password.

function handle_login(){
    //let usernameField = document.getElementById("username_input");
    //let passwordField = document.getElementById("password_input");
    let json = {
        "username": "Joseph",//usernameField.value,
        "password": "ginger0304",//passwordField.value
    }
    let body = JSON.stringify(json);
    fetch("/signin", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body
    }).then(function(response){
        if(response.headers.get("new") === "true"){
            alert("User did not exist, so a new account was created with given username and password");
        }
        window.location = response.url;
    });
}
 */

/**
 * Send an /add API HTTP request to add a new game's stats to the
 * table. The stats are taken from the "add" form in index.html.
 * The updated stats are then displayed in total_avg_results and
 * results_list tables in app.html.
 */
function handle_add(){
    console.log("in handle add!!!");
    //The following source showed me how to extract values from a
    //form: https://www.w3schools.com/jsref/coll_form_elements.asp
    const json = {
            "kills": 100,//input.elements[0].value,
            "assists": 200,//input.elements[1].value,
            "deaths": 300,//input.elements[2].value,
        },
        body = JSON.stringify(json);

    fetch( '/add', {
        method:'POST',
        headers: {"Content-Type": "application/json"},
        body
    }).then(function( response ) {
        if(response.status === 200){
            console.log("response status 200 for add");
            //updateResults(response);
        }
    });
}


/**
 * Send a /modify API HTTP request to modifies a game's stats by
 * setting them to the values in the "modify" form in index.html.
 * The updated stats are then displayed in total_avg_results and
 * results_list tables in index.html.
 */
function handle_modify(){
    //const input = document.getElementById("modify");
    let json = {
        "rows": [],
        "kills": 0,//input.elements[0].value,
        "assists": 1,//input.elements[1].value,
        "deaths": 2,//input.elements[2].value,
    }
    /*
    let table = document.getElementById("results_list").getElementsByTagName("tbody")[0];
    for(let i = 0; i < table.rows.length; i++){
        let rowItems = table.rows[i].childNodes;
        let checkbox = rowItems[0].childNodes[0];
        if(checkbox.checked){
            json.rows.push({
                id: checkbox.id,
                kills: rowItems[1].innerHTML,
                assists: rowItems[2].innerHTML,
                deaths: rowItems[3].innerHTML,
            });
        }
    }
    */
    let body = json;//JSON.stringify(json);
    fetch( '/modify', {
        method:'POST',
        headers: {"Content-Type": "application/json"},
        body
    }).then(function( response ) {
        if(response.status === 200){
            console.log("response status 200 for modify");
            //updateResults(response);
        }
    });
}

/**
 * Send a /delete API HTTP request to remove a game's stats from
 * the table. The ID# of the game to remove are taken from the
 * "delete" form in index.html The updated stats are then displayed
 * in total_avg_results and results_list tables in index.html.
 */
function handle_delete(){
    let json = {
        "rows": []
    }
    /*
    let table = document.getElementById("results_list").getElementsByTagName("tbody")[0];
    for(let i = 0; i < table.rows.length; i++){
        let rowItems = table.rows[i].childNodes;
        let checkbox = rowItems[0].childNodes[0];
        if(checkbox.checked){
            json.rows.push({
                "id": checkbox.id,
                "kills": rowItems[1].innerHTML,
                "assists": rowItems[2].innerHTML,
                "deaths": rowItems[3].innerHTML,
            });
        }
    }
    */
    let body = JSON.stringify(json);
    fetch( '/delete', {
        method:'POST',
        headers: {"Content-Type": "application/json"},
        body
    }).then(function( response ) {
        if(response.status === 200){
            console.log("response status 200 for delete");
            //updateResults(response);
        }
    });
}


export default Form;
