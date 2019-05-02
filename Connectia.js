'use strict';
const bp = require("body-parser");

module.exports = class Connectia {
    /**
     * Create a new instance of Connectia
     * @param {*} app Express app to be binded.
     */
    constructor(app) {
        if (!app) {
            throw new Error("App is not provided. (Undefined)")
        }

        // $ npm install body-parser
        app.use(bp.json())
        app.use(bp.urlencoded({
            extended: true
        }))

        // Bind post in express to Connectia
        app.post('/connectia.html', (req, res) => {
            this.call(req, res)
        })

        this.events = []
    }
    call(req, res) {
        try {
            var request = req.body
            if (this.events[request.callsign]) {
                this.events[request.callsign](request.message, (callsign, message) => {
                    res.end(JSON.stringify({
                        callsign: callsign,
                        message: message
                    }))
                })
            }
        } catch (e) {}
    }
    on(callsign, _callback) {
        this.events[callsign] = _callback
    }
}