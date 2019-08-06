'use strict'

const mongoose = use('Mongoose')

let schema = mongoose.Schema({
  Nombre: {type: String,require:true },
  Apellido_paterno:{type: String,require:true},
  Apellido_materno:{type: String,require:true},
  Fecha_nacimiento:{type: Date},
  Rfc:{type: String, max:18  },
  Fotografia: {type:String},
  Datos_secundarios:[{
    tipo_sangre: {type:String, max:3},
    direccion: {type:String},
    curriculum: {type:String},
    telefono:{type:Number},
  }],
}, {
  timestamps: true
})

module.exports = mongoose.model('Maestro', schema)
