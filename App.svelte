<script>
	export let name;
	let Username = "";
	let Password = "";
	let loggedIn = false;
	
	const dreamsForm = document.getElementById("new-entry");
	const changeForm = document.getElementById("edit-entry");	
	const dreamsList = document.getElementById("dreams");

	let src = "https://cdn.glitch.com/44c8815a-b1b4-4987-be6b-edee7bec88bc%2Fthumbnails%2FUser_Avatar_2.png?1601318518008"

	async function Login(e){
		try{
			const res = await fetch('/login', { 
				method:'POST',
    				body:JSON.stringify({uname: Username, psw: Password}),
    				headers: {
      					'Content-Type': 'application/json'
    				}
			})
			const json = await res.json();
			if(json.newU){
				window.alert("New Account Created");
				populateList();
				loggedIn = true;
			}
			else if(json.login){
				window.alert("Login Successful");
				populateList();
				loggedIn = true;
			}
			else{
				window.alert("Wrong Password");
			}
		}
		catch( error) {
			console.error(error);
		}
	}

	async function Add(e){
		let newDream = dreamsForm.elements.dream.value;

		const res = await fetch('/add', {
			method:'POST',
			body:JSON.stringify({dream:newDream}),
			headers: {
				'Content-Type': 'application/json'
			}
   		})
		const json = await res.json();
		populateList();
		
		dreamsForm.reset();
		dreamsForm.elements.dream.focus();
	}

	async function Edit(e){
		let old = changeForm.elements.current.value;
		let Updated = changeForm.elements.new.value;

		const res = await fetch('/edit', {
			method: 'POST',
			body:JSON.stringify({old: old, new: Updated}),
			headers: {
				'Content-Type' : 'application/json'
			}
		})
		const json = await res.json();
		populateList();

		changeForm.reset();
	}
	
	function appendNewDream(dream, id ) {
  const newListItem = document.createElement("li");
  newListItem.innerText = dream;
  dreamsList.appendChild(newListItem);
  
  newListItem.onclick = async function(){
    	const res = await fetch('/delete', {
   			 method:'POST',
    			body:JSON.stringify({ id }),
    			headers: {
      			'Content-Type': 'application/json'
   			 }
    	})
	const json = await res.json();
    	newListItem.remove();
}
}


	async function populateList(){
		dreamsList.innertHTML = "";
		const res = await fetch('/pop', {
			method:'GET',
			headers: {
				'Content-Type' : 'application/json'
			}
		})
		const json = await res.json()
		for(var i=0; i< json.length; i++){
			appendNewDream(json[i].dream,json[i]._id)
		}
	}
</script>

<main>
	<p>
	<div>
		{#if loggedIn}
		<div style = "text-align: center;">
      			<form id = "new-entry">
        			<label>
          				New Enemy
         	 			<input name="dream" type="text" maxlength="100" required placeholder="New Entry">
        			</label>
        			<button on:click={Add}>Add To List</button><br>
        		</form>
        		<form id="edit-entry">
        			<label>
          				Edit List
            				<input name="current" type="text" maxlength="100" required placeholder="Old Name">
            				<input name="new" type="text" maxlength="100" required placeholder="New Name">
            				<button on:click={Edit}>
              				Change in List
          				</button>
        			</label>
        		</form>
      			<p>
        			Click on name To Delete
      			</p>
      
      <section class="dreams">
        <ul id="dreams" style = "text-align: center;list-style-type: none">
          <em>loading enemies&hellip;</em>
        </ul>
      </section>
        </div>
		{:else}
		<img {src} alt = "person icon in black circle"> <br>
  		<input type="text" placeholder="Username" bind:value={Username} /><br>
  		<input type="password" placeholder="Password" bind:value={Password} /><br>
  		<button on:click={Login}>Login</button>
	{/if}
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>