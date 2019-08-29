'use strict'
const Alerta = use('App/Models/Alerta');
const Alumno = use('App/Models/Alumno');
const Materia = use('App/Models/Materia');
const Maestro = use('App/Models/Maestro');
const Salon= use('App/Models/Salon');

const mongoose = use('Mongoose')
var Schema = mongoose.Schema;

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
    await Alerta.find({'maestro':maestro}).populate('maestro').populate('alumno').sort({updatedAt: 'desc'}).exec((err,data)=>{

      return response.status(200).json({msg:'alertas de maestro',data});
    });
  }
  async find_maestro({response,params}){

    await Alerta.find({'maestro':params.id}).populate('maestro').populate('alumno').sort({updatedAt: 'desc'}).exec((err,data)=>{

      return response.status(200).json({msg:'alertas de maestro',data});
    });
  }
  async find_alumno({response,params}){
    await Alerta.find({'alumno':params.id}).populate('maestro').populate('alumno').sort({updatedAt: 'desc'}).exec((err,data)=>{
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
    await Alerta.find({'maestro':params.maestro}).populate('maestro').populate('alumno').sort({updatedAt: 'desc'}).exec((err,alertas)=>{
    return response.status(200).json({msg:'elemento eliminado',alertas})
  });
  }
  async getsalonProfe({response,params}){

    await Salon.find({'Maestro':params.id}).populate('Alumnos').exec((err,salones)=>{

      return response.status(200).json({msg:'lista de alumnos',salones});
    });
  }
  async getsalonAlumno({response,params}){
    await Salon.find({'Alumnos':{$in:[params.id]}}).populate('Alumnos').exec((err,data)=>{

      return response.status(200).json({msg:'salon',data});
    });
  }
}

module.exports = AlertaController
