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



/**Materia  */
Route.post('/materia/setMateria/','MateriaController.setMateria');
Route.get('/materia/getMaterias/nombre/','MateriaController.showName');
Route.post('/materia/setUnidades/','MateriaController.saveUnidades');
Route.get('/materia/materias/','MateriaController.showAll');
Route.delete('/materia/eliminar/:id','MateriaController.eliminarMateria');
Route.post('/materia/editar/','MateriaController.editarMateria');

/**GRUPOS */
Route.post('/creargrupo','SalonController.setSalon');
Route.get('/verSalones','SalonController.getSalones');
Route.post('/crearmaestro','SalonController.setMaestro');
Route.get('/vermaestros','SalonController.VerMaestros');
Route.delete('/eliminargrupo/:id','SalonController.eliminarSalon');
Route.get('/verAlumnos_octa','SalonController.getAlumnos');
Route.post('/eliminaralumnosalon/:id','SalonController.eliminaralumnosalon');
/*-------MAESTROS------*/
Route.post('/RegistroMaestro','MaestroController.RegistroMaestro');
Route.post('/VerMaestros','MaestroController.VerMaestros');
Route.post('/ActualizaMaestro','MaestroController.ActualizaMaestro');

/* Calificaciones */
Route.post('/calificar', 'CalificacioneController.Calificar');
Route.get('/salon/:grado/:seccion/:ciclo/:materia', 'CalificacioneController.GetAlumnos');
Route.post('/pipi', 'CalificacioneController.insertpipi');
Route.get('/calificar/info', 'CalificacioneController.getSalonesYMaterias');
Route.get('/calificaciones/:_id/:ciclo', 'CalificacioneController.GetCalificacionesAlumno');

/** alertas maestros a alumnos */

Route.get('/alertas/ver/','AlertaController.show');
Route.get('/alertas/ver/maestro/:id','AlertaController.find_maestro');
Route.get('/alertas/ver/alumno/:id','AlertaController.find_alumno');
Route.post('/alertas/guardar/','AlertaController.save');
Route.post('/alertas/editar/','AlertaController.edit');
Route.delete('/alertas/remover/:id','AlertaController.remove');

/* Chat padres y pofes */
Route.get('/chat/:id', 'ChatController.historial');
Route.post('/chat', 'ChatController.guardarMensaje');