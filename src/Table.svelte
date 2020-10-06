<script>
  import { Table, Button } from "sveltestrap";

  import Edit from "./Edit.svelte";

  import { editModal } from "./stores.js";

  let data = [];

  export function updateData() {
    fetch("/results", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        data = json.results;
        console.log(json.results);
      });
  }

  updateData();

  let id;
  let fullname;
  let teamname;

  let table;

  export function scrollToTable() {
    table.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  function editEntry(_id, _fullname, _teamname) {
    id = _id;
    fullname = _fullname;
    teamname = _teamname;
    $editModal = true;
  }

  function deleteEntry(_id) {
    const lapObject = JSON.stringify({ id: _id });

    fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: lapObject,
    }).then((_) => {
      updateData();
    });
  }
</script>

<style>
  th,
  td {
    text-align: center;
  }
</style>

<Table dark={true} striped={true} hover={true}>
  <thead bind:this={table}>
    <tr>
      <th>Position</th>
      <th>Username</th>
      <th>Full Name</th>
      <th>Team Name</th>
      <th>Lap Time</th>
      <th>Modify</th>
    </tr>
  </thead>
  <tbody>
    {#each data as { username, fullname, teamname, laptime, mine, _id }, i}
      {#if mine}
        <tr style="font-weight:bold">
          <td>P{i + 1}</td>
          <td>{username}</td>
          <td>{fullname}</td>
          <td>{teamname}</td>
          <td>{laptime}</td>
          <td>
            <Button
              color={'primary'}
              on:click={() => editEntry(_id, fullname, teamname)}>
              Edit
            </Button>
            <Button color={'danger'} on:click={() => deleteEntry(_id)}>
              Remove
            </Button>
          </td>
        </tr>
      {/if}
      {#if !mine}
        <tr>
          <td>P{i + 1}</td>
          <td>{username}</td>
          <td>{fullname}</td>
          <td>{teamname}</td>
          <td>{laptime}</td>
          <td>
            <Button disabled>Edit</Button>
            <Button disabled>Remove</Button>
          </td>
        </tr>
      {/if}
    {/each}
  </tbody>
</Table>
<Edit {updateData} {id} {fullname} {teamname} />
