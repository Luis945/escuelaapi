'use strict'

const mongoose = use('Mongoose')
var Schema = mongoose.Schema;
let schema = mongoose.Schema({
  Salon: {type: Schema.Types.ObjectId, ref: 'Salon'},
  Mensajes: [{ 
    Mensaje: { type: String}, 
    Emisor: {type: String}
  }]
}, { 
  timestamps: true
})

module.exports = mongoose.model('Chat', schema)
