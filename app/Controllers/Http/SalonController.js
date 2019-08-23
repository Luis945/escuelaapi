'use strict'

class SalonController {
    async setMateria ({response,request}) {
        var {materia_Nombre,unidades} = request.all();
        var save= new Materia({
          materia_Nombre,
          unidades
        });
        await save.save();
        return response.status(200).json({msg:'Su materia se ha agregado correctamente',unidades});
      }
}

module.exports = SalonController
