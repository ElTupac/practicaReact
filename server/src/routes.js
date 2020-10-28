const express = require('express');
const routes = express.Router();
const userController = require('./userController');

routes.post('/nuevousuario', userController.nuevoUsuario);
routes.post('/loguearusuario', userController.loguearUsuario);

module.exports = routes;