'use strict'

const mongoose = use('Mongoose')
var Schema = mongoose.Schema;

let schema = mongoose.Schema({
  Grado:{type: String,require:true },
  Seccion:{type: String,require:true },
  Alumnos:[{ type: Schema.Types.ObjectId, ref: 'Alumno' }],
  Materias:[{ type: Schema.Types.ObjectId, ref: 'Materia' }]
}, { 
  timestamps: true
})

module.exports = mongoose.model('Salon', schema)
