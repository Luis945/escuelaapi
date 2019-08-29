'use strict'

class AlumnoController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(message) {
    this.socket.broadcast('message', message);
    console.log(message);
  }
}

module.exports = AlumnoController
