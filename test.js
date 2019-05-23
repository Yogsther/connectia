const Connectia =  require("./connectia.js")
const con = new Connectia(__dirname /* + "/cdn" */);

var bigString = ""
for(i = 0; i < 10000; i++){
    bigString+="VERY LONG STRING! "
}

con.on("*", (msg, emit, callsign) => {
    emit(callsign, bigString)
    console.log({
        callsign: callsign,
        msg: msg
    })
})
