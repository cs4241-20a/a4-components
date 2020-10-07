class Form extends React.Component {
    render() {
        return(
            <div>
                <div id="form-header" className="jumbotron">
                    <h1 id="form-title" className="special-font">Please fill this form out</h1>
                </div>
                <div id="form-section" className="jumbotron">
                    <form className="needs-validation" noValidate>
                        <div className="form-row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="fName">First name</label>
                                <input type="text" className="form-control" id="fName" placeholder="John" required />
                                    <div className="valid-feedback">
                                        First name must be entered!
                                    </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="mName">Middle name</label>
                                <input type="text" className="form-control" id="mName" placeholder="Quentin" />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="lName">Last name name</label>
                                <input type="text" className="form-control" id="lName" placeholder="Smith" required />
                                    <div className="valid-feedback">
                                        Last name must be entered!
                                    </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="gender">Gender</label>
                                <select className="form-control" id="gender">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                                <div className="invalid-feedback">
                                    A gender must be entered!
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="birthday">Birthday</label>
                                <input className="form-control" type="date" id="birthday" required />
                                    <div className="invalid-feedback">
                                        The guest is below the age of 18; they may not enter!
                                    </div>
                            </div>
                        </div>
                        <button id="addGuestButton" className="btn btn-primary" type="submit">Add Guest</button>
                    </form>
                </div>
            </div>
        );
    }
}