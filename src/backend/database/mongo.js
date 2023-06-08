const mongoose = require('mongoose')
const config = require('../config/config.' + process.env.NODE_ENV + '.js');

const dbConnect = () => {
    // const DB_URI = process.env.DB_URI_PROD
    const DB_URI = config.dbUri;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (!err) {
            console.log('**** CONEXION CORRECTA ****')
        } else {
            console.log('***** ERROR DE CONEXION ****')
        }
    })
}

module.exports = dbConnect