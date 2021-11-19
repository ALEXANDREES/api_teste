const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')
const AccessLevel = require('./entityAccessLevel')

const Users = configSequelize.define('EntityUsers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },  
    birthDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accessLevelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: 'AccessLevel',
            key: 'id'    
        }
    },
}, {
    tableName: 'entityusers'
})

Users.belongsTo(AccessLevel, { 
    constraint: true,
    foreignKey: 'accessLevelId',
    as: 'accessLevelData'
})

AccessLevel.hasMany(Users, { 
    constraint: true,
    foreignKey: 'accessLevelId',
    as: 'accessLevelsData'
})

module.exports = Users