'use strict'

const mongoose = use('Mongoose')
var Schema = mongoose.Schema;

let schema = mongoose.Schema({
  alumno:{ type: schema.Types.ObjectId, ref: 'Alumno' },
  maestro:{ type: schema.Types.ObjectId, ref: 'Maestro'},
  Titulo:String,
  Descripcion:String,
  Estado:String


},{
  timestamps: true
})

module.exports = mongoose.model('Alertas', schema)
