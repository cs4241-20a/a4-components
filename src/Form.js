import React from 'react';
import './Form.css';

//Official React documentation taught me how to handle handle inputs:
//https://reactjs.org/docs/forms.html
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addKills: 0,
            addAssists: 0,
            addDeaths: 0,
            modifyKills: 0,
            modifyAssists: 0,
            modifyDeaths: 0,
        }
        this.handleInput = this.handleInput.bind(this);
        this.handle_add = this.handle_add.bind(this);
        this.handle_modify = this.handle_modify.bind(this);
        this.handle_delete = this.handle_delete.bind(this);
    }

    handleInput(inputEvent) {
        this.setState({
            [inputEvent.target.name]: inputEvent.target.value,
        });
    }

    render() {
        return (
            <div>
                <form id="add_form">
                    <h3 className="heading">Add new stats</h3>
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label has-text-justified">Kills</label>
                        </div>
                        <div className="field-body">
                            <input name="addKills" className="field-body input is-inline" type="text" id="kills"
                                   onChange={this.handleInput}/>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label has-text-justified">Assists</label>
                        </div>
                        <div className="field-body">
                            <input name="addAssists" className="field-body input is-inline" type="text" id="assists"
                                   onChange={this.handleInput}/>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label has-text-justified">Deaths</label>
                        </div>
                        <div className="field-body">
                            <input name="addDeaths" className="field-body input is-inline" type="text" id="deaths"
                                   onChange={this.handleInput}/>
                        </div>
                    </div>
                    <button className="button is-success is-block" type="button" onClick={this.handle_add}>Add</button>
                </form>

                <hr/>

                <form id="modify_form">
                    <h3 className="heading">Modify selected row of stats</h3>
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label has-text-justified">Kills</label>
                        </div>
                        <div className="field-body">
                            <input name="modifyKills" className="field-body input is-inline" type="text" id="modify_kills"
                                   onChange={this.handleInput}/>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label has-text-justified">Assists</label>
                        </div>
                        <div className="field-body">
                            <input name="modifyAssists" className="field-body input is-inline" type="text" id="modify_assists"
                                   onChange={this.handleInput}/>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label has-text-justified">Deaths</label>
                        </div>
                        <div className="field-body">
                            <input name="modifyDeaths" className="field-body input is-inline" type="text" id="modify_deaths"
                                   onChange={this.handleInput}/>
                        </div>
                    </div>
                    <button className="button is-info is-block" type="button" onClick={this.handle_modify}>Modify</button>
                </form>

                <hr/>

                <form id="delete_form">
                    <h3 className="heading">Delete selected row of stats</h3>
                    <button className="button is-danger" type="button" onClick={this.handle_delete}>Delete</button>
                </form>
            </div>
        );
    }

    /**
     * Send an /add API HTTP request to add a new game's stats to the
     * table. The stats are taken from the "add" form in index.html.
     * The updated stats are then displayed in total_avg_results and
     * results_list tables in app.html.
     */
    handle_add() {
        //The following source showed me how to extract values from a
        //form: https://www.w3schools.com/jsref/coll_form_elements.asp
        const json = {
                "kills": this.state.addKills,
                "assists": this.state.addAssists,
                "deaths": this.state.addDeaths
            },
            body = JSON.stringify(json);

        fetch('/add', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body
        }).then(response => {
              if (response.status === 200) {
                  response.json().then(results => {
                      this.props.onDataChange(results);
                  });
              }
        });
    }

    /**
     * Send a /modify API HTTP request to modifies a game's stats by
     * setting them to the values in the "modify" form in index.html.
     * The updated stats are then displayed in total_avg_results and
     * results_list tables in index.html.
     */
    handle_modify() {
        //const input = document.getElementById("modify");
        let json = {
            "rows": [],
            "kills": this.state.modifyKills,
            "assists": this.state.modifyAssists,
            "deaths": this.state.modifyDeaths
        }

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

        let body = json;//JSON.stringify(json);
        fetch('/modify', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body
        }).then(function (response) {
            if (response.status === 200) {
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
    handle_delete() {
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
        fetch('/delete', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body
        }).then(function (response) {
            if (response.status === 200) {
                console.log("response status 200 for delete");
                //updateResults(response);
            }
        });
    }
}

export default Form;
