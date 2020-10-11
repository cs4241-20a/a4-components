<script>
    const performLogin = function( e ) {
        e.preventDefault();

        fetch('/login', {
            method:'GET'
        })
        .then( response => response.json() )
        .then( url => {
            window.location.href=url
        })

        return false;
    }


    window.onload = function() {
        const button = document.querySelector( '#loginButton' )
        button.onclick = performLogin
    }
</script>

<html lang="en">

<head>
    <title>Golf Club Tracker - Login</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/yegor256/tacit@gh-pages/tacit-css-1.5.1.min.css"/>
    <script src="login.js" defer></script>
</head>

<body>
    <section>
        <div class="centeredItem">
            <div style="text-align:center;" id="content-wrapper">
                <h1 style="font-size:400%;" id="loginTitle">Golf Club Tracker</h1>
                <br>
                <button style="font-size:200%; color:blue;" id="loginButton">Login via GitHub</button>
            </div>
        </div>
    </section>
</body>
</html>