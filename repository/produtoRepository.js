const conexao = require('../config/conexaoBD')

exports.listar = (callback) => {
    const sql = "SELECT * FROM produto";

    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}

exports.inserir = (produto, callback) => {   
    //SQL
    const sql = "INSERT INTO produto(nome,preco) VALUES (?,?)"

    conexao.query(sql, [produto.nome, produto.preco],
        (erro, rows) => {
            if(erro){
                callback(erro, null)
            }
            else {
                produto.id = rows.insertId;
                callback(null, produto)
            }
    })    
}