<script>
	import login from './login.svelte'
	import tasks from './tasks.svelte'

	let userName;
	let signedOut;
	let showTasks = false;
	let page;
	let val = null;

	const user = function() {
    fetch('/userpage', {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
      console.log("Hi!" + json.user)
			val = json.user
			console.log("Val: " + val)
      return (json.user)
    })
		.then(function(user) {
			console.log(user)
			if( val !== undefined) {
				console.log(val)
				console.log("Logged in")
				page = tasks
			}
			else {
				console.log("Not Logged in")
				page = login;
			}
		})
	}

	let promise = user()

</script>

<svelte:component this={page} />

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
