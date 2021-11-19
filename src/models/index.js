const configSequelize = require('../config/sequelize')

const Users = require('./entityUsers')
const Products = require('./entityProducts')
const Requests = require('./entityRequests')
const Payments = require('./entityPayments')
const AccessLevel = require('./entityAccessLevel')
const Cart = require('./entityCart')

const db = {
    Users,
    Products,
    Requests,
    Payments,
    AccessLevel,
    Cart,
    configSequelize: configSequelize
}

module.exports = db