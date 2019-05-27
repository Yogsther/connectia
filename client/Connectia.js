/* Connectia - client, Olle Kaiser 2019 */

class Connectia {

    /**
     * Create a new instance of Connectia
     * @param {*} ip IP Adress to connect to. Optional, leave it blank and the host name will be used! 
     */
    constructor(ip = location.protocol) {
        this.events = []
        this.requests = []
        this.ip = ip
    }

    /** 
     * Send a message the the server
     * @param {*} callsign Name of the message
     * @param {*} message Content, can be any type
     */
    emit(callsign, message) {
        this.requests.push(new Request(callsign, message, this))
    }

    /**
     * Create a listener
     * @param {*} callsign Name of the message
     * @param {*} _callback Callback that includes the message and optionally the callsign as a secondary parameter
     */
    on(callsign, _callback) {
        if (this.events[callsign]) console.warn("Override event: " + callsign)
        this.events[callsign] = _callback
    }
}

class Request {
    /**
     * Instance of an XMLHttpRequest via Connectia
     * @param {String} callsign Package title
     * @param {String} message Package load
     * @param {Connectia} _connectia Connectia instance
     */
    constructor(callsign, message, _connectia) {
        this.XML = new XMLHttpRequest()
        this.XML.onreadystatechange = () => {
            if (this.XML.readyState == 4 && this.XML.status == 200) {
                try {
                    var response = JSON.parse(this.XML.responseText)
                    response = {
                        callsign: decodeURIComponent(response.callsign),
                        message: decodeURIComponent(response.message)
                    }
                    if (_connectia.events[response.callsign]) _connectia.events[response.callsign](response.message, callsign)
                    else if (_connectia.events["*"]) _connectia.events["*"](response.message, callsign)

                    _connectia.requests.splice(_connectia.requests.indexOf(this), 1)
                } catch (e) {}
            }
        }
        this.XML.open("POST", _connectia.ip + "/connectia", true)
        this.XML.setRequestHeader("Content-Type", "application/json;charset=utf-8")
        callsign = encodeURIComponent(callsign)
        message = encodeURIComponent(message)
        this.XML.send(JSON.stringify({
            callsign,
            message
        }))
    }
}