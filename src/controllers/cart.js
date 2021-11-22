const express = require('express')
const { Cart } = require('../models/index')
const CartService = require('../services/cart')
const { body, check, validationResult } = require('express-validator')
const middleware = require('../middlewares/validatedAuthentication')

const router = express.Router()
router.use(middleware)

const cartService = new CartService(Cart)

router.get('/details', async (req, res) => {
    const idUserCart = req.id.id

    try {
        const validationCart = await cartService.getById(idUserCart)
        res.status(200).send({
            status: 200,
            message: 'Cart found successfully!',
            cart: validationCart
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

router.post('/',
    check('productId').not().isEmpty().isNumeric().withMessage('The data sent is not valid numbers for an ID!'),
    check('quantity').not().isEmpty().isNumeric().withMessage('The data sent is not valid numbers for an quantity!'),

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const dataCart = {
            productId: req.body.productId,
            quantity: req.body.quantity,
            userId: req.id.id
        }

        try {
            await cartService.add(dataCart)
            res.status(201).send({
                status: 201,
                message: 'Product successfully added to cart!'
            })
        } catch (error) {
            res.status(400).send({
                status: 400,
                message: error.message
            })
        }
    }
)

router.patch('/:id',
    check('quantity').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number for quantity!'),

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idUserCart = req.id.id

        const idProductCart = req.params.id

        const dataProduct = {
            quantity: req.body.quantity
        }

        try {
            await cartService.updateMerge(idUserCart, idProductCart, dataProduct)
            res.status(204).send()
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }
)

router.delete('/:id', async (req, res) => {
    const idUserCart = req.id.id
    const idProductCart = req.params.id

    try {
        await cartService.delete(idUserCart, idProductCart)
        res.status(204).send()
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

module.exports = router