'use strict'

const Alumno = use('App/Models/Alumno');

class AlumnoController {

  async VerAlumnos({response}){

    var obtenido;
    await Alumno.find({},function(err,datos){
      obtenido= datos;
    });
    return response.status(200).json(obtenido);
  }

  ActualizaAlumno({response}){
    
  }

  async GuardarAlumno({request, response}) {

    const { Nombre, Apellido_paterno, Apellido_materno, Fecha_nacimiento, Fotografia, Direccion, Curp, nombre_padre_tutor, telefono_padre_tutor } = request.all();
  
    var res1=Nombre.split("",2);
    var res2=Apellido_paterno.split("",2);
    var res3=Apellido_materno.split("",2);
    var fecha = new Date();

    var Concat=
    res1[0]+res1[1]+      //Nombre
    res2[0]+res2[1]+      //Ap. Paterno
    res3[0]+res3[1]+      //Ap. Materno
    fecha.getFullYear()+fecha.getMilliseconds();  //Año,Milisegundo
    var Matricula=Concat.toUpperCase();

    var Generacion=fecha.getFullYear();
    
    Matricula.toUpperCase();

    const alumno = new Alumno({
      Matricula,
      Nombre, 
      Apellido_paterno, 
      Apellido_materno, 
      Fecha_nacimiento, 
      Fotografia, 
      Direccion, 
      Generacion,
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
