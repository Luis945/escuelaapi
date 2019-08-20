'use strict'

const Alumno = use('App/Models/Alumno');
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
            var data = await Alumno.findOne({
                Matricula: matricula, 
                'Datos_secundarios': { $elemMatch: { 'Curp' : curp} }
            });

            var token = data ? token = jwt.sign({data}, 'LAMEv3') : '';

            if (token === '') {
                throw new Error('Las credenciales no concuerdan con los registros, verifique.');
            }

            return response.status(200).json({
                token: token
            });
        } catch (error) {
            return response.status(200).json({
                error: error,
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
}

module.exports = AuthController
