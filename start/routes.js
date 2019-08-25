'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
/**
 * Para get
*/
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/maestro','MaestroController.verMaestro');

/**
 * Para post
*/
Route.post('maestro','MaestroController.guardarMaestro');

Route.post('/login', 'AuthController.Login');
Route.post('/verify', 'AuthController.VerificarToken');

/*-----Alumnos------*/
Route.post('/GuardarAlumno', 'AlumnoController.GuardarAlumno');
Route.post('/ActualizaAlumno','AlumnoController.ActualizaAlumno');
Route.get('/VerAlumnos','AlumnoController.VerAlumnos');
Route.get('/alumno/:matricula', 'AuthController.VerAlumno');
Route.post('/calificar', 'CalificacioneController.Calificar');


/**Materia  */
Route.post('/materia/setMateria/','MateriaController.setMateria');
Route.get('/materia/getMaterias/nombre/','MateriaController.showName');
Route.post('/materia/setUnidades/','MateriaController.saveUnidades');
Route.get('/materia/materias/','MateriaController.showAll');
Route.delete('/materia/eliminar/:id','MateriaController.eliminarMateria');


/**GRUPOS */
Route.post('/creargrupo','SalonController.setSalon');
Route.get('/verSalones','SalonController.getSalones');
Route.post('/crearmaestro','SalonController.setMaestro');
Route.get('/vermaestros','SalonController.VerMaestros');
Route.delete('/eliminargrupo/:id','SalonController.eliminarSalon');
/*-------MAESTROS------*/
Route.post('/RegistroMaestro','MaestroController.RegistroMaestro');
Route.post('/VerMaestros','MaestroController.VerMaestros');


