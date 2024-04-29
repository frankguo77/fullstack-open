import { useDispatch, useSelector } from "react-redux"
import { updateBlog , removeBlog} from "../reducers/blogReducer"
import { useState } from "react"
import { Link } from "react-router-dom"
import {Button} from 'react-bootstrap'
const Blog = ({blog}) => {
  // console.log('Blog:', blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const [expand, setExpand] = useState(false)
  const showWhenExpand = { display: expand ? '' : 'none' }
  const buttonLabel = expand ? 'hide' : 'view'
  const showRemove = blog.user.id === user.id
  const increaseLikes = () => {
    const newBlog = {...blog, likes: blog.likes + 1}
    dispatch(updateBlog(newBlog))
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
     <div  className='container' style={blogStyle}>
       {blog.title} {blog.author}
       <Button onClick={() => setExpand(!expand)}>{buttonLabel}</Button>
       <div style={showWhenExpand}>
         <div>{blog.url}</div>
         <div>
           likes {blog.likes}
           <Button onClick={increaseLikes}>like</Button>
         </div>
         {blog.user.name}
         {showRemove && <div>
           <Button onClick={remove}>remove</Button>
           </div>}
       </div>
     </div>
  )
}

const Blogs = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyleType: 'none',
  }

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  if (!user) {
    return null
  }


  return (
    <ul>
      {blogs.map(blog => 
      <li key={blog.id} style={blogStyle}>
        <Link  to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </li>
      )}
    </ul>
  )
}
export default Blogs