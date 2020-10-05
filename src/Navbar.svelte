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

  let isOpen = false;

  export let user;

  function handleUpdate(e) {
    isOpen = e.detail.isOpen;
  }
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
