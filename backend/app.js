const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

// Promises do mongoose esta dreprecated por isso importamos as promisses padroes do node
mongoose.Promise = global.Promise

// Database
mongoose.connect('mongodb://db/mydb')

// teste
//server.get('/', (req, res, next) => res.send('Backend'))

// Middlewares
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(cors())

// ODM
const Client = restful.model('Client', {
   name: { type: String, required: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

// Routes
Client.register(server, '/clients')

// Start server
server.listen(3000)