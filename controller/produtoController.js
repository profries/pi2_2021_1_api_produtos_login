const conexao = require('../config/conexaoBD')
const produtoRepository = require('../repository/produtoRepository')

exports.listar = (req, res) => {
    produtoRepository.listar((erro,produtos) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.json(produtos)
        }
    })
}

exports.inserir = (req, res) => {
    //Obter o dado do request - nome e o preco
    const produto = req.body;
    
    //SQL
    const sql = "INSERT INTO produto(nome,preco) VALUES (?,?)"

    conexao.query(sql, [produto.nome, produto.preco],
        (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            produto.id = rows.insertId;
            res.status(201).json(produto)
        }
    })
}

exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM produto WHERE id=?";

    conexao.query(sql, [id], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            if(rows && rows.length > 0){
                res.json(rows[0])
            }
            else{ 
                res.status(404).json({"msg":"Produto nao encontrado"})
            }
        }
    })
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const prod = req.body;

    const sql = `UPDATE produto SET nome=?, preco=? WHERE id=?`;
    conexao.query(sql, [prod.nome, prod.preco, id], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            prod.id = +id; //Sinal de "+" -> converte String para number (ou usar parseInt)
            res.json(prod);
        }
    })
}

exports.deletar = (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM produto WHERE id=?`;
    conexao.query(sql, [id], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            if(rows.affectedRows)
            res.json({"msg": `Produto ${id} removido com sucesso`});
        }
    })
}