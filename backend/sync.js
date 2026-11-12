const { Cliente, Equipamento, Vistoria, Funcionario } = require('./models/rel')
const conn = require('./db/conn')

async function SyncDataBase() {
    try{
     await conn.sync({force: true})
     console.log('realizando a conexão com o banco')
    }catch(err){
    console.error('Erro na operação', err)
    }finally{
     await conn.close()
     console.log('Fechando a conexão')
    }
}

SyncDataBase()