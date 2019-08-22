'use strict'
const Materia = use('App/Models/Materia');

class MateriaController {

async showAll({response}){
  var materias;
  await Materia.find({},(err,data)=>{
    materias=data;
  });
  return response.status(200).json({msg:'Show All',materias});
}
async showName({response}){
  var materias;
  var query= Materia.find({}).select('materia_Nombre ');
   await query.exec(function (err, someValue) {
    if (err) return next(err);
    materia= someValue
    });
  return response.status(200).json({msg:'Show All',materias});
}

async setMateria ({response,request}) {
  var {materia_Nombre} = request.all();
  var save = new Materia({materia_Nombre});
  await save.save();
  return response.status(200).json({msg:'Last data',save});
}

async saveUnidades({response,request}){
  var getMateria;
  var {id,Num_unidad,Horas_de_unidad,Nombre_unidad}= request.all();
  await Materia.findById(id,(err,materia)=>{
    getMateria = materia;
  });
  var setUnidades=[Num_unidad,Horas_de_unidad,Nombre_unidad];
  getMateria.unidades.push(setUnidades);
  await getMateria.save()
  return response.status(200).json({msg:'Materia Complete',nuevo});
}


}

module.exports = MateriaController
