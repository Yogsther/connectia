![img](img/banner.png)

# Connectia | Simple & Lightweight ajax framework for nodeJS.

## Usage, Server

Check out a full example here with a cookie-token-auth system https://github.com/Yogsther/connectia-example

    npm i connectia

```js
// Require Connectia
const Connectia = require("connectia")
// Create new instance of Connectia, with the path to your static files
// i.e your css, js and images
const con = new Connectia(__dirname + "/cdn");

// Server creates a listener with the callsign "get_user"
con.on("get_user", (message, emit) => {
    // Server gets the user via an example function: get_user
    // then sends that object back to the client
    emit("user", get_user(message.username))
})
```

## Usage, Client

For client side, provide Connectia.js in the ```<head>``` of your document:
```html
<!-- Connectia CDN -->
<script src="https://connectia.ygstr.com/client/Connectia.js"></script>
```

Then for your javascript, connect to the node server with a new instance of Connectia.
```js
// Create new connectia instance, optionally with an IP
var con = new Connectia();

// Client sends a request with the callsign "get_user" and
// attaches a string, "Yogsther"
con.emit("get_user", "Yogsther")

// Listener to an event with the callsign "user"
// Client gets an object: user and the console-logs it.
con.on("user", user => {
    console.log(user)
})
```
