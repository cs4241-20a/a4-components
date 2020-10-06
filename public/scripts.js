
// index react component class
class Index extends React.Component {
  constructor(props) {
    super(props);

    // state to hold the signed-in user, inputs for courseName, task, dueDate and effort and all the tasks for a user
    this.state = {
      userTag: '',
      courseName: '',
      task: '',
      dueDate: '',
      effort: '1',
      tasks: []
    }

    // binding for all the functions needed to update the UI and the data
    this.processJSON = this.processJSON.bind(this)
    this.addTask = this.addTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.updateTask = this.updateTask.bind(this)
    this.logout = this.logout.bind(this)
    this.checkLoggedIn = this.checkLoggedIn.bind(this)
    this.setUserName = this.setUserName.bind(this)
  }

  // Processes the JSON from the server by setting it to the tasks state var
  processJSON(json) {
    this.setState({ tasks: json });
  }

  // addTask function to add new entries into the db
  addTask(e) {
    e.preventDefault()
    this.checkLoggedIn()

    // alert the user tnat they need to specify all the data before adding a task
    if(this.state.courseName.toString().trim() == '' || this.state.task.toString().trim() == '' || this.state.dueDate.toString().trim() == '' || this.state.effort.toString().trim() == '' ){
      alert("Please fill in all the fields before adding a new task");
      return false;
    }

    // create a json object with all the inputted data
    const json = {courseName: this.state.courseName, task : this.state.task, dueDate : this.state.dueDate, effort : this.state.effort},
    body = JSON.stringify(json)

    // send the data to the server and then process all the data returned
    fetch('/add', {
      method:'POST',
      body: body,
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => this.processJSON(json));

    // clear the input values now that we have added the inputs to the table
    this.setState({courseName: "", task: "", dueDate: "", effort: "1"});

    return false;
  }

  // updateTask function requests the server to update an entry in the DB
  updateTask(e) {
    e.preventDefault()
    this.checkLoggedIn()

    // get all the info for the table row being updated. Remove the leading "update-" from the id
    const id = e.target.getAttribute("id").substring(7),
    courseName =  document.querySelector(`#c-${id}`),
    task =  document.querySelector(`#t-${id}`),
    dueDate =  document.querySelector(`#d-${id}`),
    effort =  document.querySelector(`#e-${id}`)

    // create a json object with all the inputted data
    const json = {id, courseName: courseName.value, task: task.value, dueDate: dueDate.value, effort: effort.value},
    body = JSON.stringify(json);

    // send the data to the server and then process all the data returned
    fetch("/update", {
      method: "POST",
      body: body,
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => this.processJSON(json));

    return false;
  }

  // deleteTask function that requests the server to delete an etry from the DB based of the ID of teh entry
  deleteTask(e) {
    e.preventDefault()
    this.checkLoggedIn()

    // get the ID by removing the leading "dlt-"
    const id = e.target.getAttribute("id").substring(4);

    // create a json object with the id
    const json = {id},
    body = JSON.stringify(json);

    // send the data to the server and then process all the data returned
    fetch("/delete", {
      method: "POST",
      body: body,
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => this.processJSON(json));

    return false;
  }

  // Logout function request the user to be logged out and returns
  // user to the login screen based on the response status code
  logout(e) {
    e.preventDefault()
    fetch("/logout")
    .then((response) => {
      if (response.status === 200){
        window.location.href = "/"
      }
    })
  }

  // CheckLoggedIn function that requests if a user is signed in
  // If not, a 500 error will redirect the user to the login page
  checkLoggedIn() {
    fetch("/loggedIn")
    .then((response) => {
      if (response.status === 500) {
        alert("Permission denied. You are no longer signed in.")
        window.location.href = "/"
      }
      else {
        this.setUserName()
        return false
      }
    })
  }

  // Function that sets the tag for which user is logged in and if its a github user or not
  setUserName() {
    // get the user and then set the user tag
    fetch('/getUser')
    .then(response => response.json())
    .then((json) => {
      if(json.githubUser == true) {
        this.setState({userTag: "Github User: " + json.user})
      }
      else {
        this.setState({userTag: "User: " + json.user})
      }
    })
  }

  // functions for updating the current user tag and the table data upon loading the screen
  componentDidMount() {
    // make sure the user is actually logged in and can view this page
    this.checkLoggedIn()

    // get all the tasks for the logged in the user and populate the table
    fetch('/appData')
    .then(response => response.json())
    .then(json => this.processJSON(json));
  }

  // render function that creates the UI in HTML for the index / todo page
  render() {
    return (<div>
      <div className="logoutElements">
        <h3 id="userTag">{this.state.userTag}</h3>
        <button id="logoutBtn" onClick={(e)=>this.logout(e)}>Logout</button>
        </div>
        <h1 id="h1">Coursework TODO Tracker</h1>
        <p>
          A nice and simple way to keep track of class assignments and project deadlines!
        </p>
        <p>
          To use: Simply state the Course Name, the Assignment/Task, its Due Date, and the Effort to complete it (1=least - 5=most)
        </p>
        <p>
          A priority will be automatically assigned based on the Due Date and the Effort of the assignment.
        </p>
        <form className="inputElements">
          <div>
            <input type='text' id='courseName' value={this.state.courseName} placeholder="Ex. CS4241 - Webware" onChange={(e) => this.setState({ courseName: e.target.value })}/>
            <div className="spacer">&nbsp; </div>
            <label htmlFor="courseName">Course</label>
          </div>
          <div>
            <input type='text' id='task' value={this.state.task} placeholder="Ex. Assignment 2 - TODO List" size="30" onChange={(e) => this.setState({ task: e.target.value })}/>
            <div className="spacer">&nbsp; </div>
            <label htmlFor="task">Task</label>
          </div>
          <div>
            <input className="inputs" type='date' id='dueDate' size="30" value={this.state.dueDate} placeholder="Ex. yyyy-mm-dd" onChange={(e) => this.setState({ dueDate: e.target.value })}/>
            <div className="spacer">&nbsp; </div>
            <label htmlFor="dueDate">Due Date</label>
          </div>
          <div>
            <select className="inputs" id="effort" value={this.state.effort} onChange={(e) => this.setState({ effort: e.target.value })}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div className="spacer">&nbsp; </div>
            <label htmlFor="effort">Effort</label>
          </div>
          <button id="addBtn" onClick={(e)=>this.addTask(e)}>Add</button>
        </form>
        <table className="list">
          <thead>
            <tr>
              <th className="course">Course</th>
              <th className="task">Task</th>
              <th className="duedate">Due Date</th>
              <th className="effort">Effort</th>
              <th className="priority">Priority</th>
              <th className="delete"></th>
            </tr>
          </thead>
          <tbody id="tasks">
          {this.state.tasks.map((task, i) => {
            return(
              <tr key={task._id}>
                <td><textarea autoCorrect="off" autoCapitalize="off" spellCheck="false" defaultValue={task.courseName} id={`c-${task._id}`}/>
                </td>
                <td><textarea autoCorrect="off" autoCapitalize="off" spellCheck="false" defaultValue={task.task} id={`t-${task._id}`}/>
                </td>
                <td><input className="tableInput" type='date' defaultValue={task.dueDate} id={`d-${task._id}`}/>
                </td>
                <td><select className="tableInput" defaultValue={task.effort} id={`e-${task._id}`}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select></td>
                <td>{
                  task.priority
                }</td>
                <td><button className="deleteBtn" id={`dlt-${task._id}`} onClick={(e)=>this.deleteTask(e)}>
                  Delete</button> <br/>
                  <button className="updateBtn" id={`update-${task._id}`} onClick={(e)=>this.updateTask(e)}>
                  Update</button>
                </td>
            </tr>
            )
          })
        }
        </tbody>
      </table>
      </div>
    )
  }
}

// render the page in the browser
ReactDOM.render(<Index/>, document.querySelector("#index-react"))
