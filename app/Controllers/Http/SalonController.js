'use strict'
const Salon= use('App/Models/Salon');
const Alumno = use('App/Models/Alumno');
const Materia = use('App/Models/Materia');
const Maestro = use('App/Models/Maestro');

class SalonController {
    
    async setSalon ({response,request}) {
      console.log(request.all())
      var {Grado,Seccion,Ciclo,Maestro,Alumnos,Materias}= request.all();

      //se encuentran las materias dada una lista de ids
      var materiasAInsertar = [];
      await Materia.find({'_id': { $in: Materias}}, 
      function(err, docs) {
        materiasAInsertar = docs;
      });

      //se inserta a los alumnos calificaciones en 0 por cada unidad y materia
      //await no jala en un foreach :'( ahi dispensen el desmadre
      for (let i = 0; i < Alumnos.length; i++) {
        // var calificaciones;
        for (let j = 0; j < materiasAInsertar.length; j++) {
          var calificaciones;
          for (let k = 0; k < materiasAInsertar[j].unidades.length; k++) {
            calificaciones = {
              id_materia: materiasAInsertar[j]._id,
              unidad: materiasAInsertar[j].unidades[k].Num_unidad,
              calificacion: 0
            };
            await Alumno.findOneAndUpdate({_id: Alumnos[i]._id}, {$push: {calificaciones: calificaciones}});
          }
          
        }
        // console.log(calificaciones);
        // await Alumno.findOneAndUpdate({_id: Alumnos[i]._id}, {$push: {calificaciones: calificaciones}});
      }

      var salon= new Salon({
        Grado,
        Seccion,
        Ciclo,
        Maestro,
        Alumnos,
        Materias
      });
        await salon.save();
      return response.status(200).json("ok");
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

    async eliminarSalon({response,params}){
      await Salon.findByIdAndRemove(params.id).exec();
      await Salon.find({}).exec((err,salones)=>{
        return response.status(200).json({msg:'elemento eliminado',salones})
      });
    }
}

module.exports = SalonController
