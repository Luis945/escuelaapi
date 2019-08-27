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

    async validapopo({request, response}) {
        var {curp, rfc} = request.all();

        // var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        // validado = curp.match(re);

        // const re2       = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
        // var   validadorfc = rfc.match(re2);

        
        return response.status(200).json({
            curp: this.curpValida(curp),
            rfc: this.rfcValido(rfc)
        });
    }

    //Función para validar un RFC
    // Devuelve el RFC sin espacios ni guiones si es correcto
    // Devuelve false si es inválido
    // (debe estar en mayúsculas, guiones y espacios intermedios opcionales)
    rfcValido(rfc, aceptarGenerico = true) {
        const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
        var validado = rfc.match(re);

        if (!validado)  //Coincide con el formato general del regex?
            return false;
        // console.log(validado)
        //Separar el dígito verificador del resto del RFC
        const digitoVerificador = validado.pop(),
            rfcSinDigito      = validado.slice(1).join(''),
            len               = rfcSinDigito.length,

        //Obtener el digito esperado
            diccionario       = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
            indice            = len + 1;
        var   suma,
            digitoEsperado;

        if (len == 12) suma = 0
        else suma = 481; //Ajuste para persona moral

        for(var i=0; i<len; i++)
            suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
        digitoEsperado = 11 - suma % 11;
        if (digitoEsperado == 11) digitoEsperado = 0;
        else if (digitoEsperado == 10) digitoEsperado = "A";

        //El dígito verificador coincide con el esperado?
        // o es un RFC Genérico (ventas a público general)?
        if ((digitoVerificador != digitoEsperado)
        && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
            return false;
        else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
            return false;
        // console.log(rfcSinDigito, digitoVerificador)
        return rfcSinDigito + digitoVerificador;
    }
    //nombre papá y matrícula
    //administrativa superusuario
    //maestro rfc y numero de telefono
    //Función para validar una CURP
    curpValida(curp) {
        var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
            validado = curp.match(re);
        
        if (!validado)  //Coincide con el formato general?
            return false;
        
        //Validar que coincida el dígito verificador
        function digitoVerificador(curp17) {
            //Fuente https://consultas.curp.gob.mx/CurpSP/
            var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
                lngSuma      = 0.0,
                lngDigito    = 0.0;
            for(var i=0; i<17; i++)
                lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
            lngDigito = 10 - lngSuma % 10;
            if (lngDigito == 10) return 0;
            return lngDigito;
        }
    
        if (validado[2] != digitoVerificador(validado[1])) 
            return false;
            
        return true; //Validado
    }

}

module.exports = CalificacioneController
