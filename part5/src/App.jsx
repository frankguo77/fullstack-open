import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      console.log('login ok.', user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('failed to login')
      displayNotification('error', 'Wrong credentials')
    }
  }

  const loginForm = () => (
      <form onSubmit={handleLogin} >
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    )
  
  return (
    <div>
      <h1>{user ? 'blogs': 'log in to application'}</h1>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && <div>
        <div>
          {user.username} loged in
          <button type='button'>Logout</button>
        </div>
        <div>
          {blogs.length} blogs
          {blogs.map( blog => 
            <Blog blog = {blog} />
          )}
        </div>
      </div>}
    </div>
  )
}

export default App