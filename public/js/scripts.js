console.log("Welcome to assignment 3!")

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault()

  const make = document.querySelector('#Make')
  const model = document.querySelector('#Model')
  const year = document.querySelector('#Year')
  const price = document.querySelector('#Price')

  if (make.value.toString().trim() === '' || model.value.toString().trim() === '' || year.value.toString().trim() === '' || price.value.toString().trim() === '') {
    alert("Empty fields.")
    return false
  }

  const json = {
    make: make.value,
    model: model.value,
    year: year.value,
    price: price.value
  }

  const body = JSON.stringify(json)

  fetch('/submit', {
    method: 'POST',
    body,
    headers:{
      "Content-Type":"application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
      updateTable(json)
    })

  document.getElementById('Make').value = ""
  document.getElementById('Model').value = ""
  document.getElementById('Year').value = ""
  document.getElementById('Price').value = ""

  return false
}

const updateTable = function (json) {
  let dataTable = document.getElementById('data-table')

  for (var idx in json) {
    createEntry(dataTable, json[idx])
  }
}

const createEntry = function (dataTable, json, rowPos = -1) {
  let row = dataTable.insertRow(rowPos)

  let make = row.insertCell(0)
  let model = row.insertCell(1)
  let year = row.insertCell(2)
  let price = row.insertCell(3)
  let priority = row.insertCell(4)
  let del = row.insertCell(5)
  let save = row.insertCell(6)

  make.contentEditable = "true"
  model.contentEditable = "true"
  year.contentEditable = "true"
  price.contentEditable = "true"
  priority.contentEditable = "true"

  // make buttons
  var delBtn = document.createElement("button")
  delBtn.innerHTML = "Delete"
  delBtn.addEventListener("click", deleteItem)
  delBtn.className = 'del-btn'
  delBtn.id = json._id

  var saveBtn = document.createElement("button")
  saveBtn.innerHTML = "Save"
  saveBtn.addEventListener("click", saveItem)
  saveBtn.className = 'save-btn'
  saveBtn.id = json._id

  // data displayed
  make.innerHTML = json.make
  model.innerHTML = json.model
  year.innerHTML = json.year
  price.innerHTML = json.price
  priority.innerHTML = json.priority
  del.appendChild(delBtn)
  save.appendChild(saveBtn)
}

const deleteItem = function () {
  const json = { id: this.id }
  const body = JSON.stringify(json)

  fetch('/delete', {
    method: 'DELETE',
    body,
    headers:{
      "Content-Type":"application/json"
    }
  })

  // delete selected row from table 
  var i = this.parentNode.parentNode.rowIndex;
  document.getElementById("data-table").deleteRow(i);

  alert("Deleted entry.")
}

const saveItem = function () {
  // get modified row
  let datatable = document.getElementById("data-table")
  var i = this.parentNode.parentNode.rowIndex;
  var row = datatable.rows[i]

  // get changes
  const json = {
    make: row.cells[0].innerHTML,
    model: row.cells[1].innerHTML,
    year: row.cells[2].innerHTML,
    price: row.cells[3].innerHTML,
    priority: row.cells[4].innerHTML,
    id: this.id
  }
  const body = JSON.stringify(json)

  fetch('/put', {
    method: 'PUT',
    body,
    headers:{
      "Content-Type":"application/json"
    }
  }).then(response => response.json())

  // delete selected row from table 
  document.getElementById("data-table").deleteRow(i);

  // create a new row at specified position
  createEntry(document.getElementById('data-table'), json, i)
  alert("Saved entry.")
}

const logout = function (e) {
  // prevent default form action from being carried out
  e.preventDefault()

  fetch('/logout',{
    method: 'POST',
    headers:{
      "Content-Type":"application/json"
    }
  })
    .then(response => {
        if(response.status == 200)
          console.log("Logged out.")
    })

  window.location.href = "/views/login.html";
  return false
}

window.onload = function () {
  const submitBtn = document.querySelector('#submit-btn')
  submitBtn.onclick = submit

  const logoutBtn = document.querySelector('#logout-btn')
  logoutBtn.onclick = logout

  fetch('/data')
    .then(response => response.json())
    .then(json => {
      updateTable(json)
    })
}