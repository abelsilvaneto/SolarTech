const cryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'
const Funcionario = require('../models/Funcionario')

const Cadastrar = async (req,res)=>{
    const valor = req.body

    if(!valor.email || !valor.senha){
        return req.status(401).json({message: 'coloque todos os valores'})
    }

    try{
        const senhaCrypto = cryptoJS.AES.encrypt(valor.senha,CHAVE_SEGREDO).toString()

        await Funcionario.create({
            email: valor.email,
            senha: senhaCrypto
        })

        res.status(200).json({message: 'Operação feita com sucesso'})
    }catch(err){
        res.status(500).json({message:'Erro na operação'})
        console.error('Erro na operação',err)
    }
}


module.exports = {Cadastrar}