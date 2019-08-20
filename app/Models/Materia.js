'use strict'

const mongoose = use('Mongoose')

let schema = mongoose.Schema({
  materia_Nombre:{type: String,require:true },
  grado_id:{type:Schema.Types.ObjectId, ref: 'Grado'},
  unidades:[{
    Num_unidad:{type: Number},
    Horas_de_unidad:{type:Number},
    Nombre_unidad:{type:String},
  }]

}, {
  timestamps: true
})

module.exports = mongoose.model('Materia', schema)
