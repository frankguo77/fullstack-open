const blogRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name:1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log('body', body)
  const user = request.user
  if (!user) {
    return response.status(401).json( {error: 'token missing or invalid'})
  }

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end()
  }
  //console.log('POST User', body.userId)
  //const users = await User.find({})
  //console.log('usersInDB',users)
  //console.log('POST User', user)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  console.log('blog to be saved', blog)

  const savedBlog = await blog.save()
  console.log('savedBlog', savedBlog._id)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.get('/:id', async (request, response,next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  console.log('delete id: ', request.params.id)
  const blog = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response,next) => {
  const {title, author, url, likes } = request.body

  console.log(`title: ${title}, author: ${author}, url: ${url}, likes: ${likes}`)

  if (title === undefined || url === undefined) {
    return response.status(400).end()
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {title, author, url, likes},
    {new: true}

  )
  console.log(updatedBlog)
  response.json(updatedBlog)
})

module.exports =  blogRouter
