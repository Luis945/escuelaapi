'use strict'

const mongoose = use('Mongoose')

let schema = mongoose.Schema({
  seccion_Nombre:{type: String,require:true,max:3 },


}, {
  timestamps: true
})

module.exports = mongoose.model('Seccion', schema)
