import React from 'react';
import './Form.css';

//Official React documentation taught me how to handle handle inputs:
//https://reactjs.org/docs/forms.html

/**
 * Component for forms to add, modify and delete stats for the current user.
 */
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addKills: "",
            addAssists: "",
            addDeaths: "",
            modifyKills: "",
            modifyAssists: "",
            modifyDeaths: "",
        }
        this.handleInput = this.handleInput.bind(this);
        this.handle_add = this.handle_add.bind(this);
        this.handle_modify = this.handle_modify.bind(this);
        this.handle_delete = this.handle_delete.bind(this);
    }

    /**
     * Handle the input for the add and modify forms, updating the 
     * corresponding state variables appropriately
     */
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
                      this.props.onDataChange({
                          numRows: results.numRows,
                          rows: results.rows,
                          totals: results.totals,
                          avgs: results.avgs,
                          selectedRows: []
                      });
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
            "rows": this.props.selectedRows,
            "kills": this.state.modifyKills,
            "assists": this.state.modifyAssists,
            "deaths": this.state.modifyDeaths
        }
        let body = JSON.stringify(json);
        console.log("body: " +body);
        fetch('/modify', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body
        }).then(response => {
            if (response.status === 200) {
                response.json().then(results => {
                    this.props.onDataChange({
                        numRows: results.numRows,
                        rows: results.rows,
                        totals: results.totals,
                        avgs: results.avgs,
                        selectedRows: []
                    });
                });
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
            "rows": this.props.selectedRows
        }
        let body = JSON.stringify(json);
        fetch('/delete', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body
        }).then(response => {
            if (response.status === 200) {
                response.json().then(results => {
                    this.props.onDataChange({
                        numRows: results.numRows,
                        rows: results.rows,
                        totals: results.totals,
                        avgs: results.avgs,
                        selectedRows: []
                    });
                });
            }
        });
    }
}

export default Form;
