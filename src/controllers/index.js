const express = require('express')
const authenticationRouters = require('./authentication')
const usersRouters = require('./users')
const productsRouters = require('./products')
const requestsRouters = require('./requests')
const paymentsRouters = require('./payments')
const accessLevelRouters = require('./accessLevel')
const cartRouters = require('./cart')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('App online!')
})

router.use('/authentication', authenticationRouters)
router.use('/users', usersRouters)
router.use('/products', productsRouters)
router.use('/requests', requestsRouters)
router.use('/payments', paymentsRouters)
router.use('/access/level', accessLevelRouters)
router.use('/cart', cartRouters)

module.exports = router