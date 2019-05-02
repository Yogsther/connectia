![img](img/banner.png)

# Connectia | Simple & Lightweight ajax framework for nodeJS.

## Usage, Server

Check out a full example here https://github.com/Yogsther/connectia-example

    npm i connectia

```js
const Connectia = require("connectia")
// Create new instance of Connectia, provide app from your express server
const con = new Connectia(app);

/* Example code */
con.on("login", (message, emit) => {
    // Get user info from mysql for example
    var user = getUser(message.username)
    // Send information to the client
    emit("login_success", {
        username: message.username
    })
})
```

## Usage, Client

For client side, provide Connectia.js in the ```<head>``` of your document:
```html
<script src="https://connectia.ygstr.com/public/Connectia.js"></script>
```


Then for your javascript, connect to the node server with a new instance of Connectia.
```js
// Create new connectia instance, optionally with an IP
var con = new Connectia();

// Emit a login example
con.emit("login", {
    username: username,
    password: password
})

// Example event
con.on("login_success", res => {
    console.log("Logged in as " + res.username)
})
```
