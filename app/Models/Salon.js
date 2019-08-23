'use strict'

const mongoose = use('Mongoose')

let schema = mongoose.Schema({
  Grado:{type: String,require:true },
  Seccion:{type: String,require:true },
  Alumnos:[{type:String,require:true}],
  Materias:[{ type:String,require:true}]
}, { 
  timestamps: true
})

module.exports = mongoose.model('Salon', schema)
