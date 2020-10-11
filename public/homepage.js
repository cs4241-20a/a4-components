class Homepage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      account: '',
      taskName: '',
      taskDesc: '',
      taskPrio: 'low',
      taskDeadline: '',
      tasks: []
    }

    this.getData = this.getData.bind(this);
    this.calculateDeadline = this.calculateDeadline.bind(this);
    this.submit = this.submit.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.logout = this.logout.bind(this);
  }

  getData = (json) => {
    this.setState({tasks: json});
    console.log(json)
  }

  calculateDeadline = function(prio){
    var deadlineVal = 0;
    if(prio === "low" || prio == ""){
      deadlineVal+=4;
    }

    if(prio === "medium"){
      deadlineVal+=2;
    }

    if(prio === "high"){
      deadlineVal++;
    }
    console.log(deadlineVal + "days")
    var finalDeadline = moment().add(deadlineVal, "days").format("MM/DD/YYYY")
    return finalDeadline;
  }

  submit = function(e) {
    e.preventDefault();
    const json = {name: this.state.taskName, task: this.state.taskDesc, priority: this.state.taskPrio, deadline: this.calculateDeadline(this.state.taskPrio)},
    body = JSON.stringify(json);
    console.log(json)

    fetch( '/submit', {
      method:'POST',
      body: body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json() )
    .then(json => {
      this.getData(json);
      console.log(json)
    })
    this.setState({taskName: "", taskDesc: "", taskPrio: "low", taskDeadline: ""});
    return false
  }

  updateTask = function(e) {
    e.preventDefault();

    const tempID = e.target.getAttribute("id").substring(5),
    name = document.querySelector("#taskName"),
    task = document.querySelector("#taskDesc"),
    priority = document.querySelector("#prio"),
    deadline = this.calculateDeadline(priority.value),
    json = {tempID, name: name.value, task: task.value, priority: priority.value, deadline: deadline},
    body = JSON.stringify(json);
    console.log(json)

    fetch( '/submit', {
      method:'POST',
      body: body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json() )
    .then(json => {
      this.getData(json);
      console.log(json)
    })
    return false
  }

  deleteTask = function (e) {
    e.preventDefault();
    const val = e.target.getAttribute("id");

    const json = {delete: 'delete', val},
    body = JSON.stringify(json);
    console.log(body);

    fetch("/submit", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => this.getData(json));

    return false;
  }

  logout = function (e) {
    e.preventDefault();
    fetch("/logout")
    .then(response => {
      if (response.ok){
        window.location.href = "/"
      }
    })
  }

  componentDidMount() {
    fetch('/api/getData')
    .then(response => response.json())
    .then(json => this.getData(json));
  }

  render() {
    return (<div>
      <form action="">
      <h1 className="title">TODO - Task Management Application</h1>

      <label htmlFor="task-title">
      Task Name
      <input type='text' id='taskName' value={this.state.taskName} onChange={(e) => this.setState({ taskName: e.target.value })} placeholder=""/>
      </label>

      <label htmlFor="description">
      Description
      <input type='text' id='taskDesc' value={this.state.taskDesc} onChange={(e) => this.setState({ taskDesc: e.target.value })} placeholder=""/>
      </label>

      <div className="submitRow">
      <label htmlFor="priority">
      Priority
      <select id='prio' value={this.state.taskPrio} onChange={(e) => this.setState({ taskPrio: e.target.value })}>
      <option value="low">Low </option>
      <option value="medium">Medium </option>
      <option value="high">High </option>
      </select>
      </label>

      <button id="addBtn" onClick={(e)=>this.submit(e)}>Add</button>
      <button className="logoutBtn" onClick={(e)=>this.logout(e)} id="logoutBtn">Logout</button>
      </div>
      </form>

      <div> </div>
      <div>
      <h1>Tasks</h1>
      <table>
      <thead>
      <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Description</th>
      <th>Priority</th>
      <th>Due Date</th>
      </tr>
      </thead>
      <tbody id="tasks">
      {this.state.tasks.map((task, i) => {
        return(
          <tr key={task._id}>
          <td>{task._id.substring(5)}</td>
          <td>{task.name}</td>
          <td>{task.task}</td>
          <td>{task.priority}</td>
          <td>{task.deadline}</td>

          <td>
          <div className="spacerMini"></div>
          <button className="deleteButton" onClick={(e)=>this.deleteTask(e)} id={`${task._id}`}>Delete</button>
          <div className="spacerMini"></div>
          <button className="updateButton" onClick={(e)=>this.updateTask(e)} id={`${task._id}`}>Update</button>
          </td>
          </tr>
        )
      })
    }
    </tbody>
    </table>
    </div>
    </div>)
  }
}
ReactDOM.render(<Homepage/>, document.querySelector("#homepage"));
