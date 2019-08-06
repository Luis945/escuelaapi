'use strict'

const Maestro = use('App/Models/Maestro');

class MaestroController {

  async guardarMaestro({response,request}){
    var {Nombre,Apellido_paterno,Apellido_materno} = request.all();
    var nuevo= new Maestro({
      Nombre,
      Apellido_paterno,
      Apellido_materno
    });
    await nuevo.save();
    return response.status(200).json({msg:'mandas',nuevo});
  }

  async  verMaestro({response}){
    var obtenido;
     await Maestro.find({},function (err,datos){
        obtenido=datos
      });
    return response.status(200).json({msg:'recibes',obtenido});
  }
}

module.exports = MaestroController
