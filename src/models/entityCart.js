const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')
const Users = require('./entityUsers')
const Products = require('./entityProducts')

const Cart = configSequelize.define('EntityCart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: 'Users',
            key: 'id'    
        }
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: 'Products',
            key: 'id'    
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'entitycart'
})

Cart.belongsTo(Users, { 
    constraint: true,
    foreignKey: 'userId',
    as: 'cartData'
})

Cart.belongsTo(Products, { 
    constraint: true,
    foreignKey: 'productId',
    as: 'productData'
})

module.exports = Cart