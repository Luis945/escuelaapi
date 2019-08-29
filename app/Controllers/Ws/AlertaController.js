'use strict'
var conteo=0;

class AlertaController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  onMessage(){
    this.socket.broadcastToAll('alerta','hola');
  }
}

module.exports = AlertaController
