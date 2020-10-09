<script>
    import {
        ListGroup,
        ListGroupItem,
        Button,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
        FormGroup,
        Input,
        Label,
    } from 'sveltestrap';
    import {onMount} from 'svelte';

    let items = [];
    let new_item_text = '';
    let edit_item_text = '';
    let edit_item_id = '';

    function new_item() {
        fetch("/app/item", {method: 'POST', body: new_item_text})
            .then(() => update_items())
            .then(() => new_item_text = '');
    }

    function edit_item() {
        fetch("/app/item/" + edit_item_id, {method: 'PUT', body: edit_item_text})
            .then(() => update_items())
            .then(() => edit_item_text = '')
            .then(() => edit_item_id = '');
    }

    let open_create = false;
    let open_edit = false;
    const toggle_create = () => (open_create = !open_create);
    const toggle_edit = () => (open_edit = !open_edit);

    function start_edit_item(id) {
        edit_item_id = id;
        toggle_edit();
    }

    function delete_item(id) {
        fetch("/app/item/" + id, {method: 'DELETE'})
            .then(() => update_items());
    }

    function update_items() {
        fetch("/app/items")
            .then(r => r.json())
            .then(d => items = d);
    }

    onMount(() => {
        update_items();
    })
</script>

<main role="main" class="container">
    <br>
    <div class="jumbotron">
        <h2>To-Do List</h2>
        <p class="my-4">
            This web application allows you to manage a personal to-do list.
        </p>
        <Button block on:click={toggle_create}>Create New Item</Button>
        <br>
        {#if items.length !== 0}
            <ListGroup>
                {#each items as item}
                    <ListGroupItem>
                        { item.text }
                        <br>
                        <div style="text-align: right">
                            <Button outline color="info" on:click={() => start_edit_item(item.id)}>Edit</Button>
                            <Button outline color="danger" on:click={() => delete_item(item.id)}>Delete</Button>
                        </div>
                    </ListGroupItem>
                {/each}
            </ListGroup>
        {:else}
            <p>No Items in To-Do List!</p>
        {/if}
    </div>

    <Modal isOpen={open_create} {toggle_create}>
        <ModalHeader {toggle_create}>New Item</ModalHeader>
        <ModalBody>
            <FormGroup>
                <Label for="new_text">Item Content</Label>
                <Input id="new_text" bind:value={new_item_text} />
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" on:click={() => {toggle_create(); new_item();}}>Create</Button>
            <Button color="secondary" on:click={toggle_create}>Cancel</Button>
        </ModalFooter>
    </Modal>

    <Modal isOpen={open_edit} {toggle_edit}>
        <ModalHeader {toggle_edit}>Edit Item</ModalHeader>
        <ModalBody>
            <FormGroup>
                <Label for="edit_text">Item Content</Label>
                <Input id="edit_text" bind:value={edit_item_text} />
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" on:click={() => {toggle_edit(); edit_item();}}>Edit</Button>
            <Button color="secondary" on:click={toggle_edit}>Cancel</Button>
        </ModalFooter>
    </Modal>
</main>

<style>
</style>