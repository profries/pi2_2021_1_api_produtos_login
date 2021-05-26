const express = require('express');
const rotas = express.Router();
const usuarioController = require('../controller/usuarioController')

rotas.post('/', usuarioController.validarUsuario)

module.exports = rotas
