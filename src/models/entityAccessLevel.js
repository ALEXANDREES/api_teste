const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')

const AccessLevel = configSequelize.define('EntityAccessLevel', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.STRING(7),
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'entityaccesslevel'
})

module.exports = AccessLevel