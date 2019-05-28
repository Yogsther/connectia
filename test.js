const Connectia =  require("./connectia.js")
const con = new Connectia(__dirname /* + "/cdn" */);

con.on("*", (msg, emit, callsign) => {
    emit(callsign, msg)
})

con.on("word-test", (msg, emit) => {
    emit("word-test", msg)
})