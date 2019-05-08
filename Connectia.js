/* Connectia - server, Olle Kaiser 2019 */

'use strict';
const bp = require("body-parser");
const express = require("express");
const http = require("http");

module.exports = class Connectia {
    /**
     * Create a new instance of Connectia
     * @param {String} static Location of your static files
     * @param {*} port Port to run on, default 80
     * @param {Object} options Express app options e.g SSL
     */
    constructor(static_location, port = 80, options = {}) {

        if (!static_location) throw new TypeError("Static not provided. It needs to be the location for your static files.")

        this.app = express();
        this.app.use(bp.json())
        this.app.use(bp.urlencoded({
            extended: true
        }))

        this.app.use(function (req, res, next) {
            if (req.url.indexOf("?") !== -1) {
                req.url = req.url.split("?")[0];
            }
            if (req.path.indexOf('.') === -1) {
                req.url += '.html';
                next();
            } else
                next();
        });

        this.app.use(express.static(static_location));
        this.app.get("*", function (req, res) {
            res.sendFile(static_location + '/index.html');
        })

        this.server = http.createServer(options, this.app);
        this.server.listen(port);

        // Bind post in express to Connectia
        this.app.post('/connectia.html', (req, res) => {
            this.call(req, res)
        })

        this.events = []

        console.log(`Connectia started on port: ${port}`)
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