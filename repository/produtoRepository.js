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