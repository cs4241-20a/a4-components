<script>
	import Login from './login.svelte'
	import Main from './main.svelte'

	let hiddenLogin, loginUsername, hiddenMain, mainUsername;

	$: if (loginUsername != null) {
		hiddenLogin = true;
		hiddenMain = false;
		mainUsername = loginUsername;
	}
</script>

<Login bind:hiddenLogin bind:loginUsername/>
<Main bind:hiddenMain bind:mainUsername/>