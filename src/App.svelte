<script>
	import login from './login.svelte'
	import tasks from './tasks.svelte'

	let userName;
	let showTasks = false;

</script>

<!-- <svelte:component this={login} /> -->
<svelte:component this={tasks} />

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
