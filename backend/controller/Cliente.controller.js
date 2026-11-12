const cryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'
const Cliente = require('../models/Cliente')

const Cadastrar = async (req, res) => {
    const valor = req.body

    if (!valor.nome || !valor.cpf) {
        return req.status(401).json({ message: 'coloque todos os valores' })
    }

    try {
        const cpfCrypto = cryptoJS.AES.encrypt(valor.cpf, CHAVE_SEGREDO)
        await Cliente.create({
            nome: valor.nome,
            cpf: cpfCrypto
        })

        res.status(200).json({ message: 'Operação feita com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const ConsultarCod = async (req, res) => {
    const id = req.params.id

    try {

        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            return res.status(401).json({ message: 'Cliente não encontrado' })
        }

        const bytes = cryptoJS.AES.decrypt(cliente.cpf, CHAVE_SEGREDO)
        const cpfDescrypto = bytes.toString(cryptoJS.enc.Utf8)

        res.status(200).json({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            cpf: cpfDescrypto
        })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const ConsultarNome = async (req, res) => {
    const nome = req.params.nome

    try {

        const cliente = await Cliente.findOne({ where: { nome: nome } })

        if (!cliente) {
            return res.status(401).json({ message: 'Cliente não encontrado' })
        }

        const bytes = cryptoJS.AES.decrypt(cliente.cpf, CHAVE_SEGREDO)
        const cpfDescrypto = bytes.toString(cryptoJS.enc.Utf8)

        res.status(200).json({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            cpf: cpfDescrypto
        })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const Atualizar = async (req, res) => {
    const valor = req.body
    const id = req.params.id

    if (!valor.nome || !valor.cpf) {
        return req.status(401).json({ message: 'coloque todos os valores' })
    }

    try {

        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(401).json({ message: 'Cliente não encontrado' })
        }

        const valor2 = { ...valor }

        if (valor.cpf) [
            valor2.cpf = cryptoJS.AES.encrypt(valor.cpf, CHAVE_SEGREDO).toString()
        ]

        await Cliente.update(valor2, { where: { codCliente: id } })


        res.status(200).json({ message: 'Operação feita com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const Apagar = async (req, res) => {
    const id = req.params.id

    try {

        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            return res.status(401).json({ message: 'Cliente não encontrado' })
        }

        await Cliente.destroy({ where: { codCliente: id } })

        res.status(200).json({ message: 'Operação feita com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const listar = async (req, res) => {
    const valor = req.body

    if (!valor.nome || !valor.cpf) {
        return req.status(401).json({ message: 'coloque todos os valores' })
    }

    try {
        const cpfCrypto = cryptoJS.AES.encrypt(valor.cpf, CHAVE_SEGREDO)
        await Cliente.create({
            nome: valor.nome,
            cpf: cpfCrypto
        })

        res.status(200).json({ message: 'Operação feita com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

module.exports = { Cadastrar, ConsultarCod, ConsultarNome, Atualizar, Apagar, listar }