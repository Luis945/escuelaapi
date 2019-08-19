'use strict'

const mongoose = use('Mongoose')

let schema = mongoose.Schema({
  grado_Nombre:{type: String,require:true },
  numero_grado:{type:Number,require:true, max:3},
}, {
  timestamps: true
})

module.exports = mongoose.model('Grado', schema)
