'use strict'
const Salon= use('App/Models/Salon');
const Alumno = use('App/Models/Alumno');
const Materia = use('App/Models/Materia');
const Maestros = use('App/Models/Maestro');
const Chat = use('App/Models/Chat');

class SalonController {
    
    async setSalon ({response,request}) {
      
        //console.log(request.all())
        var {Grado,Seccion,Ciclo,Maestro,Alumnos,Materias}= request.all();
        var salon= new Salon({
          Grado,
          Seccion,
          Ciclo,
          Maestro,
          Alumnos,
          Materias
        });

        //console.log("-------------------------------------------------------------");
        //console.log("-------------------------------------------------------------");
        //console.log("-------------------------------------------------------------");
        //console.log(salon);

        //console.log("-------------------------------------------------------------");
        //console.log("-------------------------------------------------------------");
        //console.log("-------------------------------------------------------------");

        var _idchido;
        var _idprofe;
        for (let index = 0; index < salon.Alumnos.length; index++) {
          const element = salon.Alumnos[index];
          _idchido = element;
          Alumno.findById(element, function (err, alumnito) {
            console.log("aqui")
            console.log(alumnito.Nombre);
         
          });

          await Alumno.updateOne({ _id:_idchido }, { Status: 'asignado' });

        }
        console.log(salon.Maestro+"holaalalofjaeuihg")
        var _idprofe = salon.Maestro
        await Maestros.findOneAndUpdate({ _id:_idprofe}, { Status: 'asignado' });
      

          


        //hasta aqui es mio octavioooooooooooooooooooooooooooo

         //se encuentran las materias dada una lista de ids
      var materiasAInsertar = [];
      await Materia.find({'_id': { $in: Materias}}, 
      function(err, docs) {
        materiasAInsertar = docs;
      });

      //se inserta a los alumnos calificaciones en 0 por cada unidad y materia
      //await no jala en un foreach :'( ahi dispensen el desmadre
      for (let i = 0; i < Alumnos.length; i++) {
        //console.log("-------------------------------------------------------------");
        //console.log("ITERANDO EL ARREGLO DE ALUMNOS QUE CONTIENE:");
        //console.log(Alumnos);
        //console.log("ITERANDO EL ARREGLO DE ALUMNOS QUE CONTIENE");
        for (let j = 0; j < materiasAInsertar.length; j++) {
          var calificaciones;
        //  console.log("-------------------------------------------------------------");
        //console.log("ITERANDO EL ARREGLO DE MATERIAS QUE CONTIENE:");
        //console.log(materiasAInsertar);
        //console.log("ITERANDO EL ARREGLO DE MATERIAS QUE CONTIENE");
        //console.log("-------------------------------------------------------------");
          for (let k = 0; k < materiasAInsertar[j].unidades.length; k++) {
            calificaciones = {
              id_materia: materiasAInsertar[j]._id,
              unidad: materiasAInsertar[j].unidades[k].Num_unidad,
              calificacion: 0
            };

          //  console.log("ITERANDO EL ARREGLO DE UNIDADES QUE CONTIENE:");
          //console.log(materiasAInsertar[j].unidades);
          //console.log("ITERANDO EL ARREGLO DE UNIDADES QUE CONTIENE");
          //console.log("-------------------------------------------------------------");
          //console.log("PREVIO A GUARDAR");
          //  console.log(calificaciones);
          //console.log("PREVIO A GUARDAR");
          //console.log("-------------------------------------------------------------");
            await Alumno.findOneAndUpdate({_id: Alumnos[i]._id}, {$push: {calificaciones: calificaciones}});
            //console.log("materia guardada???");
          }
          
        }
        // console.log(calificaciones);
        // await Alumno.findOneAndUpdate({_id: Alumnos[i]._id}, {$push: {calificaciones: calificaciones}});
      }

        // await salon.save();
        await salon.save(function (err) {
          //console.log(err)
          const chatin = new Chat({
            Salon: salon._id,
            Mensajes: [{
              Mensaje: "Bienvenido al grupo de chat del salón de su hij@. Aquí puede hablar con otros padres y con el profesor",
              Emisor: "Administración"
            }]
          });

          chatin.save(function (err) {
            //console.log(err)
            // thats it!
          });
          // saved!
        });
        return salon;
          
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
    async getAlumnos({response}){
      var obtenido;
      await Alumno.find({Status:'sin_asignar'}).exec((error,datos)=>{
        obtenido=datos;
        //console.log(obtenido)
      })
  
      return response.status(200).json(obtenido);
    }

    async eliminaralumnosalon ({response,params,request}){
      var alumnos;
      var salon= request.all();
       alumnos = salon.Alumnos;
      //console.log(params.id)
      await Salon.updateOne({_id: salon._id},{ $pullAll: {Alumnos: [params.id] }})
      //console.log('llego aqui')
      
      return  response.status(200).json(salon);

      
    }

    async getMaestros({response}){
      var obtenido;
      await Maestros.find({Status:'sin_asignar'}).exec((error,datos)=>{
        obtenido=datos;
        console.log(obtenido)
      })
  
      return response.status(200).json(obtenido);
    }
}

module.exports = SalonController
