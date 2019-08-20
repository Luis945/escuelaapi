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


Route.post('/alumni', 'AlumnoController.GuardarAlumno');

Route.get('/alumno/:matricula', 'AuthController.VerAlumno');

/**Materia  */
Route.post('/materia/setMateria','MateriaContoller.setMateria');
Route.post('/materia/setUnidades','MateriaController.saveUnidades');
Route.get('/materia/materias','MateriaController.showAll');
Route.get('/materia/materia/grado/:grado','MateriaController.showByGrade');
