'use strict'

const mongoose = use('Mongoose')

let schema = mongoose.Schema({
  Grado:{type:Schema.Types.ObjectId, ref: 'Grado'},
  Seccion:{type:Schema.Types.ObjectId, ref: 'Seccion'},
  Maestros:[{type:Schema.Types.ObjectId, ref:'Maestro'}],
  Alumnos:[{type:Schema.Types.ObjectId, ref:'Alumno'}],
  Materias:[{type:Schema.Types.ObjectId, ref:'Materia' }],
}, { 
  timestamps: true
})

module.exports = mongoose.model('Salon', schema)
