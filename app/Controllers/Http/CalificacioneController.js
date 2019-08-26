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

        salon = await Salon.findOne({Grado: grado, Seccion: seccion, Ciclo: ciclo}).populate('Alumnos');//.populate('Materias');

        salon['Alumnos'].forEach(alumno => {
            alumno.calificaciones = alumno.calificaciones.filter((calificacion) => {
                return calificacion.id_materia == materia;
            });
        });

        return response.status(200).json({
            salon: salon
        });
    }

    async getSalonesYMaterias ({response}) {
        var salones = await Salon.find({});
        var materias = await Materia.find({});

        var grados = [];
        var secciones = [];
        var ciclos = [];

        salones.forEach(salon => {
            grados.push(salon.Grado);
            secciones.push(salon.Seccion);
            ciclos.push(salon.Ciclo);
        });

        materias = materias.map(materia => {
            return new Object({
                _id: materia._id,
                materia: materia.materia_Nombre
            });
        });

        return response.status(200).json({
            grados: Array.from(new Set(grados)),
            secciones: Array.from(new Set(secciones)),
            ciclos: Array.from(new Set(ciclos)),
            materias: materias
        });
    }

    async GetCalificacionesAlumno({params, response}) {
        var {_id, ciclo} = params;

        //5d63245bba22471bb90133d3   <---------- _id
        var saloncito;
        
        await Salon.find({
            Ciclo: ciclo,
        }).populate({
            path: 'Alumnos',
            match: { _id: {$in: [_id]} }
        }).populate({
            path: 'Materias'
        }).exec((err, salones) => {
            saloncito = salones.find((salon) => {
                return salon.Alumnos.length > 0;
            });
        });

        var materias = saloncito['Materias'].map(materia => {
            return new Object({
                _id: materia._id,
                materia: materia.materia_Nombre
            });
        });

        var calificaciones = saloncito['Alumnos'][0]['calificaciones'].map(calificacion => {
            return new Object({
                calificacion: calificacion.calificacion,
                _id_materia: calificacion.id_materia,
                unidad: calificacion.unidad
            });
        });

        var nva = calificaciones.map(calificacion => {
            var materia = materias.find(materia => {
                return materia._id.toString() === calificacion._id_materia.toString();
            });

            return new Object({
                materia: materia.materia,
                unidad: calificacion.unidad,
                calificacion: calificacion.calificacion     
            });
        });

        return response.status(200).json({
            calificaciones: nva
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
