import { useDispatch, useSelector } from "react-redux"
import { updateBlog , removeBlog} from "../reducers/blogReducer"
import { useState } from "react"

const Blog = ({blog}) => {
  console.log('Blog:', blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const user = useSelector(state => state.user)
  
  const [expand, setExpand] = useState(false)
  const showWhenExpand = { display: expand ? '' : 'none' }
  const buttonLabel = expand ? 'hide' : 'view'
  const showRemove = blog.user.id === user.id
  const increaseLikes = () => {
    const newBlog = {...blog, likes: blog.likes + 1}
    dispatch(updateBlog(newBlog))
  }

  const dispatch = useDispatch()


  // console.log("remove", blog.user.id, user)

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setExpand(!expand)}>{buttonLabel}</button>
      <div style={showWhenExpand}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={increaseLikes}>like</button>
        </div>
        {blog.user.name}
        {showRemove && <div>
          <button onClick={remove}>remove</button>
          </div>}
      </div>
    </div>
  )
}

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  if (!user) {
    return null
  }

  return (
    <div>
      {blogs.map(blog => <Blog key={blog.id} blog = {blog} />)}
    </div>
  )
}
export default Blogs