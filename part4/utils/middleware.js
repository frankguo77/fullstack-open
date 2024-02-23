const morgan = require('morgan')
const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

morgan.token('body', (req, _res) => JSON.stringify(req.body))
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  console.log('atuth', auth)
  if (auth && auth.startsWith('Bearer')) {
    request.token = auth.replace('Bearer ', '')
  } else {
    request.token = null
  }

  return next()
}

const userExtractor = async (request, response, next) => { 
  if (!request.token) {
    request.user = null
  } else {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log(decodedToken)
    if (!decodedToken.id) {
      request.user = null 
    } else {
      request.user = await User.findById(decodedToken.id)
    }
  }

  console.log('user fokund.', request.user)
  
  return next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  //logger.error('error: ', error)

  if (error.name === 'CastError') {
      return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
      return response.status(400).send({error: error.message})
  } else if (error.name == 'JsonWebTokenError') {
    return response.status(401).send({error: error.message})
  }

  
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
