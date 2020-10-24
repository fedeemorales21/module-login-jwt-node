const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
require('./db')

app
    .set('port', process.env.PORT || 3000)
    .use(express.urlencoded( { extended:false } ))
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(require('./routes/users.routes'))

module.exports = app 

