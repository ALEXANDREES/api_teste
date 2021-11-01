const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')

const Users = require('./entityUsers')
const Products = require('./entityProducts')

const users = Users(configSequelize, Sequelize.DataTypes)
const products = Products(configSequelize, Sequelize.DataTypes)

const db = {
    users: users,
    products: products,
    configSequelize: configSequelize
}

module.exports = db