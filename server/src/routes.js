const express = require('express');
const routes = express.Router();
const userController = require('./userController');

routes.post('/nuevousuario', userController.nuevoUsuario);
routes.post('/loguearusuario', userController.loguearUsuario);
routes.post('/checkuser', userController.checkLogin);

module.exports = routes;