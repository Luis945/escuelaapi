'use strict'
const Salon= use('App/Models/Salon');
const Alumno = use('App/Models/Alumno');
const Materia = use('App/Models/Materia');

class SalonController {
    
    async setSalon ({response,request}) {
        console.log(request.all())
        var {Grado,Seccion,Ciclo,Maestros,Alumnos,Materias}= request.all();
        var salon= new Salon({
          Grado,
          Seccion,
          Ciclo,
          Alumnos,
          Materias
        });
        await salon.save();
        return response.status(200).json(salon);
      }
    async getSalones ({response}){
      await Salon.find({}).populate('Materias').populate('Alumnos').exec((err,salones)=>{
        return response.status(200).json({msg:'Lista de salones',salones})
      });
    }
}

module.exports = SalonController
