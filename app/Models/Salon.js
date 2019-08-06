'use strict'

const mongoose = use('Mongoose')

let schema = mongoose.Schema({
  Matricula:{type: String,require:true },
  Tutor:{type:Schema.Types.ObjectId, ref: 'Maestro'},
  Grado:{type: String, max:2},
  Seccion:{type:String,max:2},
  Maestros:[{type:Schema.Types.ObjectId, ref:'Maestro'}],
  Alumnos:[{type:Schema.Types.ObjectId, ref:'Alumno'}],
  Materias:[{  }],
}, {
  timestamps: true
})

module.exports = mongoose.model('Maestro', schema)
