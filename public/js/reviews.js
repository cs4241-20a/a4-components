class App extends React.Component {
    constructor(data) {
        super(data);

        this.state = {
            username: '',
            name: '',
            deviceName: '',
            priceRating: '',
            batteryRating: '',
            performanceRating: '',
            feelRating: '',
            reviews: []
        }

        this.addEntry = this.addEntry.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.modifyEntry = this.modifyEntry.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        fetch('/getUser')
        .then(response => response.json())
        .then(userJson => {
            this.setState({username: userJson.username})
        })

        fetch('/reviews')
        .then(response => response.json())
        .then(reviews => {
            this.setState({reviews: reviews})
        })
    }

    checkFields() {
        if (this.state.deviceName === '') {
            return false;
        
        } else if (this.state.priceRating === '') {
            return false;
        
        } else if (this.state.batteryRating === '') {
            return false;
        
        } else if (this.state.performanceRating === '') {
            return false;
        
        } else if (this.state.feelRating === '') {
            return false;
        }

        return true;
    }

    addEntry(e) {
        e.preventDefault()

        if (!this.checkFields()) {
            window.alert("ERROR: Found Missing Value!")
            return
        }

        
        const jsonObject = {
            username: this.state.username,
            name: this.state.name,
            deviceName: this.state.deviceName,
            priceRating: this.state.priceRating,
            batteryRating: this.state.batteryRating,
            performanceRating: this.state.performanceRating,
            feelRating: this.state.feelRating
        }, body = JSON.stringify(jsonObject)
        
        //window.alert(body)
        fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })
        .then(response => response.json())
        .then(reviews => {
            //window.alert(reviews)
            this.setState({reviews: reviews})
        })
        
    }

    modifyEntry(e, id) {
        e.preventDefault()

        if (!this.checkFields()) {
            window.alert("ERROR: Found Missing Value!")
            return
        }

        const jsonObject = {
            entryID: id,
            username: this.state.username,
            name: this.state.name,
            deviceName: this.state.deviceName,
            priceRating: this.state.priceRating,
            batteryRating: this.state.batteryRating,
            performanceRating: this.state.performanceRating,
            feelRating: this.state.feelRating
        }, body = JSON.stringify(jsonObject)
        
        fetch('/modify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })
        .then(response => response.json())
        .then(reviews => {
            this.setState({reviews: reviews})
        })
    }


    deleteEntry(e, id, username) {
        e.preventDefault()

        const jsonObject = {
            entryID: id,
            user: username
        }, body = JSON.stringify(jsonObject)
        
        fetch('/deletion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })
        .then(response => response.json())
        .then(reviews => {
            this.setState({reviews: reviews})
        })
        
    }

    signOut(e) {
        e.preventDefault() 

        window.location.href = "/";
    }

    render() {
       return (
        <div className="columns is-centered" id="content-container">
            <div className="container">
                <div className="column" id="leftColumn">
                    <div className="field is-horizontal is-grouped is-grouped-centered">
                        <h2 className="title is-centered">Collected User Reviews</h2>
                    </div>
            
                    <div className="field">
                        <label className="label">Username: </label>
                        <input className="input" type='text' readOnly value={this.state.username}/>
                    </div>

                    <div clasName="field">
                        <label className="label">Your Name: </label>
                        <input class="input" type='text' placeholder="John Doe" onChange={val => {
                            this.setState({name: val.target.value})
                        }}/>
                    </div>

                    <div class="field">
                        <label class="label">Choose Device: </label>
                        <div class="control">
                            <div class="select is-fullwdith">
                                <select name="device-selection" id="device" onChange={val => {
                                    this.setState({deviceName: val.target.value})
                                }}>
                                    <option value="Default" selected disabled hidden>Select One</option>
                                    <optgroup label="Phones">
                                        <option value="Apple iPhone 11 Pro Max">Apple iPhone 11 Pro Max</option>
                                        <option value="Apple iPhone SE">Apple iPhone SE</option>
                                        <option value="Google Pixel 3a">Google Pixel 3a</option>
                                        <option value="Google Pixel 4a">Google Pixel 4a</option>
                                        <option value="Google Pixel 4">Google Pixel 4</option>
                                        <option value="Samsung Galaxy S20 Ultra">Samsung Galaxy S20 Ultra</option>
                                    </optgroup>
                                    <optgroup label="Tablets">
                                        <option value="Apple iPad Pro (2020)">Apple iPad Pro (2020)</option>
                                        <option value="Google Pixel Slate">Google Pixel Slate</option>
                                        <option value="Samsung Galaxy Tab S6">Samsung Galaxy Tab S6</option>
                                        <option value="Samsung Galaxy Tab S5e">Samsung Galaxy Tab S5e</option>
                                    </optgroup>
                                    <optgroup label="Laptops">
                                        <option value="Apple MacBook Pro (2020)">Apple MacBook Pro (2020)</option>
                                        <option value="Apple MacBook Air (2020)">Apple MacBook Air (2020)</option>
                                        <option value="Lenovo ThinkPad X1 Carbon Gen 6">Lenovo ThinkPad X1 Carbon Gen 6</option>
                                        <option value="Dell XPS 13 (2020)">Dell XPS 13 (2020)</option>
                                        <option value="Dell XPS 15 (2020)">Dell XPS 15 (2020)</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Price Rating: </label>
                        <div class="control">
                            <div class="select">
                                <select name="price-rating" id="price" onChange={val => {
                                    this.setState({priceRating: val.target.value})
                                }}>
                                    <option value="Default" selected disabled hidden>Select One</option>
                                    <option value="1 Star">1 Star</option>
                                    <option value="2 Stars">2 Stars</option>
                                    <option value="3 Stars">3 Stars</option>
                                    <option value="4 Stars">4 Stars</option>
                                    <option value="5 Stars">5 Stars</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Battery Life Rating: </label>
                        <div class="control">
                            <div class="select">
                                <select name="battery-life-rating" id="battery"  onChange={val => {
                                    this.setState({batteryRating: val.target.value})
                                }}>
                                    <option value="Default" selected disabled hidden>Select One</option>
                                    <option value="1 Star">1 Star</option>
                                    <option value="2 Stars">2 Stars</option>
                                    <option value="3 Stars">3 Stars</option>
                                    <option value="4 Stars">4 Stars</option>
                                    <option value="5 Stars">5 Stars</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Performance Rating: </label>
                        <div class="control">
                            <div class="select">
                                <select name="performance-rating" id="performance" onChange={val => {
                                    this.setState({performanceRating: val.target.value})
                                }}>
                                    <option value="Default" selected disabled hidden>Select One</option>
                                    <option value="1 Star">1 Star</option>
                                    <option value="2 Stars">2 Stars</option>
                                    <option value="3 Stars">3 Stars</option>
                                    <option value="4 Stars">4 Stars</option>
                                    <option value="5 Stars">5 Stars</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Device Feel Rating: </label>
                        <div class="control">
                            <div class="select">
                                <select name="device-feel-rating" id="device-feel" onChange={val => {
                                    this.setState({feelRating: val.target.value})
                                }}>
                                    <option value="Default" selected disabled hidden>Select One</option>
                                    <option value="1 Star">1 Star</option>
                                    <option value="2 Stars">2 Stars</option>
                                    <option value="3 Stars">3 Stars</option>
                                    <option value="4 Stars">4 Stars</option>
                                    <option value="5 Stars">5 Stars</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="container has-text-centered">
                        <button id="signOut" className="button" onClick={(e)=>this.signOut(e)}>
                            Sign Out
                        </button>
                        <button id='submit' className="button" onClick={(e)=>this.addEntry(e)}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div className="container has-text-centered">
                <div className="column" id="rightColumn">
                    <div className="field is-horizontal is-grouped is-grouped-centered">
                        <h2 className="title is-centered">Collected Reviews</h2>
                    </div>

                    <table className="table" id="table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Device Name</th>
                                <th>Price Rating</th>
                                <th>Battery Life Rating</th>
                                <th>Performance Rating</th>
                                <th>Device Feel Rating</th>
                                <th>Overall Rating</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.reviews.map((review, i) =>{
                                return (
                                    <tr key={review._id}>
                                        <td>{review.username}</td>
                                        <td>{review.name}</td>
                                        <td>{review.deviceName}</td>
                                        <td>{review.priceRating}</td>
                                        <td>{review.batteryRating}</td>
                                        <td>{review.performanceRating}</td>
                                        <td>{review.feelRating}</td>
                                        <td>{review.overallRating}</td>
                                        <td>
                                            <button onClick={(e)=>this.modifyEntry(e, review._id)}>
                                                Modify
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={(e)=>this.deleteEntry(e, review._id, review.username)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       );
        
    }
}

ReactDOM.render(<App/>, document.getElementById('react-container'));