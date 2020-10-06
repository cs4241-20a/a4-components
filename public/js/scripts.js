console.log("Welcome to assignment 4!")

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uname: '',
      make: '',
      model: '',
      year: '',
      priority: '',
      cars: []
    }

    this.submit = this.submit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fetch('/data')
      .then(response => response.json())
      .then(json => {
        this.setState({ cars: json })
      })
  }

  submit(e) {
    e.preventDefault()

    if (this.state.make.toString().trim() === '' || this.state.model.toString().trim() === '' || this.state.year.toString().trim() === '' || this.state.price.toString().trim() === '') {
      alert("Empty fields.")
      return false
    }

    const json = {
      make: this.state.make,
      model: this.state.model,
      year: this.state.year,
      price: this.state.price
    }
    const body = JSON.stringify(json)

    fetch('/submit', {
      method: 'POST',
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())

     fetch('/data')
      .then(response => response.json())
      .then(json => {
        this.setState({ cars: json })
      })

    this.setState({ make: '' })
    this.setState({ model: '' })
    this.setState({ year: '' })
    this.setState({ price: '' })

    return false
  }

  deleteItem(e, id) {
    const json = { id: id }
    const body = JSON.stringify(json)

    fetch('/delete', {
      method: 'DELETE',
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())

    fetch('/data')
    .then(response => response.json())
    .then(json => {
      this.setState({ cars: json })
    })
    alert("Deleted entry.")
  }

  saveItem(e, id) {
    const json = {
      make: document.getElementById(`make-${id}`).innerHTML,
      model: document.getElementById(`model-${id}`).innerHTML,
      year:document.getElementById(`year-${id}`).innerHTML,
      price: document.getElementById(`price-${id}`).innerHTML,
      priority: document.getElementById(`priority-${id}`).innerHTML,
      id: id
    }

    const body = JSON.stringify(json)

    fetch('/put', {
      method: 'PUT',
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
    })
    
    fetch('/data')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        this.setState({ cars: json })
      })

    alert("Saved entry.")
  }

  logout(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    fetch('/logout', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status == 200)
          console.log("Logged out.")
      })

    window.location.href = "/views/login.html";
    return false
  }

  render() {

    return (
      <div>
        <p><button id="logout-btn" onClick={this.logout}>Log out</button></p>
        <h1 className="box header">Classic Cars Wishlist</h1>

        <div className="box sidebar">
          <h3>Keep track of the cars you'd like to purchase!</h3>
          <hr></hr>
          <p>Based on the car year and price, a priority will be calculated. </p>
          <p> Priority 1 is the highest and means you should get the car right away!</p>

          <div className="data-form">
            <form id="form">
              <p><input type='text' id='Make' placeholder="Make" value={this.state.make}  onChange={val => { this.setState({ make: val.target.value }) }}></input></p>
              <p><input type='text' id='Model' placeholder="Model" value={this.state.model}  onChange={val => { this.setState({ model: val.target.value }) }}></input></p>
              <p><input type='number' id='Year' placeholder="Year" value={this.state.year} onChange={val => { this.setState({ year: val.target.value }) }}></input></p>
              <p><input type='number' id='Price' placeholder="Price" value={this.state.price} onChange={val => { this.setState({ price: val.target.value }) }}></input></p>

              <p><button id="submit-btn" onClick={this.submit}>Submit</button></p>
            </form>
          </div>
        </div>

        <hr></hr>

        <div className="box content">
          <table id="data-table">
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Price</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cars.map((car) =>
                <tr key={car._id}>
                  <td contentEditable="true" suppressContentEditableWarning="true" id={`make-${car._id}`} onInput={ val => { this.setState({ make: val.target.value })}}>{car.make}</td>
                  <td contentEditable="true" suppressContentEditableWarning="true" id={`model-${car._id}`} onChange={val => { this.setState({ model: val.target.value })}} >{car.model}</td>
                  <td contentEditable="true" suppressContentEditableWarning="true" id={`year-${car._id}`} onChange={val => { this.setState({ year: val.target.value })}}>{car.year}</td>
                  <td contentEditable="true" suppressContentEditableWarning="true" id={`price-${car._id}`} onChange={val => { this.setState({ price: val.target.value })}}>{car.price}</td>
                  <td contentEditable="true" suppressContentEditableWarning="true" id={`priority-${car._id}`} onChange={val => { this.setState({ priority: val.target.value })}}>{car.priority}</td>
                  <td>
                    <button className="del-btn" onClick={(e) => this.deleteItem(e, car._id)}>Delete</button>
                  </td>
                  <td>
                    <button className="save-btn" onClick={(e) => this.saveItem(e, car._id)}>Save</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const domContainer = document.getElementById("react-container");
ReactDOM.render(<App />, domContainer);