![img](img/banner.png)

# Connectia | Simple & Lightweight ajax framework for nodeJS.

Simple webserver with ajax support, powered by Express.

**Features**
* Easy and intuative ajax features
* JSON and URI encoded for sending any variable type
* Support for special characters (åäö) in contents
* Minimal code required to get started
* Lightweight
* URL extention shortener (/home.html and /home works)

## Usage, Server

Check out a full example here with a cookie-token-auth system https://github.com/Yogsther/connectia-example

    npm i connectia

```js
const Connectia = require("connectia")
const con = new Connectia(__dirname + "/cdn");

con.on("greeting", (message, emit) => {
    emit("greeting", `Hello ${message.username}!`)
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
var con = new Connectia();

con.emit("greeting", {
    username: "Yogsther"
})

con.on("greeting", message => {
    console.log(message) // Hello Yogsther!
})
```
