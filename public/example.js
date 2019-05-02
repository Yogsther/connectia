// Create new connectia instance
var con = new Connectia();

// Example
function test(){
    con.emit("example", document.getElementById("test").value)
}

con.on("example", message => {
    document.body.innerHTML += "<br>Response: " + message
})