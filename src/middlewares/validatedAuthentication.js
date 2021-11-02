const jwt = require('jsonwebtoken')
const keyToken = require('../config/keyToken.json')

module.exports = (req, res, next) => {
    const presentToken = req.headers.authorization

    if (!presentToken) {
        return res.status(401).send({
            status: 401,
            message: 'Token was not provided'
        })
    }

    const parts = presentToken.split(' ')

    if (!parts.length === 2) {
        return res.status(401).send({
            status: 401,
            message: 'Incorrect token'
        })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({
            status: 401,
            message: 'Incorrect token format'
        })
    }

    jwt.verify(token, keyToken.secret, (error, user) => {
        if (error) {
            return res.status(401).send({
                status: 401,
                message: 'Invalid or expired token'
            })
        }

        req.id = user.id

        return next()
    })
}