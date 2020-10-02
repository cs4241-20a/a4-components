import React from 'react';
import './StatTable.css';

class StatTable extends React.Component {
  render(){
    return(
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
                <tbody></tbody>
            </table>
        </div>
    )
  }
}

export default StatTable;