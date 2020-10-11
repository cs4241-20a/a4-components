<script>
    export let hiddenMain = true;
    export let mainUsername = null;

    let foodItems = [];

    $: if (!hiddenMain) {
        document.getElementById("mainDiv").hidden = false;
    }

    $: if (mainUsername != null) {
        getAllItems(mainUsername);
    }

    //Get all items for a user
    function getAllItems(username) {
        fetch("/data", {
            method: "POST",
            body: JSON.stringify({ username: username }),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then(function (data) {
                foodItems = data;
            });
    }

    //Edit a field using a prompt
function editField(event) {
    let textNode = event.target.parentElement.firstChild;
    let entryID = event.target.parentElement.parentElement.id;
    let newValue = window.prompt("Enter a new value", textNode.data);

    if (newValue == null) {
        return 0;
    }
    
    let data = {id: entryID};
    data[event.target.parentElement.className] = newValue;

    fetch('/update', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type":"application/json"}
    })
    .then(function(response) {
        if (response.ok) {
            textNode.data = newValue;
        }
    })
}

//Delete an item from the database and list
function deleteItem(e) {
    let row = e.target.parentElement.parentElement;
    fetch('/delete', {
        method: "POST",
        body: JSON.stringify({id: row.id}),
        headers: {"Content-Type":"application/json"}
    })
    .then(function(response) {
        if (response.ok) {
            let index = foodItems.findIndex(x => x._id === row.id);
            foodItems.splice(index, 1);
            foodItems = foodItems;
        }
    })
}


//Submits form data to the server
function submitFormData(e) {
    e.preventDefault();
    let data = {};
    data["username"] = mainUsername;
    
    let fields = document.getElementsByClassName("entry");
    for (let i = 0; i < fields.length; i++) {
        const element = fields[i];
        if (element.value === "") {
            window.alert("All fields must be fully filled out");
            return 0;
        } else {
            data[element.id] = element.value;
        }
    }

    fetch('/submit', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type":"application/json"}
    })
    .then(response => response.json())
    .then(function(data) {
        foodItems.push(data);
        foodItems = foodItems;
    });
}
</script>

<div id="mainDiv" hidden>
    <div>
        <h2>Food Tracker</h2>
    </div>
    <div class="mid">
        <form action="">
            <h4>Enter food info:</h4>
            <input id="food" class="entry" type="text" placeholder="Food" />
            <input
                id="calories"
                class="entry"
                type="number"
                placeholder="Calories" />

            <select id="meal" class="entry">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </select>

            <input id="time" class="entry" type="time" placeholder="Time" />
            <button title="Submit" id="submit" on:click={submitFormData}>Submit</button>
        </form>
    </div>

    <div>
        <table id="mealTable">
            <thead>
                <tr>
                    <th>Time Eaten</th>
                    <th>Food</th>
                    <th>Calories</th>
                    <th>Meal</th>
                    <th>Delete?</th>
                </tr>
            </thead>
            <tbody id="mealBody">
                {#each foodItems as food}
                    <tr id={food._id}>
                        <td class="time">
                            {(food.time.split(':')[0] > 12 ? food.time.split(':')[0] - 12 : food.time.split(':')[0] - 0) + ':' + food.time.split(':')[1] + ' ' + (food.time.split(':')[0] >= 12 ? 'PM' : 'AM')}
                        </td>
                        <td class="food">
                            {food.food}
                            <button title="Edit" class="edit" on:click={editField}>✎</button>
                        </td>
                        <td class="calories">
                            {food.calories}
                            <button title="Edit" class="edit" on:click={editField}>✎</button>
                        </td>
                        <td class = "meal">
                            {food.meal}
                            <button title="Edit" class="edit" on:click={editField}>✎</button>
                        </td>
                        <td>
                            <button title="Delete" class="delete" on:click={deleteItem}>✘</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
