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
    
    produtoRepository.inserir(produto, (erro, produtoSalvo) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.status(201).json(produtoSalvo)
        }
    })
}

exports.buscarPorId = (req, res) => {    
    const id = +req.params.id;
    if(isNaN(id)){
        const error = {
            status: 400,
            msg: "Id deve ser um numero"
        }
        res.status(error.status).json(error)
    }
    else{
        produtoRepository.buscarPorId(id, (erro, produto) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                res.json(produto)
            }
        })
    }
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
    const id = +req.params.id;
    if(isNaN(id)){
        const error = {
            status: 400,
            msg: "Id deve ser um numero"
        }
        res.status(error.status).json(error)
    }
    else{
        produtoRepository.buscarPorId(id, (erro, produto) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                produtoRepository.deletar (id, (erro, id) => {
                    if(erro){
                        res.status(erro.status).json(erro)
                    }
                    else {
                        res.json(produto)
                    }        
                })
            }
        })
    }
}