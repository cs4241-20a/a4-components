import React from 'react';
import './App.css';

class AddButton extends React.Component {
  render(){
    return (
        <button className="AddButton" onClick={handle_add}>
          Hello world!
        </button>
    );
  }
}

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
    const input = document.getElementById("add"),
        json = {
            "kills": input.elements[0].value,
            "assists": input.elements[1].value,
            "deaths": input.elements[2].value,
        },
        body = JSON.stringify(json);

    fetch( '/add', {
        method:'POST',
        headers: {"Content-Type": "application/json"},
        body
    }).then(function( response ) {
        if(response.status === 200){
            console.log("response status 200");
            //updateResults(response);
        }
    });
}

export default AddButton;
