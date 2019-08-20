'use strict'

class AuthController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = AuthController
