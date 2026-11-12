const cryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'
const Vistoria = require('../models/Vistoria')
const Equipamento = require('../models/Equipamento')

const Cadastrar = async (req,res)=>{
    const valor = req.body

    if(!valor.idEquipamento || !valor.data || !valor.estado ){
        return req.status(401).json({message: 'coloque todos os valores'})
    }

    try{
        const equipamento = await Equipamento.findByPk(valor.idEquipamento)

        if(!equipamento){
            return res.status(401).json({message: 'idEquipamento não encontrado'})
        }



        await Vistoria.create(valor)

        res.status(200).json({message: 'Operação feita com sucesso'})
    }catch(err){
        res.status(500).json({message:'Erro na operação'})
        console.error('Erro na operação',err)
    }
}

const listar = async (req,res)=>{
    const valor = req.body

    if(!valor.idEquipamento || !valor.data || !valor.estado ){
        return req.status(401).json({message: 'coloque todos os valores'})
    }

    try{
        const equipamento = await Equipamento.findByPk(valor.idEquipamento)

        if(!equipamento){
            return res.status(401).json({message: 'idEquipamento não encontrado'})
        }



        await Vistoria.create(valor)

        res.status(200).json({message: 'Operação feita com sucesso'})
    }catch(err){
        res.status(500).json({message:'Erro na operação'})
        console.error('Erro na operação',err)
    }
}


module.exports = {Cadastrar, listar}