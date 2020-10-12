import React from 'react';
import './StatTable.css';

/**
 * Component for displaying the current list of game stats for the current user.
 */
class StatTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numRows: 0,
            rows: [],
        }
        this.fillTable = this.fillTable.bind(this);
        this.getResults = this.getResults.bind(this);
        this.toggleCheck = this.toggleCheck.bind(this);
    }

    /**
     * As soon as this component is set up (i.e. a user has logged in), get the
     * current stats for that user.
     */
    componentDidMount() {
        this.getResults();
    }

    /**
     * Get the current stats for the current user.
     */
    getResults(){
        fetch( '/results', {
            method:'GET'
        }).then(response => {
            if(response.status === 200){
                response.json().then(results => {
                    this.props.onDataRetrieved({
                        numRows: results.numRows,
                        rows: results.rows,
                        totals: results.totals,
                        avgs: results.avgs,
                        selectedRows: []
                    })
                })
            }
        });
    }

    render(){
            return (
                <div>
                    <table className="table is-bordered" id="results_list">
                        <thead>
                        <tr>
                            <th className="has-background-grey-light"> </th>
                            <th className="has-background-grey-light">Kills</th>
                            <th className="has-background-grey-light">Assists</th>
                            <th className="has-background-grey-light">Deaths</th>
                            <th className="has-background-grey-light">K/D Ratio</th>
                            <th className="has-background-grey-light">A/D Ratio</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.fillTable()}
                        </tbody>
                    </table>
                </div>
            )
    }

    /**
     * Update the table body with the current list of game stats for the current user.
     */
    fillTable(){
        return this.props.rows.map((value, index) => {
            return <tr key={value._id}>
                       <td><input type="checkbox" onChange={this.toggleCheck} id={index}    /></td>
                       <td>{value.kills}</td>
                       <td>{value.assists}</td>
                       <td>{value.deaths}</td>
                       <td>{value.kd_ratio}</td>
                       <td>{value.ad_ratio}</td>
                   </tr>
        });
    }

    /**
     * Called everytime the user toggles a checkbox. Adds or remove the toggled
     * item from the list of stats to be affected by the next batch modification
     * / deletion.
     */
    toggleCheck(inputEvent){
        let selectedRows = this.props.selectedRows;//Get currently selected rows
        if(inputEvent.target.checked){
            let row = this.props.rows[inputEvent.target.id];
            selectedRows.push({
                _id: row._id,
                kills: row.kills,
                assists: row.assists,
                deaths: row.deaths
            });
            console.log("Added: " +inputEvent.target);
        }else{
            selectedRows.slice(selectedRows.indexOf(inputEvent.target), 1);
            console.log("Removing: " +inputEvent.target);
        }
        //Update with new set of selected rows
        this.props.onDataRetrieved({
            numRows: this.props.numRows,
            rows: this.props.rows,
            selectedRows: selectedRows
        });
    }
}

export default StatTable;