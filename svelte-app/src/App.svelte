<script>
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

  const removeOrder = function( e ) {
    fetch( '/delete', {
      method:'POST',
      body: JSON.stringify({ name:e.target.getAttribute('todo'), completed:e.target.checked }),
      headers: { 'Content-Type': 'application/json' }
	}).then( response => response.json() )
	promise = getTodos();
  }

  let promise = getTodos()
</script>

<div class="container">
<h2>Oh hi,</h2>
<p>Tell me your ice cream order:</p>
<form>
	<label> Your Flavor:
		<input type='text' />
	</label>
	<label>
          Number of Scoops
          <input type="number" maxlength="100" required placeholder="Scoops!"/>
    </label>
	<label>
          Check For Sprinkles
          <input name="sprinkles" type="checkbox" />
    </label>
</form>
</div>
<button on:click={addTodo}>add order</button>

  
{#await promise then todos}
<main>
<table>
	<tr>
		<td>What did you get?</td>
		<td>How Many Scoops?</td>
		<td>Any Sprinkles?</td>
		<td></td>
		<td></td>
	</tr>
  {#each todos as todo}
	<tr>
		<!-- <td> {todo.name} : <input type='checkbox' todo={todo.name} checked={todo.completed} on:click{toggle}> </td> -->
		<td>{todo.name} </td>
		<td> <input type='checkbox' todo={todo.name} checked={todo.completed} on:click={toggle}></td>
		<td on:click={removeOrder}>DELETE </td>
		<td on:click={toggle}>UPDATE</td>
	</tr>
  {/each}
</table>
</main>
{/await}  