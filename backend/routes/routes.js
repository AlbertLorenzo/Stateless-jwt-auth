const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')
const { ensureToken } = require('../services/ensureToken')

router.get('/', controller.getIndex)
router.post('/signup', controller.signUp)
router.post('/signin', controller.signIn)
router.get('/protected', ensureToken, controller.getProtected)

module.exports = router