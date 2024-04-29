import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/userReducer';
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password)) 
    navigate('/', {replace: true})
  }


  return (
    <div>
      <h2>Login to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            autoComplete="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant='primary' type="submit">login</Button>
      </Form>
    </div>
  );
};

export default LoginForm;
