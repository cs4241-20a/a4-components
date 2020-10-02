import React from 'react';
import './RunningStatTable.css';

class RunningStatTable extends React.Component {
  render(){
    return(
        <div>
            <table className="table is-bordered" id="total_avg_results">
                <thead>
                    <tr>
                        <th className="has-background-grey-light"> </th>
                        <th className="has-background-grey-light has-text-centered">Total</th>
                        <th className="has-background-grey-light has-text-centered">Average</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="has-background-grey-light has-text-centered"><strong>Kills</strong></td>
                        <td className="has-text-centered" id="total_kills">0</td>
                        <td className="has-text-centered" id="avg_kills">0</td>
                    </tr>
                    <tr>
                        <td className="has-background-grey-light has-text-centered"><strong>Assists</strong></td>
                        <td className="has-text-centered" id="total_assists">0</td>
                        <td className="has-text-centered" id="avg_assists">0</td>
                    </tr>
                    <tr>
                        <td className="has-background-grey-light has-text-centered"><strong>Deaths</strong></td>
                        <td className="has-text-centered" id="total_deaths">0</td>
                        <td className="has-text-centered" id="avg_deaths">0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
  }
}

export default RunningStatTable;