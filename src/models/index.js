const configSequelize = require('../config/sequelize')

const Users = require('./entityUsers')
const Products = require('./entityProducts')
const Requests = require('./entityRequests')

const db = {
    Users,
    Products,
    Requests,
    configSequelize: configSequelize
}

module.exports = db