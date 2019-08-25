'use strict'
const Salon= use('App/Models/Salon');
const Alumno = use('App/Models/Alumno');
const Materia = use('App/Models/Materia');
const Maestro = use('App/Models/Maestro');

class SalonController {
    
    async setSalon ({response,request}) {
        console.log(request.all())
        var {Grado,Seccion,Ciclo,Maestro,Alumnos,Materias}= request.all();
        var salon= new Salon({
          Grado,
          Seccion,
          Ciclo,
          Maestro,
          Alumnos,
          Materias
        });
         await salon.save();
        // return response.status(200).json("ok");
      }

    async setMaestro({response,request}){
      var {Nombre,Apellido_paterno,Apellido_materno,Fecha_nacimiento,Rfc}= request.all();
      var maestro = new Maestro({
        Nombre,Apellido_paterno,Apellido_materno,Fecha_nacimiento,Rfc
      });
      await maestro.save();
      return response.status(200).json(maestro);

    }  
    async getSalones ({response}){
      await Salon.find({}).populate('Materias').populate('Alumnos').populate('Maestro').exec((err,salones)=>{
        return response.status(200).json({msg:'Lista de salones',salones})
      });
    }

    async VerMaestros({response}){

      var maestros;
      await Maestro.find({},function(err,datos){
        maestros= datos;
      });
      return response.status(200).json(maestros);
    }
}

module.exports = SalonController
