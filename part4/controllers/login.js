const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  console.log(request.body)
  const {username, password} = request.body
  const user = await User.findOne({username}) 
  console.log(user)
  const pwdCorrect = user == null
    ? false
    :await bcrypt.compare(password, user.passwordHash)

  if (!(user && pwdCorrect)) {
    return response.status(401).json({
      error: 'invalid usrname or password'
    })
  }

  const userForToken = {
    username: user.name,
    id: user._id,
  }


  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id })
})

module.exports = loginRouter

