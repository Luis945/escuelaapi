'use strict'

const mongoose = use('Mongoose')

let schema = mongoose.Schema({
  Matricula:{type:String, max:10},
  Nombre:{type: String,require:true },
  Apellido_paterno:{type: String,require:true},
  Apellido_materno:{type: String,require:true},
  Fecha_nacimiento:{type: Date},
  Fotografia: {type:String},
  Direccion: {type:String},
  Telefono: {type:Number},
  Datos_secundarios:[{
    tipo_sangre: {type:String, max:3},
    Curp:{type: String, max:18},
    nombre_padre_tutor:{type:String},
    telefono_padre_tutor:{type:Number},
  }],
}, {
  timestamps: true
})

module.exports = mongoose.model('Alumno', schema)
