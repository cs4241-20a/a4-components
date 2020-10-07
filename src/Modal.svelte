<script>
  import { fade as fadeTransition } from "svelte/transition";

  import { time, resultModal } from "./stores.js";

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

  let fullname = "";
  let teamname = "";

  export let updateData;

  let toggle = () => ($resultModal = !$resultModal);

  function submitResult() {
    const lapData = JSON.stringify({
      laptime: $time,
      fullname: fullname,
      teamname: teamname,
    });

    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: lapData,
    })
      .then((response) => response.json())
      .then((json) => {
        toggle();
        updateData();
      });
  }

  function localRestart() {
    window.restartRace();
    toggle();
  }
</script>

<div>
  <Modal isOpen={$resultModal} transitionOptions={fadeTransition}>
    <ModalHeader>Submit Result</ModalHeader>
    <ModalBody>
      <Form>
        <FormGroup>
          <Label>Your lap time was <b>{$time}</b></Label>
        </FormGroup>
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            type="text"
            bind:value={fullname}
            invalid={fullname.length <= 0}
            readonly={false}
            placeholder="Gompei" />
        </FormGroup>
        <FormGroup>
          <Label>Team Name</Label>
          <Input
            type="text"
            bind:value={teamname}
            invalid={teamname.length <= 0}
            readonly={false}
            placeholder="WPI Racing" />
        </FormGroup>
      </Form>
    </ModalBody>
    <ModalFooter>
      <Button
        color="success"
        disabled={teamname.length <= 0 || fullname.length <= 0}
        on:click={() => submitResult()}>
        Submit
      </Button>
      <Button color="danger" on:click={() => localRestart()}>Retry</Button>
    </ModalFooter>
  </Modal>
</div>
