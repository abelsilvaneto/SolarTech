const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')

const controllerAuth = require('./controller/Auth.controller')
const controllerCliente = require('./controller/Cliente.controller')
const controllerEquipamento = require('./controller/Equipamento.controller')
const controllerFuncionario = require('./controller/Funcionario.controller')
const controllerVistoria = require('./controller/Vistoria.controller')

const Middleware = require('./middleware/auth.middleware')

require('./models/rel')

const HOST = 'localhost'
const PORT = 3000

app.use(express.urlencoded({force: true}))
app.use(express.json())
app.use(cors())

app.post('/funcionario',controllerFuncionario.Cadastrar)
app.post('/login',controllerAuth.Login)

app.use('/', (req,res)=>{
    console.log('Aplicação rodando')
})

app.use(Middleware)

app.post('/cliente',controllerCliente.Cadastrar)
app.get('/cliente/:id',controllerCliente.ConsultarCod)
app.get('/cliente/busca/:nome',controllerCliente.ConsultarNome)
app.put('/cliente/:id',controllerCliente.Atualizar)
app.delete('/cliente/:id',controllerCliente.Apagar)
app.post('/clientes',controllerCliente.listar)

app.post('/equipamento',controllerEquipamento.Cadastrar)

app.post('/vistoria',controllerVistoria.Cadastrar)
app.get('/vistorias',controllerVistoria.listar)


conn.sync()
.then(()=>{
    app.listen(PORT, HOST, ()=>{
        console.log(`Servidor rodando em http://${HOST}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao rodar o servidor')
})
