import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login , logout} from '../reducers/userReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password)) 
  }

  if (user) {
    return (
      <div>
        {user.username} loged in
        <button type="button" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          autoComplete="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          name="Password"
          autoComplete="current-password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
