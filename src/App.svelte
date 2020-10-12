<script>
  let user = { loggedIn: false };
  let todos = [];
  let input = "";

function toggle2() {
		user.loggedIn = !user.loggedIn;
	}
  
  const getTodos = function() {
    const p = fetch( '/read', {
      method:'GET' 
    })
    .then( response => response.json() )
    .then( json => {
      console.log(json)
      return json 
    })
 
    return p
  }

  const addItem = function( e ) {
    const todo = document.querySelector('input').value
    
     if (input)
      todos = [
        ...todos,
        {
          text: input,
          id: Math.random()
            .toString(36)
            .substr(2, 9)
        }
      ];
    input = "";
    
    promise = fetch( '/add', {
      method:'POST',
      body: JSON.stringify({ name:todo, completed:false }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
  }

  const toggle = function( e ) {
    fetch( '/change', {
      method:'POST',
      body: JSON.stringify({ name:e.target.getAttribute('todo'), completed:e.target.checked }),
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  function removeTodo(id){
    let index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);
    todos = todos;
  }
  
  const deleteBtn = function( e ) {
    let row = e.target.parentElement.parentElement;
    promise = fetch( '/delete', {
           method:'POST',
           body: JSON.stringify({name:e.target.getAttribute('todo'), completed:false }),
           headers: {
            "Content-type": "application/json"
          }
    })
    .then(function(response) {
        if (response.ok) {
            let index = todos.findIndex(todo => todo.name === name);
            todos.splice(index, 1);
            todos = todos;
          
         // todos = todos.filter(todo => todo.name !== name);
        }
    })
  }
  
    const editBtn = function( e ) {
       let textNode = event.target.parentElement.firstChild;
       let entryID = event.target.parentElement.parentElement.id;
      let newValue = window.prompt("Modify your item:", textNode.data);
      
      let data = {id: entryID};
      data[event.target.parentElement.className] = newValue;
      
      
    fetch( '/update', {
      method:'POST',
      body: JSON.stringify({ name:e.target.getAttribute('todo'), completed:e.target.checked }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(function(response) {
        if (response.ok) {
            textNode.data = newValue;
        }
    })
     
  }

  let promise = getTodos()
</script>

<div>
<input type='text' required/>
<button on:click={addItem} >Add Item</button>

{#await promise then todos}
  <ul>

  {#each todos as todo}
    <li>{todo.name} : <input type='checkbox' todo={todo.name} checked={todo.completed} on:click={toggle}>
      <button type='button' todo={todo.name}  on:click={deleteBtn}>Delete</button>
      <button type='button' todo={todo.name} on:click={editBtn}>Modify</button></li>
  {/each}

  </ul>
{/await}

{#if user.loggedIn}
	<button on:click={toggle2}>
		Log out
	</button>
{/if}
<label for="nameField">Username</label>
        <input type="text" placeholder="username" id="User" required/>
        <label for="passField">Password</label>
        <input type="password" placeholder="password" id="Pass" required/>
{#if !user.loggedIn}
	<button on:click={toggle2}>
		Log in
	</button>
{/if}

</div>