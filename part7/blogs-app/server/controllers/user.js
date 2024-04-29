const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  console.log(request.body)
  const {username, name, password} = request.body

  if (!password || password.length < 3) {
    response.status(400).json({error: 'password must be at least 3 characters'})
    return
  }
  const saltRounds = 10
  const pwdHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash: pwdHash,
  })

  console.log("POST", user)
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {
      url:1,
      title :1,
      author: 1,
      likes:1,
      id: 1,
    })

  response.json(users)
})


module.exports = usersRouter
