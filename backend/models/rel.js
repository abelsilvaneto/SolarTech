const Cliente = require('./Cliente')
const Equipamento = require('./Equipamento')
const Vistoria = require('./Vistoria')
const Funcionario = require('./Funcionario')

Cliente.hasMany(Equipamento, {
    as: 'EquipamentoCliente',
    foreignKey: 'idCliente',
    onDelete: 'CASCADE'
})

Equipamento.belongsTo(Cliente, {
    as: 'ClienteEquipamento',
    foreignKey: 'idCliente',
    allowNull: false
})

Equipamento.hasOne(Vistoria, {
    as: 'VistoriaEquipamento',
    foreignKey: 'idEquipamento',
    onDelete: 'CASCADE'
})

Vistoria.belongsTo(Equipamento, {
    as: 'EquipamentoVistoria',
    foreignKey: 'idEquipamento',
    allowNull: false
})

module.exports = { Cliente, Equipamento, Vistoria, Funcionario }