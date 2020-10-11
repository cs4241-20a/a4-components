<script>
  
    let todos = []
  
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

  const addTodo = function( e ) {
    const todo = document.querySelector('input').value
    
    if (input)
      todos = [
        ...todos,
        {
          text: input,
          id: Math.random().toString()
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
  
    
  
  const delClick = function( e ) {
    fetch( '/delete', {
      method:'POST',
      body: JSON.stringify({ name:e.target.getAttribute('todo'), completed:e.target.checked }),
      headers: { 'Content-Type': 'application/json' }
    })
        .then(function(response) {
        if (response.ok) {
            let index = todos.findIndex(todo => todo.name === name)
            todos.splice(index, 1)
            todos = todos
        }
    })
  }
  
    const editClick = function( e ) {
      let textNode = event.target.parentElement.firstChild
      let id = event.target.parentElement.parentElement.id
      let newTask = window.prompt("What would you like to change the task to?", textNode.data)
      
      let data = {id: id};
      data[event.target.parentElement.className] = newTask;
      
      
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

<input type='text' />
<button on:click={addTodo}>Add Task</button>

{#await promise then todos}
  <ul>

  {#each todos as todo}
    <li>{todo.name} : <input type='checkbox' todo={todo.name} checked={todo.completed} on:click={toggle}>
      <button type='button' todo={todo.name} on:click={delClick}>Delete</button>
      <button type='button' todo={todo.name} on:click={editClick}>Edit</button></li>
  {/each}

  </ul>
{/await}