'use strict'

const Salon= use('App/Models/Salon');
const Alumno = use('App/Models/Alumno');




class CalificacioneController {

    Calificar({request, response}) {
        const { calificaciones } = request.all();

        console.log(calificaciones);
        console.log("---------------------")
    }

    async GetAlumnos({response, request, params}) {
        var { grado, seccion, ciclo, materia } = params;
        var salon;

        salon = await Salon.findOne({Grado: grado, Seccion: seccion}).populate('Alumnos');
        // .
        // exec(function (err, story) {
        //   console.log(story);
        //   // prints "The author is Ian Fleming"
        // })
        // ;

        salon["Alumnos"].forEach(element => {
            element["calificaciones"].forEach((el) => {
                console.log(el)
            })
        });

        // console.log(salon["Alumnos"]);

        return response.status(200).json({
            salon: salon
        });
    }


}

module.exports = CalificacioneController
