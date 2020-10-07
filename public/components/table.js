class Table extends React.Component {
    render() {
        return(
            <div>
                <div id="table-header" className="jumbotron">
                    <h1 id="table-title" className="special-font">Guest List</h1>
                </div>
                <div id = "table-section" className = "jumbotron">
                    <table className = "table">
                        <thead>
                            <tr>
                                <th scope="col">FullName</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Birthday</th>
                                <th scope="col">Able to Drink</th>
                                <th scope = "col">Delete</th>
                                <th scope="col">Modify</th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}