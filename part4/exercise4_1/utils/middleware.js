const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path', request.path)
    logger.info('Body', request.body)
    logger.info('---')
    next()
}

const unknownEnpoint = (request, response) => {
    response.status(404).send({ error: 'unknowm endpoint '})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError' && error.kind === 'OjectId') {
        return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request['token'] === authorization.substring(7)
    }
    next()
}

const tokenValidator = (request, response, next) => {
    const token = request.token
    
    if (!token) {
        return response.status(401).json({ error: 'missing token' })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }
    next()

module.exports = {
    requestLogger,
    unknownEnpoint,
    errorHandler,
    tokenExtractor,
    tokenValidator
}