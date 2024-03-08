import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogFrom'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log('blogService', blogs)
      setBlogs( blogs )
  })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayNotification = (status, msg) => {
    const notification = {
      status: status,
      message: msg
    }
    setNotification(notification)

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      console.log('login ok.', user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('failed to login')
      displayNotification('error', 'Wrong credentials')
    }
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      displayNotification('success', `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (err) {
      console.log('addBlog err', err)
      displayNotification('error', 'add blog error')
    }
  }
  
  const updateBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.update(newBlog)
      setBlogs(blogs.map((blog) => blog.id !== returnedBlog.id ? blog : returnedBlog))
      // displayNotification('success', `a blog ${returnedBlog.title} by ${returnedBlog.author} updated`)
    } catch (err) {
      console.log('addBlog err', err)
      displayNotification('error', 'update blog error')
    }
  }
  
  const revomeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((bb) => bb.id !== blog.id))
      // displayNotification('success', `a blog ${returnedBlog.title} by ${returnedBlog.author} updated`)
    } catch (err) {
      console.log('delete err', err)
      displayNotification('error', 'delete blog error')
    }
  }

  const loginForm = () => (
      <form onSubmit={handleLogin} >
        <div>
          username:
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type='password'
            value={password}
            name='Password'
            autoComplete='current-password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    )

    const blogFormRef = useRef()
  
  return (
    <div>
      <h1>{user ? 'blogs': 'log in to application'}</h1>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && <div>
        <div>
          {user.username} loged in
          <button type='button' onClick={handleLogout}>Logout</button>
        </div>
        <Togglable buttonLabel = 'create new blog' ref={blogFormRef}>
        {/* <Togglable > */}
          <BlogForm addBlog = {addBlog} />
        </Togglable>
        <div>
          {blogs.map( blog => 
            <Blog key={blog.id} blog = {blog} user={user} handleUpdate={updateBlog} handleDelete={revomeBlog} />
          )}
        </div>
      </div>}
    </div>
  )
}

export default App