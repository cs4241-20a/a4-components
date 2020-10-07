<script>
  import { fade as fadeTransition } from "svelte/transition";

  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
  } from "sveltestrap";

  import { editModal, id, fullname, teamname } from "./stores.js";

  export let updateData;

  let toggle = () => ($editModal = !$editModal);

  function submitUpdate() {
    const lapObject = JSON.stringify({
      id: $id,
      fullname: $fullname,
      teamname: $teamname,
    });

    fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: lapObject,
    }).then((_) => {
      toggle();
      updateData();
    });
  }
</script>

<Modal isOpen={$editModal} transitionOptions={fadeTransition}>
  <ModalHeader>Submit Result</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label>Full Name</Label>
        <Input
          type="text"
          bind:value={$fullname}
          invalid={fullname.length <= 0}
          readonly={false} />
      </FormGroup>
      <FormGroup>
        <Label>Team Name</Label>
        <Input
          type="text"
          bind:value={$teamname}
          invalid={teamname.length <= 0}
          readonly={false} />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button
      color="success"
      disabled={teamname.length <= 0 || fullname.length <= 0}
      on:click={() => submitUpdate()}>
      Submit
    </Button>
    <Button color="danger" on:click={() => toggle()}>Cancel</Button>
  </ModalFooter>
</Modal>
