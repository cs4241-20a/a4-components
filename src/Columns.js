import React from 'react';
import './App.css';
import "./Columns.css";
import Form from "./Form";
import StatTable from "./StatTable";
import RunningStatTable from "./RunningStatTable";
import CSVButton from "./CSVButton";
import ClearButton from "./ClearButton";

class Columns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numRows: 0,
            rows: []
        }
        this.updateData = this.updateData.bind(this);
    }

    updateData(results){
        this.setState({
            numRows: results.numRows,
            rows: results.rows
        });
    }

    render(){
      return (
          <div className="columns is-centered">
              <div className="column is-one-fifth">
                  <Form onDataChange={this.updateData}/>
              </div>
              <div className="column is-one-third">
                  <StatTable numRows={this.state.numRows} rows={this.state.rows} onDataRetrieved={this.updateData}/>
              </div>
              <div className="column is-one-fifth">
                  <RunningStatTable />
                  <CSVButton />
                  <ClearButton />
              </div>
          </div>
      )
    }
}

export default Columns;
