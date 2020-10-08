import React, { Component } from 'react';

const Main = () => (
  <div className="flex-container">
        <h1>
      To Do List
    </h1>
    <form action="" name="form1" method="POST">
      
      <div className="form">
        <input className="inputs" type="text" id="taskname" value="Name"></input>
        <input className="inputs" type="text" id="taskpriority" value="Priority"></input>
        <input className="inputs" type="text" id="taskdeadline" value="Task deadline"></input>
        <div className="buttons" id="action" name="action">
          <input id="add" value="add" type="submit"></input>
          <input id="delete" value="delete" type="submit"></input>
          <input id="edit" value="edit" type="submit"></input>
      </div>
    </div>
      <br></br>           
    </form>
    <br></br>
        <table id="tableOne">
            <tr>
            <td>Task Name</td>
            <td>Task Priority</td>
            <td>Deadline of task</td>
        </tr>
    </table>
</div>
);
  
export default Main;
  