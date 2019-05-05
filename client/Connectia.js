/* Connectia - client, Olle Kaiser 2019 */

class Connectia {
    /**
     * Create a new instance of Connectia
     * @param {*} ip IP Adress to connect to. Optional, leave it blank and the host name will be used! 
     */
    constructor(ip = location.href.substr(0, location.href.indexOf(location.pathname))) {
        this.events = [];
        this.ip = ip;

        this.XML = new XMLHttpRequest();
        this.XML.onreadystatechange = () => {
            if (this.XML.readyState == 4 && this.XML.status == 200) {
                try{
                    var response = JSON.parse(this.XML.responseText);
                    if(this.events[response.callsign]) this.events[response.callsign](response.message);
                } catch(e){}
            }
        }
    }
    /** 
     * Send a message the the server
     * @param {*} callsign Name of the message
     * @param {*} message Content, can be any type
     */
    emit(callsign, message){  
        this.XML.open("POST", this.ip+"/connectia", true);
        this.XML.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.XML.send(JSON.stringify({
            callsign: callsign,
            message: message
        }));
    }
    /**
     * Create a listener
     * @param {*} callsign Name of the message
     * @param {*} _callback Callback that includes the message
     */
    on(callsign, _callback){
        this.events[callsign] = _callback;
    }
}