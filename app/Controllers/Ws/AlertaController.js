'use strict'
var conteo=0;

class AlertaController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  onMessage(mesage){
    this.socket.broadcast('message',mesage);
  }
}

module.exports = AlertaController
