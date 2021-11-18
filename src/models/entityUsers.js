const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')

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
    }
}, {
    tableName: 'entityusers'
})

module.exports = Users