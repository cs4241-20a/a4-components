import React from 'react';
//import ReactDOM from "react-dom";
import Columns from "./Columns"
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
    render() {
        return(
            <React.StrictMode>
                <h1 className="title has-text-centered">FPS Stat Calculator</h1>
                <Columns/>
            </React.StrictMode>
        )
    }

    componentDidMount() {
        /*fetch( '/results', {
            method:'GET'
        }).then(response => this.updateResults(response));*/
    }

    /**
     * Updates the contents of the total_avg_results and results_list
     * tables in index.html with the data in <b>response</b>.
     *
     * @param response an HTTP response with the data to be displayed in
     *     the total_avg_results and results_list tables in index.html
     */
    updateResults(response) {
        //Delete existing table and add a new, empty one. The following
        //source gave me the idea of swapping the tbody element of the
        //table, and showed me how to do it:
        //https://stackoverflow.com/questions/7271490/delete-all-rows-in-an-html-table
        let table = document.getElementById("results_list");
        //table.removeChild(table.children[1]);
        let tbody = table.getElementsByTagName("tbody")[0];
        let newBody = document.createElement("tbody");
        table.replaceChild(newBody, tbody);

        //The following source showed me how to extract json from the HTTP
        //response: https://developer.mozilla.org/en-US/docs/Web/API/Body/json
        response.json().then(function (data) {
            //The following source was used to learn how to insert a row into
            //a table in JS: https://www.w3schools.com/jsref/met_table_insertrow.asp
            let numRows = data.numRows;
            let rows = data.rows;
            for (let i = 0; i < numRows; i++) {
                let newRow = newBody.insertRow(i);
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = rows[i]._id;
                newRow.insertCell(0).appendChild(checkbox);

                let currentCell = newRow.insertCell(1);
                currentCell.innerHTML = `${rows[i].kills}`;
                currentCell.classList.add("has-text-centered");

                currentCell = newRow.insertCell(2);
                currentCell.innerHTML = `${rows[i].assists}`;
                currentCell.classList.add("has-text-centered");

                currentCell = newRow.insertCell(3);
                currentCell.innerHTML = `${rows[i].deaths}`;
                currentCell.classList.add("has-text-centered");

                currentCell = newRow.insertCell(4);
                currentCell.innerHTML = `${rows[i].kd_ratio}`;
                currentCell.classList.add("has-text-centered");

                currentCell = newRow.insertCell(5);
                currentCell.innerHTML = `${rows[i].ad_ratio}`;
                currentCell.classList.add("has-text-centered");
            }

            //Now updates the boxes holding the totals and averages
            document.getElementById("total_kills").innerHTML = `${data.totals.kills}`;
            document.getElementById("avg_kills").innerHTML = `${data.avgs.kills}`;
            document.getElementById("total_assists").innerHTML = `${data.totals.assists}`;
            document.getElementById("avg_assists").innerHTML = `${data.avgs.assists}`;
            document.getElementById("total_deaths").innerHTML = `${data.totals.deaths}`;
            document.getElementById("avg_deaths").innerHTML = `${data.avgs.deaths}`;
        });
    }
}

export default App;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
