function ensureToken(req, res, next) {
    const header = req.headers.authorization
    const bearer = header.split(' ')
    if (bearer[1] != 'null') {
        const token = bearer[1]
        req.token = token
        next()
    } else {
        res.status(404).send('Token not found') 
    }
}

module.exports = {
    ensureToken
}