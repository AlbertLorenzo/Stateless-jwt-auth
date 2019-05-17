const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config')

function getIndex(req, res) {
    res.status(200).sendFile(`${__dirname}/public/landing.html`)
}

function signUp(req, res) {
    res.status(200).send('signUp')
}

function signIn(req, res, next) {
    const user = userModel.findOne({ username: req.body.username }).then((data) => {
        if (data) {
            const userdata = data // Data que enviaremos al cliente
            const token = jwt.sign({ userdata }, JWT_SECRET_KEY)
            res.status(200).send(token)
        } else {
            res.status(404).send('User not found')
        }
    }).catch((err) => {
        res.status(400).json('Bad Request')
    })
}

function getProtected(req, res) {
    jwt.verify(req.token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(403).send('Bad token request')
        } else {
            res.status(200).send(decoded)
        }
    })
}

module.exports = {
    getIndex,
    signUp,
    signIn,
    getProtected
}