'use strict'

const Alumno = use('App/Models/Alumno');

class AlumnoController {
async guardarMaestro({response,request}){
  const {Nombre,Apellido_paterno,Apellido_materno} = request.all();
  const nuevo = new Alumno({
    Nombre,
    Apellido_paterno,
    Apellido_materno,
  });

}
async verMaestro({response}){
  var obtenido;
  await Alumno.find({},function(err,datos){
    obtenido= datos;
  });
  return response.status(200).json({msg:'entró',obtenido}).
}

}

module.exports = AlumnoController
