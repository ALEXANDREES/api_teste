const configSequelize = require('../config/sequelize')

const Users = require('./entityUsers')
const Products = require('./entityProducts')
const Requests = require('./entityRequests')
const Payments = require('./entityPayments')

const db = {
    Users,
    Products,
    Requests,
    Payments,
    configSequelize: configSequelize
}

module.exports = db