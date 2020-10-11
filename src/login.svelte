<script>
    export let loginUsername = null;
    export let hiddenLogin = false;

    $: if (hiddenLogin) {
        document.getElementById("loginDiv").hidden = true;
    }

    //Tries to log in the user
    function login(e) {
        e.preventDefault();

        let data = {};
        data["username"] = document.getElementById("username").value;
        data["password"] = document.getElementById("password").value;

        fetch("/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        }).then(async function (response) {
            if (response.status === 200) {
                let json = await response.json();
                loginUsername = json.username;
            } else {
                window.alert("Incorrect username or password");
            }
        });
    }


    //Creates a new account
function newAccount(e) {
    e.preventDefault();

    let data = {};
    data["username"] = document.getElementById("newUsername").value;
    data["password"] = document.getElementById("newPassword").value;
    
    fetch('/newuser', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type":"application/json"}
    })
    .then(function(response) {
        if (response.ok) {
            window.alert("Created new account");
        } else {
            window.alert("Error creating new account");
        }
    })
}
</script>

<div id="loginDiv">
    <h1>Login</h1>
    <form action="">
        <div>
            <label for="username">Username:</label>
            <input id="username" type="text" name="username" />
        </div>
        <div>
            <label for="password">Password:</label>
            <input id="password" type="password" name="password" />
        </div>
        <div><button id="login" on:click={login}>Log In</button></div>
    </form>

    <div style="margin-top: 10rem;">
        <h3>Create a new account</h3>
        <p>
            (This password is stored in plaintext, don't use something
            important)
        </p>
        <form action="">
            <input
                id="newUsername"
                name="username"
                type="text"
                placeholder="New username" />
            <input id="newPassword" name="password" type="password" />
            <button id="create" on:click={newAccount}>Create</button>
        </form>
    </div>
</div>
