const express = require('express')
const { AccessLevel } = require('../models/index')
const AccessLevelService = require('../services/accessLevel')
const { check, validationResult } = require('express-validator')
const middleware = require('../middlewares/validatedAuthentication')

const router = express.Router()
router.use(middleware)

const accessLevelService = new AccessLevelService(AccessLevel)

router.get('/:id/details', async (req, res) => {
    const idAccessLevel = req.params.id

    try {
        const validationAccessLevel = await accessLevelService.getById(idAccessLevel)
        res.status(200).send({
            status: 200,
            message: 'Access level found successfully!',
            product: validationAccessLevel
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

router.get('/list', async (req, res) => {
    const listAccessLevel = await accessLevelService.getAll()
    res.status(200).json(listAccessLevel)
})

router.post('/',
    check('type').not().isEmpty().withMessage('The data submitted cannot be empty or null'),

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const dataAccessLevel = {
            type: req.body.type
        }

        try {
            await accessLevelService.add(dataAccessLevel)
            res.status(201).send({
                status: 201,
                message: 'Access level successfully added!'
            })
        } catch (error) {
            res.status(400).send({
                status: 400,
                message: error.message
            })
        }
    }
)

router.put('/:id', 
    check('type').not().isEmpty().withMessage('The data submitted cannot be empty or null'),

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idAccessLevel = req.params.id

        const dataAccessLevel = {
            type: req.body.type
        }

        try {
            await accessLevelService.update(idAccessLevel, dataAccessLevel)
            res.status(204).send()
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }
)

router.patch('/:id',
    check('type').not().isEmpty().withMessage('The data submitted cannot be empty or null'),

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idAccessLevel = req.params.id

        const dataAccessLevel = {...req.body}

        try {
            await accessLevelService.updateMerge(idAccessLevel, dataAccessLevel)
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
    const idAccessLevel = req.params.id

    try {
        await accessLevelService.delete(idAccessLevel)
        res.status(204).send()
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

module.exports = router