'use strict'
const Salon= use('App/Models/Salon');

class SalonController {
    
    async setSalon ({response,request}) {
        console.log('entroooooooooooo');
        var {Grado,Seccion,Maestros,Alumnos,Materias}= request.all();

        console.log(request.all());

        var salon= new Salon({
          Grado,
          Seccion,
          Maestros,
          Alumnos,
          Materias
        });
         await salon.save();
        // return response.status(200).json("ok");
      }
}

module.exports = SalonController
