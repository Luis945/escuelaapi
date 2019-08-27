'use strict'
const Alerta = use('App/Models/Alerta');
const Alumno = use('App/Models/Alumno');
const Materia = use('App/Models/Materia');
const Maestro = use('App/Models/Maestro');


class AlertaController {
  async show({response}){
    await Alertas.find({}).populate('Maestro').populate('Alumno').exec((err,data)=>{
      return response.status(200).json({msg:'data',data});
    });
  }
  async save({response,request}){
    var { alumno,maestro,Titulo,Descripcion,Estado} = request.all();
    var nuevo = new Alerta({
      alumno,
      maestro,
      Titulo,
      Descripcion,
      Estado,
    });
    await nuevo.save();
    return response.status(201).json({msg:'guardado',nuevo});
  }
  async find_maestro({response,params}){
   await Alerta.find({'maestro':params.id}).populate('Maestro').populate('Alumno').exec((err,data)=>{
     return response.status(200).json({msg:'alertas de maestro',data});
   })
  }
  async find_alumno({response,params}){
    await Alerta.find({'alumno':params.id}).populate('Maestro').populate('Alumno').exec((err,data)=>{
      return response.status(200).json({msg:'alertas de alumno',data});
    })
  }
  async edit({response,request}){
    var { id,alumno,maestro,Titulo,Descripcion,Estado} = request.all();
    await Alerta.findOne({'_id':id}).exec((err,alerta)=>{
      alerta.alumno=alumno;
      alerta.Titulo=Titulo;
      alerta.Descripcion=Descripcion;
      alerta.Estado=Estado;
      alerta.save();
    });

    await Alertas.find({}).exec((err,data)=>{
      return response.status(200).json({msg:'data',data});
    });

  }
  async remove({response,params}){
    await Alerta.findByIdAndRemove(params.id).exec();
    await Alerta.find({}).exec((err,alertas)=>{
    return response.status(200).json({msg:'elemento eliminado',alertas})
  });
  }
}

module.exports = AlertaController
