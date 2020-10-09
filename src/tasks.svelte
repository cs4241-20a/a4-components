<div class="table" align="center">
      <h1 id="welcome">
      </h1>
      <h2> Your To-Do List </h2>
      <table class="table col-sm-6" align="center" id="todolist">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Due Date</th>
            <th scope="col">Priority</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="input form" align="center" id="table">
      <h2>Enter User Data</h2>
      <form class="container center_div form-group col-md-4 col-md-offset-4" action="/add" method="POST" align="center">
        <!--<div class="form-group" align="center"> -->
          <div class="form-group mb-2 mr-sm-2" align="left">
            <label for="task">Task</label>
            <input type="text" class="form-control" id="task">
          </div>
          <div class="form-group mb-2 mr-sm-2" align="left">
            <label for="duedate" >Due Date</label>
            <input type="date" class="form-control" id="duedate" align="center">
          </div>
          <div class="form-group mb-2 mr-sm-2" align="left">
            <label for="priority">Priority</label>
            <select class="form-control" id="priority" align="center">
              <option>Low</option>
              <option selected>Normal</option>
              <option>High</option>
            </select>
            <small id="rowtxt" class="form-text text-muted">Click a item to modify or delete it.</small>
          </div>
        <!-- </div> -->
        <div class="form-group mb-2 mr-sm-2" align="center">
          <button type="submit" class="btn btn-large btn-primary" id="add" align="center">Add</button>
          <button type="submit" class="btn btn-large btn-primary" id="edit" align="center">Edit</button>
          <button type="submit" class="btn btn-large btn-primary" id="delete" align="center">Delete</button>
        </div>
      </form>
    </div>
    <div align="center">
      <button type="button" class="btn btn-primary" id="signout">Sign Out</button>
    </div>
