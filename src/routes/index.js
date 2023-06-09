// const fs = require('fs')
// const express = require('express')
// const router = express.Router()

// const pathRouter = `${__dirname}`

// const removeExtension = (fileName) => {
//     return fileName.split('.').shift()
// }

// fs.readdirSync(pathRouter).filter((file) => {
//     const fileWithOutExt = removeExtension(file)
//     const skip = ['index'].includes(fileWithOutExt)
//     if (!skip) {
//         router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`)) //TODO: localhost/users
//         console.log('CARGAR RUTA ---->', fileWithOutExt)
//     }
// })

// router.get('*', (req, res) => {
//     res.status(404)
//     res.send({ error: 'Not found' })
// })

// module.exports = router

const express = require("express");
const fs = require("fs")
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName) => {
    //TODO tracks.js [tracks, js]
    return fileName.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)//TODO users, storage, tracks
    if(name !== 'index'){
        console.log(`Cargando rutan ${name}`)
        router.use(`/${name}`,require(`./${file}`)) //TODO http://localhost:3000/api/tracks
    }
})

module.exports = router