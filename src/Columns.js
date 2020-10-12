import React from 'react';
import './App.css';
import "./Columns.css";
import Form from "./Form";
import StatTable from "./StatTable";
import RunningStatTable from "./RunningStatTable";
import CSVButton from "./CSVButton";
import ClearButton from "./ClearButton";

/**
 * Main column layout of the app: left column is the forms for adding,
 * modifying and deleting the stats from the table, middle column displays
 * all the recorded stats, and the right column displays the table of running
 * totals and averages as well as buttons to download stats as CSV file and
 * clear all stats for current user.
 */
class Columns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numRows: 0,
            rows: [],
            totals: {kills: 0, assists: 0, deaths: 0},
            avgs: {kills: 0, assists:0, deaths: 0},
            selectedRows: []
        }
        this.updateData = this.updateData.bind(this);
        this.emptyData = this.emptyData.bind(this);
    }

    /**
     * Update this components state with the current stats for this user, as
     * returned by the server.
     * @param results the HTTP response from the server, detailing the current stats for
     *     the current user.
     */
    updateData(results){
        this.setState({
            numRows: results.numRows ? results.numRows : this.state.numRows,
            rows: results.rows ? results.rows : this.state.rows,
            totals: results.totals ? results.totals : this.state.totals,
            avgs: results.avgs ? results.avgs : this.state.avgs,
            selectedRows: results.selectedRows ? results.selectedRows : this.state.selectedRows
        });
        console.log("selectedRows updated to: " +this.state.selectedRows);
    }

    /**
     * Empty out the state for this component i.e. set all stats to zero and empty
     * out the array of stats.
     */
    emptyData(){
        this.setState({
            numRows: 0,
            rows: [],
            totals: {kills: 0, assists: 0, deaths: 0},
            avgs: {kills: 0, assists:0, deaths: 0},
            selectedRows: []
        })
    }

    render(){
      return (
          <div className="columns is-centered">
              <div className="column is-one-fifth">
                  <Form onDataChange={this.updateData} selectedRows={this.state.selectedRows}/>
              </div>
              <div className="column is-one-third">
                  <StatTable numRows={this.state.numRows} rows={this.state.rows} selectedRows={this.state.selectedRows} onDataRetrieved={this.updateData}/>
              </div>
              <div className="column is-one-fifth">
                  <RunningStatTable onDataRetrieved={this.updateData} totals={this.state.totals} avgs={this.state.avgs}/>
                  <CSVButton/>
                  <ClearButton onDataClear={this.emptyData}/>
              </div>
          </div>
      )
    }
}

export default Columns;