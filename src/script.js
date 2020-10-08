   

var nameTaskArr = ["go grocery shopping", "finish math homework"]
  var taskPriorArr = ["medium", "high"]
  var taskDeadlineArr = ["Thursday", "Wednesday"]


function addToTable(nameTaskArr, taskPriorArr, taskDeadlineArr) {
  //find table
  const table = document.getElementById("tableOne");
  
  let length = nameTaskArr.length;

  var rows = table.rows;
  var i = rows.length;
  while (--i) {
    rows[i].parentNode.removeChild(rows[i]);
    // or
    // table.deleteRow(i);
  
   }
  
  console.log(nameTaskArr);
  console.log(taskPriorArr);
  console.log(taskDeadlineArr);
  
  var x;
 
  for (x = 0; x < length; x++) {
   
    let row = table.insertRow(x+1);
  
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    
    cell1.innerText = nameTaskArr[x];
    cell2.innerText = taskPriorArr[x];
    cell3.innerText = taskDeadlineArr[x];
      
  }
  
}
    
const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const nameInput = document.querySelector('#taskname'),
          priorityInput = document.querySelector('#taskpriority'),
          deadlineInput = document.querySelector('#taskdeadline'),
          addInput = document.querySelector('#add'),
          editInput = document.querySelector('#edit'),
          deleteInput = document.querySelector('#delete')

    var json;
    var body;

    if(addInput) {
      json = {action: "add", taskname: nameInput.value, taskpriority: priorityInput.value, taskdeadline: deadlineInput.value}
      body = JSON.stringify(json)
    }

    else if(editInput) {
      json = {action: "edit", taskname: nameInput.value, taskpriority: priorityInput.value, taskdeadline: deadlineInput.value}

      body = JSON.stringify(json)
    }

    else {
      json = {action: "delete", taskname: null, taskpriority: null, taskdeadline: null}
      body = JSON.stringify(json)
    }
  
  
    console.log(JSON.stringify(json))
  
  
  
    fetch('/submit', {
      method:'POST',
      body
    })
    .then( function( response ) {
      // do something with the reponse
      var data;
      data = response.json();
      

      return data   // Response will come in here if you send it after the post, so this is probably good 
    }).then( function(data){
      
      console.log(data);
      
      nameTaskArr = []
      taskPriorArr = []
      taskDeadlineArr = [] 
      
      var dataLength = data.test.length
      
      for(let i = 0; i < dataLength; i++) {
       
        nameTaskArr.push(data.test[i].Name)
        taskPriorArr.push(data.test[i].Priority)
        taskDeadlineArr.push(data.test[i].Deadline)
        
        console.log("testfunc")
  
        addToTable(nameTaskArr, taskPriorArr, taskDeadlineArr)       
      }
    })
  
    return false
  }

  window.onload = function() {
    const button = document.querySelector( '#add' )
      button.onclick = submit
    const button2 = document.querySelector( '#delete' )
      button2.onclick = submit
    const button3 = document.querySelector( '#edit' )
      button3.onclick = submit
  }