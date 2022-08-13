/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import AutoSwagger from "adonis-autoswagger";
import swagger from "Config/swagger";

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'go to route /docs' }
})

Route.group(() => {
  Route.get('/animals', 'AnimalsController.index')
  Route.get('/animals/:id', 'AnimalsController.show')

  // auth
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register')

  Route.group(() => {
    Route.post('/animals', 'AnimalsController.store')
    Route.put('/animals/:id', 'AnimalsController.update')
    Route.delete('/animals/:id', 'AnimalsController.destroy')

    Route.post('/logout', 'AuthController.logout')
  }).middleware('auth')
}).prefix('/api')


// returns swagger in YAML
Route.get("/swagger", async () => {
  // 
  return AutoSwagger.docs(Route.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
Route.get("/docs", async () => {
  return AutoSwagger.ui("/swagger");
});
