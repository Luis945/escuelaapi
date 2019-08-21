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
  return response.status(200).json({msg:'entró',obtenido});
}

  async GuardarAlumno({request, response}) {
    const { Matricula, Nombre, Apellido_paterno, Apellido_materno, Fecha_nacimiento, Fotografia, Direccion, Telefono, tipo_sangre, Curp, nombre_padre_tutor, telefono_padre_tutor } = request.all();

    const alumno = new Alumno({
      Matricula,
      Nombre, 
      Apellido_paterno, 
      Apellido_materno, 
      Fecha_nacimiento, 
      Fotografia, 
      Direccion, 
      Telefono,
      Datos_secundarios: {
        Curp, 
        nombre_padre_tutor, 
        telefono_padre_tutor
      }
    });

    alumno.save();
    return alumno;
  }

}

module.exports = AlumnoController
