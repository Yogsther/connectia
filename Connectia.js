/* Connectia - server, Olle Kaiser 2019 */

'use strict';
const bp = require("body-parser");
const express = require("express");
const http = require("http");
const colors = require("colors");
const cookie = require("cookie-parser")

module.exports = class Connectia {
    /**
     * Create a new instance of Connectia
     * @param {String} static Location of your static files (i.e, js / css / static html)
     * @param {*} port Port to run on, default 80
     * @param {Boolean} using_staic_html If you are using static html (for pug it would be false)
     * @param {Object} options Express app options e.g SSL
     */
    constructor(static_location, port = 80, using_staic_html = true, options = {}) {

        this.app = express();
        this.app.use(bp.json())
        this.app.use(bp.urlencoded({
            extended: true
        }))

        this.app.use(cookie());

        this.app.use((req, res, next) => {
            if (req.url.indexOf("?") !== -1) {
                req.url = req.url.split("?")[0];
            }
            if(req.url == "/") next();
            else if (req.path.indexOf('.') === -1) {
                req.url += '.html';
                next();
            } else next();
        });

        this.app.use(express.static(static_location))
        if (using_staic_html) {
            this.app.get("/", (req, res) => {
                res.sendFile(static_location + '/index.html');
            })
        }

        this.server = http.createServer(options, this.app);
        this.server.listen(port);

        // Bind post in express to Connectia
        this.app.post('/connectia.html', (req, res) => {
            this.call(req, res)
        })

        this.events = []

        console.log(`
/~  _  _  _  _  __|_. _ 
\\_,(_)| || |(/_(_ | |(_|

... has started on port: ${port}
  > ${(using_staic_html ? "Using" : "Not using")} static html.
  > ${static_location}
`.red)
    }
    /* Recivies a raw post request and handles it. */
    call(req, res) {
        try {
            var request = req.body
            // Make sure event exists, otherwise ignore it.
            if (this.events[request.callsign]) {
                // Call event with the message and an emitter function
                this.events[request.callsign](request.message, (callsign, message, req, res) => {
                    res.end(JSON.stringify({
                        callsign: callsign,
                        message: message
                    }), res);
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