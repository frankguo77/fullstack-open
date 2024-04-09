import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import TogglableBlogForm from './components/BlogFrom'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { initBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'

const App = () => {
  // const [notification, setNotification] = useState(null)
  // const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
     dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])


  const user = useSelector(state => state.user)
  
  return (
    <div>
      <h1>{user ? "blogs" : "log in to application"}</h1>
      <Notification />
      <LoginForm />
      <TogglableBlogForm />
      <Blogs />
    </div>
  );
}

export default App