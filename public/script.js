"use strict";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      yourname: '',
      score: '',
      location: '',
      data: [],
      error: ''
    }

    this.submit = this.submit.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);

  }

  componentDidMount() {
    fetch('/load')
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) {
          this.setState({ data: json })
        } else {
          this.setState({ error: json.error })
        }

      })
  }

  submit() {
    fetch('/add', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        yourname: this.state.yourname,
        score: this.state.score,
        location: this.state.location
      })
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) {
          this.setState({
            yourname: '',
            score: '',
            location: '',
            data: json,
            error: ''
          })
        } else {
          this.setState({ error: json.error })
        }

      })
  }

  delete(id) {
    fetch('/remove', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id })
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) {
          this.setState({ data: json })
        } else {
          this.setState({ error: json.error })
        }
      })
  }

  edit(id) {
    const dataI = this.state.data.find(i => i._id === id)
    fetch('/edit', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: dataI._id,
        yourname: dataI.yourname,
        score: dataI.score,
        location: dataI.location
      })
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) {
          this.setState({ data: json })
        } else {
          this.setState({ error: json.error })
        }
      })
  }

  render() {
    return (
      <div>
        <h1 className="heading">Game High Scores!</h1>
        <a href="/auth/github ">Login with Github</a>
        <p>Please enter your initials, score, and location here:</p>

        <input type='text' maxLength="3" id='yourname' defaultValue={this.state.yourname} onChange={e => { this.setState({ yourname: e.target.value }) }} />
        <input type="number" id='score' defaultValue={this.state.score} onChange={e => { this.setState({ score: e.target.value }) }} />
        <input type='text' id='location' defaultValue={this.state.location} onChange={e => { this.setState({ location: e.target.value }) }} />
        <button id="submitbtn" onClick={this.submit}>Submit</button>

        <table id='datatable'>
          <thead>
            <tr>
              <th>Initials</th>
              <th>Score</th>
              <th>Location</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody id='scoretable'>
            {this.state.data.map((item, index) => {
              return (
                <tr id={item._id}>
                  <td className='namedata'>
                    <input type='text' maxlength='3' defaultValue={item.yourname} onChange={e => { item.yourname = e.target.value }}></input>
                  </td>
                  <td className='scoredata'>
                    <input type='number' defaultValue={item.score} onChange={e => { item.score = e.target.value }}></input>
                  </td>
                  <td className='locationdata'>
                    <input type='text' defaultValue={item.location} onChange={e => { item.location = e.target.value }}></input>
                  </td>
                  <td>
                    <button onClick={() => this.delete(item._id)}>Delete</button>
                  </td>
                  <td>
                    <button onClick={() => this.edit(item._id)}>Edit</button>
                  </td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>

    )
  }
}

const mountNode = document.querySelector("#root");
ReactDOM.render(<App />, mountNode);
