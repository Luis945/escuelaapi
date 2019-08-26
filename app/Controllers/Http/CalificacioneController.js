'use strict'

const Salon= use('App/Models/Salon');
const Alumno = use('App/Models/Alumno');
const Materia = use('App/Models/Materia');




class CalificacioneController {

    async Calificar({request, response}) {
        const { calificaciones } = request.all();

        for (let i = 0; i < calificaciones.length; i++) {
            // console.log("---------------------");
            // console.log(calificaciones[i].Matricula);
            // console.log("---------------------");
            // console.log(calificaciones[i].id_materia);
            // console.log("---------------------");
            // console.log(calificaciones[i].unidad);
            // console.log("---------------------");
            // console.log(calificaciones[i].calificacion);
            // console.log("---------------------");
            await Alumno.findOneAndUpdate({
                Matricula: calificaciones[i].Matricula, 
                calificaciones: {
                    $elemMatch: {
                        id_materia: calificaciones[i].id_materia, 
                        unidad: calificaciones[i].unidad
                    }
                }
            },
            {$set: {'calificaciones.$.calificacion': calificaciones[i].calificacion}},
            {'new': true, 'safe': true, 'upsert': true});
        }

        return response.status(200).json({
            salon: "calificao"
        });

    }

    async GetAlumnos({response, request, params}) {
        var { grado, seccion, ciclo, materia } = params;
        var salon;
        var materias = [];

        // var { grados, seccions, ciclos, materias } = request.all();

        salon = await Salon.findOne({Grado: grado, Seccion: seccion, Ciclo: ciclo}).populate('Alumnos');//.populate('Materias');

        salon['Alumnos'].forEach(alumno => {

            // console.log(alumno)
            alumno.calificaciones = alumno.calificaciones.filter((calificacion) => {
                return calificacion.id_materia == materia;
            })
        })

        return response.status(200).json({
            salon: salon
        });
    }

    async insertpipi({request, response}) {
        var {id, matricula, unidad} = request.all();

        await Alumno.findOneAndUpdate({Matricula: matricula, calificaciones: {$elemMatch: {id_materia: id, unidad: unidad}}},
            {$set: {'calificaciones.$.calificacion': 6}}, // list fields you like to change
            {'new': true, 'safe': true, 'upsert': true});

        // var aluw = await Alumno.findById(id,(err,materia)=>{
        //     getMateria = materia;
        // });

        return response.status(200).json({
            salon: 200
        });
    }


}

module.exports = CalificacioneController
