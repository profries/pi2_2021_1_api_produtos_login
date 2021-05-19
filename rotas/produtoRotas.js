const express = require('express');
const rotas = express.Router();
const produtoController = require('../controller/produtoController')

rotas.get('/', produtoController.listar)
rotas.post('/', produtoController.inserir)
rotas.get('/:id', produtoController.buscarPorId)
rotas.put('/:id', produtoController.atualizar)
rotas.delete('/:id', produtoController.deletar)

module.exports = rotas
