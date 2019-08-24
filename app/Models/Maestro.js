'use strict'

const mongoose = use('Mongoose')

let schema = mongoose.Schema({
  Nombre: {type: String,require:true },
  Apellido_paterno:{type: String,require:true},
  Apellido_materno:{type: String,require:true},
  Fecha_nacimiento:{type: Date},
  Rfc:{type: String, max:18  },
  Fotografia: {type:String},
  Direccion: {type:String},
  curriculum: {type:String},
  Telefono:{type:Number},
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('Maestro', schema)
