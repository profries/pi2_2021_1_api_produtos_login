const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "crud_produtos"
});

module.exports = conexao