const dbOptions = {
    useNewUrlParser: true,
    useCreateIndex: true
}

const port = process.env.PORT || 3000

const db = 'mongodb://localhost:27017/stateless'

const JWT_SECRET_KEY = 'qx47k2fpw'

module.exports = {
    dbOptions,
    db,
    port,
    JWT_SECRET_KEY
}