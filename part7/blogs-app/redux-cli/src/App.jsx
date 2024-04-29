import {
  Routes, 
  Route, 
  Link,
  Navigate,
  NavLink,
} from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import TogglableBlogForm from './components/BlogFrom'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { initBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import BlogDetail from './components/BlogDetail'
import Home from './components/Home'
import Users from './components/Users'
import UserDetail from './components/UserDetatil'
import { getAllUsers } from './reducers/usersReducer'
import { initUser, logout } from './reducers/userReducer'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

const App = () => {
  // const [notification, setNotification] = useState(null)
  // const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
     dispatch(initBlogs())
     dispatch(getAllUsers())
     dispatch(initUser())
  }, [dispatch])

  const padding = {
    padding: 5
  }

  console.log('app user', user)
  return (
    <div className='container'>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='mr-auto'>
          <Nav.Link as={NavLink} to='/'>
            blogs
          {/* <ink style={padding} to='/'>blogs</Link> */}
          </Nav.Link>
          <Nav.Link as={NavLink} to='/users'>
            users
          {/* <Link style={padding} to='/users'>users</Link> */}
          </Nav.Link>
          {user 
          ? <Nav.Link href="#" as="span">
              {user.username} logged in
              <Button variant='link' onClick={() => dispatch(logout())}>logout</Button>
            </Nav.Link>
          :<Nav.Link as={NavLink} to='/login'>login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h1>Blogs App</h1>
      <Notification />
      <Routes>
        <Route path='/' element={user ? <Home /> : <LoginForm />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<UserDetail />} />
        <Route path='/blogs/:id' element={<BlogDetail />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  );
}


export default App