/* Connectia - server, Olle Kaiser 2019 */

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
    /* Recivies a raw post request and handles it. */
    call(req, res) {
        try {
            var request = req.body
            // Make sure event exists, otherwise ignore it.
            if (this.events[request.callsign]) {
                // Call event with the message and an emitter function
                this.events[request.callsign](request.message, (callsign, message) => {
                    res.end(JSON.stringify({
                        callsign: callsign,
                        message: message
                    }))
                })
            }
        } catch (e) {}
    }
    /**
     * Create an event listener
     * @param {*} callsign Name of the messsage
     * @param {*} _callback Callback function (message, emit)
     */
    on(callsign, _callback) {
        this.events[callsign] = _callback
    }
}