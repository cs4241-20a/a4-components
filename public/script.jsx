// define variables
var savingID = "";

// Update from db when open the web
updatingFromDB();

// Create the add form
const AddForm = function () {
  return (<form action="">
      <p className = "input">
        <label>Task:</label>
        <input name="task" type="text" required placeholder="Enter task detail here"></input>
      </p>
      <p className = "input">
        <label>Priority:</label>
        <select name="priority">
          <option value = "1">High</option>
          <option value = "2">Medium</option>
          <option value = "3">Low</option>
        </select>
      </p>
      <p className = "input">
        <label>Start Time:</label>
        <input type="time" name="starttime"></input>
      </p>
      <button className = "submit" id="addtask" onClick = {() => addButtonOnClick()}>Add</button>
    </form>)
}

// Render the add form to screen
ReactDOM.render( AddForm() , document.getElementById('form'));

// Get reference after the form is rendered
const taskForm = document.querySelector("form");
const addButton = document.getElementById("addtask");

// Create a list based on tasks passed in
const UpdateList = function ( tasks ){
  const listItems = 
        tasks.map((oneTask) => 
                  NewListItem (oneTask.task,oneTask.priority,oneTask.starttime,oneTask._id));
  
  return (<section className="tasks">
        <ul id="tasks">
          {listItems}
        </ul>
      </section>)
}

// Create a new list item
const NewListItem = function ( task, priority, starttime, id) {
  return (<li id = {id} key = {id}>
      {task}{Time(starttime,priority)}
      {Ed( task, priority, starttime,id)}
      {Dl(id)}</li>)
}

// Create a time string
const Time = function ( starttime , priority ){
  const text = getDueTime(starttime,priority);
  return (<span className = "time">{text}</span>);
}

// Create a delete button
const Dl = function ( id ) {
  return (<span className = "close" onClick = {() => dlOnClick(id)}>x</span>);
}

// Create a edit button
const Ed = function ( task, priority, starttime, id ) {
  return (<span className = "edit" onClick = {() => edOnClick(task, priority, starttime, id)}>edit</span>);
}

// Update data from DB and display to screen
function updatingFromDB(){
// fetch the initial list of tasks
fetch("/tasks")
  .then(response => response.json())
  .then(tasks => {
    // Update all task
    ReactDOM.render( UpdateList( tasks ), document.getElementById('list'));
    });
}

// Delete button onClick()
function dlOnClick(id) {
    fetch( '/delete', {
      method: 'POST',
      body:JSON.stringify({ id }),
      headers: {
        'Content-type': 'application/json' 
      }
    })
    .then( updatingFromDB() )
}

// Edit button onClick()
function edOnClick( task, priority, starttime, id ){
    // Changing the form
    taskForm.elements.task.value = task;
    taskForm.elements.priority.value = priority;
    taskForm.elements.starttime.value = starttime;
    taskForm.elements.task.focus();
    // Changing the button and save the id of the task
    savingID = id;
    addButton.innerText = "Save";
    addButton.className = "save";
}

// Add/Save button onClick()
function addButtonOnClick(){
  // stop our form submission from refreshing the page
    event.preventDefault();

    // get task value and add it to the list
    let task = taskForm.elements.task.value,
        priority = taskForm.elements.priority.value,
        starttime = taskForm.elements.starttime.value;

    if(addButton.className == "submit"){
    fetch( '/add', {
      method: 'POST',
      body:JSON.stringify({ task: task, priority: priority, starttime: starttime }),
      headers: {
        'Content-type': 'application/json' 
      }
    })
    .then( updatingFromDB());
    }else if(addButton.className == "save"){
      fetch( '/update', {
      method: 'POST',
      body:JSON.stringify({ task: task, priority: priority, starttime: starttime, id: savingID }),
      headers: {
        'Content-type': 'application/json' 
      }
    })
    .then( function updating(){
        addButton.className = "submit",
        addButton.innerText = "Add",
        updatingFromDB()})
    }
    
    // reset form
    taskForm.reset();
    taskForm.elements.task.focus();
}

// Function to get due time based on starttime and priority
function getDueTime(startTime, prio){
  var dueTime;
  // If time not entered assume start time at 12:00
    if (startTime === ""){
      startTime = "12:00";
    }
    
    // Adding time based on priority
    switch(parseInt(prio)){
      case 1: dueTime = addTime(startTime,30); break;
      case 2: dueTime = addTime(startTime,60); break;
      case 3: dueTime = addTime(startTime,120); break;
      default: dueTime = startTime; break;
    }
    
    // Add due time to the object
  var finalString = "Start Time " +  startTime + " " + "Due Time " + dueTime;
    return finalString
}
// Function to transfer start time to int and add time
// return a string of edited time
function addTime(startTime, addMin){
      var hour = parseInt(startTime.substring(0,2));
      var min = parseInt(startTime.substring(3,5));
      if(addMin ===30){
        if(min > 30){
          min-=30;
          hour++;
        }else{
          min+=addMin;
        }
      }else if(addMin === 60){
        hour++;
      }else if(addMin === 120){
        hour+=2;
      }
      if(hour>24){
        hour = 0;
      }
      var minString, hourString;
      if(min<10){
        minString = "0" + min.toString();
      }else{
        minString = min.toString();
      }
      if(hour<10){
        hourString = "0" + hour.toString();
      }else{
        hourString = hour.toString();
      }
      return hourString.toString() + ":" + minString.toString();
    }