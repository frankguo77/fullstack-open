const mongoose = require('mongoose')
mongoose.set("bufferTimeoutMS", 300000)
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

let USER_ID = ''

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('root', 10)
  const user = new User({username: 'root', passwordHash})
  //console.log('firest user is creating')
  await user.save()
  //console.log('user saved')
  USER_ID = user._id.toString()
})
  
beforeEach(async () => {
  await Blog.deleteMany({})
  //const users = await User.find({})
  //const user = users[0]
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('ID is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0].__id).toBe(undefined)
  })

  test('a specific blog is within the returned blogs',async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(b => b.id)
    expect(ids).toContain(
      "5a422a851b54a676234d17f7"
    )
  })
})

describe('addition of a new blog', () => {
  test('POST /api/blogs works', async () => {
    const newBlog = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijistra',
      url: 'http://www.google.com',
      likes: 12,
      userId: USER_ID,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogAfter = await Blog.find({})

    expect(blogAfter.length).toBe(helper.initialBlogs.length + 1)
    const titles = blogAfter.map(b => b.title)
    expect(titles).toContain('Canonical string reduction')
  })

  test('POST /api/blogs no blogs has 0 likes if not specified', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijistra',
      url: 'http://www.google.com',
      userId: USER_ID,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await Blog.find({})
    console.log('blogsAfter lenght: ', blogsAfter.length)

    
    const blog= await Blog.findOne({author:  'Edsger W. Dijistra'})
    console.log('blogAfter: ', blog)
    expect(blog.likes).toBe(0)
  })

  test('fails with 400 if tile or url is empty', async () => {
    const newBlog = {
      author: 'Edsger W. Dijistra',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDel = blogsAtStart[0]
    console.log('blogToDel.id', blogToDel.id)

    await api
      .delete(`/api/blogs/${blogToDel.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    )

    const ids = blogsAtEnd.map(b => b.id)
    expect(ids).not.toContain(blogToDel.id)
  })
})

describe('modification of a blog', () => {
  test('succeeds with if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const id = blogToUpdate.id

    delete blogToUpdate.id

    blogToUpdate.likes++
    const result= await api
      .put(`/api/blogs/${id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.likes).toEqual(blogToUpdate.likes)
  })
})


describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToView = blogAtStart[0]
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with 404 if blog not exist', async () => {
    const validId = await helper.nonExistingId()
    console.log(validId)

    await api
      .get(`/api/blogs/${validId}`)
      .expect(404)
  })
  
  test('fails with 400 if id is invalid', async () => {
    const invalidId = '12345' 

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})


describe('when there is initially one user at db', () => {
 test('creation succeeds with a new username', async () => {
    const usersAtStart = await helper.usersInDb()
    console.log(usersAtStart)
    const newUser = {
      username: 'frank',
      name: 'frank paul',
      password: '12345',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  
  test('creation fails with a used username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'frank paul',
      password: '12345',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
