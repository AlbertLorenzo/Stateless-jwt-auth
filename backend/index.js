const mongoose = require('mongoose')
const { dbOptions, port, db } = require('./config')
const app = require('./app')

mongoose.connect(db, dbOptions).then(() => {
    console.log('Conexión a la bbdd con éxito.')
    app.listen(port, () => {
        console.log(`Servidor iniciado en el puerto ${port}`)
    })
}, (err) => {
    console.log(`Error al conectar con la base de datos: ${err}`)
})