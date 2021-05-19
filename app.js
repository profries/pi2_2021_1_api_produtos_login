const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Rotas
const produtoRota = require('./rotas/produtoRotas')
app.use('/api/produtos',produtoRota)

const usuarioRota = require('./rotas/usuarioRotas')
app.use('/api/usuarios',usuarioRota)

app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`)
})