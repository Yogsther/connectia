const Connectia =  require("./connectia.js")
const con = new Connectia(__dirname /* + "/cdn" */);

con.on("*", (msg, emit, callsign) => {
    emit(callsign, msg)
})