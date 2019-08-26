'use strict'

const Maestro = use('App/Models/Maestro');

class MaestroController {

  async VerMaestros(){
    var obtenido;
    await Maestro.find({}).exec((error,datos)=>{
      obtenido=datos;
    })

    return response.status(200).json(obtenido);
  }

  async ActualizaMaestro({response,request}){

    const {_id,Nombre,Apellido_paterno,Apellido_materno,Direccion,Telefono}= request.all();

    const Al= await Maestro.updateOne({_id:_id},
       {
         _id:_id,
         Nombre:Nombre,
         Apellido_paterno:Apellido_paterno,
         Apellido_materno:Apellido_materno,
         Direccion:Direccion,
         Telefono:Telefono
        }
      );

    return Al;
  }

  async RegistroMaestro({response,request}){

    var {Nombre,Apellido_paterno,Apellido_materno,Fecha_nacimiento,Rfc,Fotografia,Direccion,Telefono} = request.all();
    var nuevo= new Maestro({
      Nombre,
      Apellido_paterno,
      Apellido_materno,
      Fecha_nacimiento,
      Rfc,
      Fotografia,
      Direccion,
      Telefono
    });
    await nuevo.save();
    return response.status(200).json(nuevo);
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
