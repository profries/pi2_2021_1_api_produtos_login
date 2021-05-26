const express = require('express')
const usuarioController = require('./controller/usuarioController')

const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Ex de Middleware
//let contador = 1;
//app.use((req, resp, next) => {
//  console.log(`Passando pelo Middleware ${contador++}`);
//  if(req.method == "GET")
//    next();
//  else
//    resp.status(500).send("Não pode acessar se nao for GET");
//})

const authRota = require('./rotas/authRotas')
app.use('/api/auth', authRota)

//Middleware para auth
app.use(usuarioController.validarToken)

//Rotas
const produtoRota = require('./rotas/produtoRotas')
app.use('/api/produtos',produtoRota)

const usuarioRota = require('./rotas/usuarioRotas')
app.use('/api/usuarios',usuarioRota)


app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`)
})