const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('express-async-errors')
const loginRouter = require('./controllers/login')
const bodyParser = require('body-parser')
const testingRouter = require('./controllers/testing')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(
    config.MONGODB_URI,
    async(error)=>{
        if(error) throw error;
        console.log(`connected to MongoDB app.js`)
    }
)
morgan.token('body', function (request) { return JSON.stringify(request.body) })

app.use(bodyParser.json())
app.use(cors())
// app.use(express.static('build'))
// app.use(express.json()) ??
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
    app.use('/api/testing', testingRouter)
}
app.use(middleware.tokenExtractor)
app.use(middleware.tokenValidator)
app.use(middleware.unknownEnpoint)
app.use(middleware.errorHandler)

module.exports = app
