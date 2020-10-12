<script>
import { text } from "svelte/internal"

	let idNumber = 1;

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
	const numScoops = document.getElementById("scoop").value
	const sprinklesBool = document.getElementById("sprinklesBox").checked
	let sprinkles = "no"
	if(sprinklesBool === true){
		sprinkles = "yes"
	}
	const idTodo = idNumber
	idNumber++
	console.log(sprinkles)
    promise = fetch( '/add', {
      method:'POST',
      body: JSON.stringify({ name:todo, completed:sprinkles, numScoops:numScoops, id:idTodo }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
  }

  const toggleName = function( e ) {
	const place = e.target.getAttribute('todo')
	const nameFound = document.getElementById(place).value
	console.log(nameFound)
    fetch( '/changeName', {
      method:'POST',
      body: JSON.stringify({ id:e.target.getAttribute('todo'), name:nameFound }),
      headers: { 'Content-Type': 'application/json' }
	})
  }

  const removeOrder = function( e ) {
    fetch( '/delete', {
      method:'POST',
      body: JSON.stringify({ id:e.target.getAttribute('id') }),
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
		<input type='text' required>
	</label>
	<label>
          Number of Scoops
          <input id="scoop" type="number" maxlength="100" placeholder="Scoops!"required>
    </label>
	<label>
          Check For Sprinkles
          <input id="sprinklesBox" type="checkbox" />
    </label>
</form>
<button on:click={addTodo}>add order</button>

</div>

<p>If you would like to change the flavor of ice cream you ordered, please click in the flavor cell, type your new flavor, and click UPDATE.</p>
<p>If you would like to delete your order, please select DELETE.</p>
  
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
		<td><input id={todo.id} type='text' todo={todo.name} placeholder={todo.name}></td>
		<td>{todo.numScoops}</td>
		<td>{todo.completed}</td>
		<td on:click={removeOrder}>DELETE </td>
		<td todo={todo.id} on:click={toggleName}>UPDATE</td>
	</tr>
  {/each}
</table>
</main>
{/await}  