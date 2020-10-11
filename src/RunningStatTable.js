import React from 'react';
import './RunningStatTable.css';

class RunningStatTable extends React.Component {
    constructor(props) {
        super(props);
        this.fillRunningStatTable = this.fillRunningStatTable.bind(this);
    }

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
                        {this.fillRunningStatTable()}
                    </tbody>
                </table>
            </div>
        );
    }

    fillRunningStatTable(){
        return ([
                <tr key={1}>
                    <td className="has-background-grey-light has-text-centered"><strong>Kills</strong></td>
                    <td className="has-text-centered" id="total_kills">{this.props.totals.kills}</td>
                    <td className="has-text-centered" id="avg_kills">{this.props.avgs.kills}</td>
                </tr>,
                <tr key={2}>
                    <td className="has-background-grey-light has-text-centered"><strong>Assists</strong></td>
                    <td className="has-text-centered" id="total_assists">{this.props.totals.assists}</td>
                    <td className="has-text-centered" id="avg_assists">{this.props.avgs.assists}</td>
                </tr>,
                <tr key={3}>
                    <td className="has-background-grey-light has-text-centered"><strong>Deaths</strong></td>
                    <td className="has-text-centered" id="total_deaths">{this.props.totals.deaths}</td>
                    <td className="has-text-centered" id="avg_deaths">{this.props.avgs.deaths}</td>
                </tr>
        ]);
  }
}

export default RunningStatTable;