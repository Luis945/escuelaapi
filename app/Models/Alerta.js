'use strict'

const mongoose = use('Mongoose')
var Schema = mongoose.Schema;

let schema = mongoose.Schema({
  alumno:{ type: Schema.Types.ObjectId, ref: 'Alumno' },
  maestro:{ type: Schema.Types.ObjectId, ref: 'Maestro'},
  Titulo:String,
  Descripcion:String,
  Estado:String


},{
  timestamps: true
})

module.exports = mongoose.model('Alerta', schema)
