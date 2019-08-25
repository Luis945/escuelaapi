'use strict'

const Salon= use('App/Models/Salon');
const Alumno = use('App/Models/Alumno');
const Materia = use('App/Models/Materia');




class CalificacioneController {

    Calificar({request, response}) {
        const { calificaciones } = request.all();

        console.log(calificaciones);
        console.log("---------------------")
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
        var {id} = request.all();
        var getMateria;

        var calificacion = [{
            id_materia: "5d62272130c55468709e7c3b",
    unidad: 2,
    calificacion: 10
        },
        {
            id_materia: "5d62272130c55468709e7c3b",
    unidad: 3,
    calificacion: 8
        }];
        
        await Alumno.findOneAndUpdate({_id: id}, {$push: {calificaciones: null}});

        // Users.findOneAndUpdate({name: req.user.name}, {$push: {friends: friend}});

        // alu.save();


        var aluw = await Alumno.findById(id,(err,materia)=>{
            getMateria = materia;
        });

        return response.status(200).json({
            salon: getMateria
        });
    }


}

module.exports = CalificacioneController
