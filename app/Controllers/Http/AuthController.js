'use strict'

const Alumno = use('App/Models/Alumno');
const Maistro = use('App/Models/Maestro');
const Salon = use('App/Models/Salon');
var jwt = require('jsonwebtoken');
const Encryption = use('Encryption');

class AuthController {

    async VerAlumno({ response, params }) {
        const { matricula } = params;

        try {
            var data = await Alumno.findOne({Matricula: matricula});

            var alumno = {
                matricula: data.Matricula,
                nombre: data.Nombre,
                foto: data.Fotografia
            };

            return response.status(200).json({
                alumno: alumno
            });
        } catch (err) {
            return response.status(200).json({
                error: "No se encontró ningún alumno con esta matrícula... ;(",
                status: 404
            });
        }
    }

    async Login ({ request, response }) {
        const { matricula, curp } = request.all();

        try {

            var usuario;
            var tipoUsuario = "";
            var idAlumno = "";
            var alumno;
            // console.log("alumno")
            var datat = await Alumno.findOne({
                Matricula: matricula
            });
            // console.log("alumno")
            if (!datat) {
                usuario = await Alumno.findOne({
                    'Datos_secundarios': { $elemMatch: { 'Curp' : curp, 'nombre_padre_tutor': matricula} }
                });
                console.log(usuario)
                if (usuario != null) {
                    console.log("asignando")
                    tipoUsuario = "jefesito";
                    alumno = usuario.Nombre + ' ' + usuario.Apellido_paterno + ' ' + usuario.Apellido_materno;
                    idAlumno = usuario._id.toString();
                    console.log(tipoUsuario)
                }
                console.log("padre")
            } else {
                usuario = await Alumno.findOne({
                                Matricula: matricula,
                                'Datos_secundarios': { $elemMatch: { 'Curp' : curp} }
                            });
                if (usuario) { tipoUsuario = "alumno";
                    alumno = usuario.Nombre + ' ' + usuario.Apellido_paterno + ' ' + usuario.Apellido_materno;
                    idAlumno = usuario._id.toString();
                }
                console.log("alumno encontrao")
            }
            var saloncito;

            var ciclo = new Date().getFullYear();
            // console.log(idAlumno);
            if (idAlumno !=  "") {
                await Salon.find({
                    Ciclo: ciclo.toString(),
                }).populate({
                    path: 'Alumnos',
                    match: { _id: {$in: [idAlumno]} }
                })
                .exec((err, salones) => {
                    saloncito = salones.find((salon) => {
                        console.log(salon)
                        return salon.Alumnos.length > 0;
                    });
                });

                // console.log(saloncito);
            }

            if ( tipoUsuario === "") {
                console.log("maestro")
                if (this.rfcValido(matricula)) {
                    usuario = await Maistro.findOne({
                        Rfc: matricula,
                        Telefono: curp
                    });

                    if(usuario) {
                        tipoUsuario = "profe";
                        idAlumno=usuario._id;
                        console.log(usuario._id);
                        console.log(idAlumno);
                        // await Salon.find({
                        //     Ciclo: "2017"//ciclo.toString(),
                        // }).populate({
                        //     path: 'Maestro',
                        //     // match: { _id: {$in: [idAlumno]} }
                        // })
                        // .exec((err, salones) => {
                        //     salones.find((salon) => {
                        //         console.log(salon)
                        //         return salon.Alumnos.length > 0;
                        //     });
                        // });
                        await Salon.find({
                            Ciclo: ciclo.toString(),
                        }).populate({
                            path: 'Maestro',
                            match: { _id: {$in: [usuario._id]} }
                        })
                        .exec((err, salones) => {
                            saloncito = salones.find((salon) => {
                                console.log(salon)
                                return salon.Alumnos.length > 0;
                            });
                        });
                    }
                }
            }

            // console.log("okenenne")

            var token = usuario ? token = jwt.sign({usuario}, 'LAMEv3') : '';
            // console.log(token)
            if (token === '') {
                throw new Error('Las credenciales no concuerdan con los registros, verifique.');
            }

            var salonid = 0;
            var nombrepapi = "NADIE";
            var salonNom = "NINGUNO";
            if (saloncito) {
                salonid = saloncito._id;
                if (tipoUsuario != "profe") {
                    nombrepapi = usuario.Datos_secundarios[0].nombre_padre_tutor;
                } else {
                    nombrepapi = 'Prof. ' + saloncito.Maestro.Nombre + ' ' + saloncito.Maestro.Apellido_paterno;

                }
                salonNom = new String(saloncito.Grado + '° ' + saloncito.Seccion + ' (' + saloncito.Ciclo + ')');
                console.log(nombrepapi)
            }

            return response.status(200).json({
                token: token,
                tipo: tipoUsuario,
                alumno: alumno,
                _id: idAlumno,
                status: 200,
                ciclo: ciclo,
                salon: salonid,
                tutor: nombrepapi,
                salonNom: salonNom
            });
        } catch (error) {
            console.log(error);
            return response.status(200).json({
                error: error.toString(),
                status: 401
            });
        }
    }

    async VerificarToken({request, response}) {
        const cabecera = request.header('autorizacion');

        if (typeof cabecera !== 'undefined') {
            var split = cabecera.split(" ");

            request.token = split[0];
        } else {
            return false;
        }

        try {

            var p = jwt.verify(request.token, "LAMEv3");

            return p.hasOwnProperty('data');
        } catch(err) {
            console.log(err)
            return false;
        }

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

module.exports = AuthController
