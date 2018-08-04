"use strict";

let app = require('./app');

/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(process.env.PORT || '9020');

/**
 * start app
 */
app.listen(port, function () {
  console.log("listening on port " + port)
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}