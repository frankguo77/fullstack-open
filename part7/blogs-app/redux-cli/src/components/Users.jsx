import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const User = ({user}) => {
    return (
        <tr>
            <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
            </td>
            <td>
                {user.blogs.length}
            </td>
        </tr>
    )
}
const Users = () => {
    const users = useSelector(state => state.users)

    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <thead>
                <tr>
                    <th>User</th>
                    <th>Blogs created</th>
                </tr>
                </thead>
               <tbody> 
                    {users.map(user => <User key={user.id} user = {user} />)}
                </tbody>
            </Table>
        </div>
    )
}

export default Users