const cryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'
const Equipamento = require('../models/Equipamento')
const Cliente = require('../models/Cliente')

const Cadastrar = async (req,res)=>{
    const valor = req.body

    if(!valor.idCliente || !valor.modelo || !valor.fabricante || !valor.numSerie){
        return req.status(401).json({message: 'coloque todos os valores'})
    }

    try{
        const cliente = await Cliente.findByPk(valor.idCliente)

        if(!cliente){
            return res.status(401).json({message: 'Cliente não encontrado'})
        }

        const numSerieCrypto = cryptoJS.AES.encrypt(valor.numSerie,CHAVE_SEGREDO).toString()

        await Equipamento.create({
            idCliente: valor.idCliente,
            modelo: valor.modelo,
            fabricante: valor.fabricante,
            numSerie: numSerieCrypto
        })

        res.status(200).json({message: 'Operação feita com sucesso'})
    }catch(err){
        res.status(500).json({message:'Erro na operação'})
        console.error('Erro na operação',err)
    }
}


module.exports = {Cadastrar}