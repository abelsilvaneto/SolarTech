const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Vistoria = db.define('vistoria',{
    codVistoria:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idEquipamento:{
        type: DataTypes.INTEGER,
        references:{
            model: 'equipamentos',
            key: 'codEquipamento'
        },
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    estado:{
        type: DataTypes.ENUM('PENDENTE','REALIZADA'),
        allowNull: false
    }
},{
    tableName: 'vistorias',
    timestamps: false
})

module.exports = Vistoria