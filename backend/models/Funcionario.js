const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Funcionario = db.define('funcionario',{
    codFuncionario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'funcionarios',
    timestamps: false
})

module.exports = Funcionario