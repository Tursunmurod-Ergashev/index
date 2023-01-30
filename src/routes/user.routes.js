const express = require('express');
const routes = express.Router()
const vertiyToken = require('../middlewares/user.middleware')
const userController = require('../controllers/user.controller');
routes.get('/user',vertiyToken,userController.getAllUserController)
routes.post('/user',vertiyToken, userController.postUserController);
routes.get('/user/:id', userController.getByIdUserController);
routes.put('/user/:id', userController.putUserController)
routes.delete('/user/:id', userController.deleteUserController)
routes.post('/login', userController.login)
module.exports = routes;