const Connectia =  require("./connectia.js")
const con = new Connectia(__dirname /* + "/cdn" */);

con.on("get_test", (msg, emit) => {
    var bigString = ""
    for(i = 0; i < 1000000; i++){
        bigString+="VERY LONG STRING! "
    }
    emit("get_test", bigString)
})