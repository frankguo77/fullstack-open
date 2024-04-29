import {useMatch} from 'react-router-dom'
import {useSelector} from 'react-redux'

const UserDetail = () => {
  const users = useSelector(state => state.users)
  console.log('UserDetail', users)
  const match = useMatch('/users/:id')
  const user = match 
    ? users.find(user => user.id === match.params.id) 
    : null
    
    if (!user) {return null}
    return (
        <div>
            <h2>{user.username}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map(blog => (
                    <li key = {blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserDetail 