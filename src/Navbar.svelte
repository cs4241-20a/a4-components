<script>
  import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    Form,
    Button,
  } from "sveltestrap";

  import { onMount } from "svelte";

  let isOpen = false;

  let user = {
    loggedIn: false,
    username: "",
  };

  function handleUpdate(e) {
    isOpen = e.detail.isOpen;
  }

  onMount(async () => {
    const res = await fetch("/auth/user");
    const results = await res.json();
    console.log(results);
    if (!results.failed) {
      user.loggedIn = true;
      user.username = results.username;
    } else {
      user.loggedIn = false;
      user.username = "";
    }
  });
</script>

<Navbar color="dark" dark="false" light="true" expand="md">
  <NavbarBrand href="/">sveltecar</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ml-auto" navbar>
      {#if !user.loggedIn}
        <Form class="form-inline" action="/auth/github">
          <Button color="primary">
            Log In with GitHub
            <i class="fab fa-github" />
          </Button>
        </Form>
      {/if}
      {#if user.loggedIn}
        <span class="navbar-text mr-2 text-light">
          Welcome,
          {user.username}!
        </span>
        <Form class="form-inline" action="/auth/logout">
          <Button color="danger">
            Log Out
            <i class="fas fa-sign-out-alt" />
          </Button>
        </Form>
      {/if}
    </Nav>
  </Collapse>
</Navbar>
