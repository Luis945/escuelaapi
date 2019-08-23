'use strict'

class CalificacioneController {

    Calificar({request, response}) {
        const { calificaciones } = request.all();

        console.log(calificaciones);
        console.log("---------------------")
    }


}

module.exports = CalificacioneController
