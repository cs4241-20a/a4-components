<script>
  import Navbar from "./Navbar.svelte";
  import Canvas from "./Canvas.svelte";
  import Hud from "./Hud.svelte";

  import { onMount } from "svelte";

  let matchSize;

  let user = {
    loggedIn: false,
    username: "",
  };

  onMount(async () => {
    const res = await fetch("/auth/user");
    const results = await res.json();
    if (!results.failed) {
      user.loggedIn = true;
      user.username = results.username;
    } else {
      user.loggedIn = false;
      user.username = "";
    }
  });
</script>

<style>
  .full-height {
    flex: 1 1 auto;
    z-index: 1;
  }
</style>

<div class="d-flex flex-column min-vh-100">
  <Navbar {user} />
  {#if user.loggedIn}
    <div
      bind:this={matchSize}
      class="full-height d-flex align-items-end flex-row justify-content-center">
      <Hud />
    </div>
  {/if}
  {#if !user.loggedIn}
    <div class="full-height d-flex align-items-center flex-row justify-content-center">
      <h1>Please Log In</h1>
    </div>
  {/if}
</div>
{#if user.loggedIn}
  <Canvas {matchSize} />
{/if}
