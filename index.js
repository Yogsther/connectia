var express = require("express")
var http = require("http")

var app = express()
var server = http.createServer(app)

app.use(function (req, res, next) {
    if (req.url.indexOf("?") !== -1) {
        req.url = req.url.split("?")[0]
    }
    if (req.path.indexOf('.') === -1) {
        req.url += '.html'
        next()
    } else
        next()
})

// Express setup
app.use(express.static(__dirname + "/public"))
app.get("*", function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
})


// Create new instance of Connectia on server side
const Connectia = require("./Connectia.js")
const con = new Connectia(app);

/* Example code */
con.on("example", (message, emit) => {
    emit("example", message)
})

// Start server
server.listen(80)
console.log("Example started on port 80")