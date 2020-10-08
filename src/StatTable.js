import React from 'react';
import './StatTable.css';

class StatTable extends React.Component {
    //changed = false;

    constructor(props) {
        super(props);
        this.state = {
            numRows: 0,
            rows: [],
        }
        this.fillTable = this.fillTable.bind(this);
        this.getResults = this.getResults.bind(this);
    }

    componentDidMount() {
        this.getResults();
    }

    getResults(){
        fetch( '/results', {
            method:'GET'
        }).then(response => {
            if(response.status === 200){
                response.json().then(results => {
                    this.props.onDataRetrieved(results)
                })
            }
        });
    }

    render(){
        /*
        if(this.changed){
            this.changed = false;
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
                        <tbody>
                        {this.fillTable()}
                        </tbody>
                    </table>
                </div>
            )
        }else {*/
            return (
                <div>
                    <table className="table is-bordered" id="results_list">
                        <thead>
                        <tr>
                            <th className="has-background-grey-light"></th>
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
        //}
    }

    fillTable(){
        //this.changed = true;
        return this.props.rows.map(function(value){
            return(
                <tr key={value._id}>
                    <td>{value.kills}</td>
                    <td>{value.assists}</td>
                    <td>{value.deaths}</td>
                    <td>{value.kd_ratio}</td>
                    <td>{value.ad_ratio}</td>
                </tr>
            );
        });
    }
}

export default StatTable;