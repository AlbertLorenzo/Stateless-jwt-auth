const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/routes')

const app = express()

app.use(express.static(`${__dirname}/public`))
app.use(express.static(`${__dirname}/public/js`))
app.use(express.static(`${__dirname}/public/css`))

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

module.exports = app