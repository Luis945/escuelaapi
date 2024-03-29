'use strict'

const mongoose = use('Mongoose')
var Schema = mongoose.Schema;

let schema = mongoose.Schema({
  Matricula:{type:String, max:10},
  Nombre:{type: String,require:true },
  Apellido_paterno:{type: String,require:true},
  Apellido_materno:{type: String,require:true},
  Fecha_nacimiento:{type: Date},
  Status:{type:String},
  Fotografia: {type:String},
  Direccion: {type:String},
  Generacion:{type:String},
  Datos_secundarios:[{
    tipo_sangre: {type:String, max:3},
    Curp:{type: String, max:18},
    nombre_padre_tutor:{type:String},
    telefono_padre_tutor:{type:Number},
  }],
  calificaciones:[{
    id_materia: { type: Schema.Types.ObjectId, ref: 'Materia' },
    unidad: { type: Number },
    calificacion: { type: Number}
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Alumno', schema)
