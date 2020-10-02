import React from 'react';
import './App.css';
import "./Columns.css";
import Form from "./Form";
import StatTable from "./StatTable";
import RunningStatTable from "./RunningStatTable";

class Columns extends React.Component {
    render(){
      return (
          <div className="columns is-centered">
              <div className="column is-one-fifth">
                  <Form />
              </div>
              <div className="column is-one-third">
                  <StatTable />
              </div>
              <div className="column is-one-fifth">
                  <RunningStatTable />
              </div>
          </div>
      )
    }
}

export default Columns;
