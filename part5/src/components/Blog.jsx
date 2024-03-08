import { useState } from "react"

const Blog = ({ blog, user, handleUpdate, handleDelete }) => {
  console.log('Blog:', blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expand, setExpand] = useState(false)
  const showWhenExpand = { display: expand ? '' : 'none' }
  const buttonLabel = expand ? 'hide' : 'view'
  const showRemove = blog.user.id === user.id
  const increaseLikes = () => {
    const newBlog = {...blog, likes: blog.likes + 1}
    handleUpdate(newBlog)
  }

  // console.log("remove", blog.user.id, user)

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog)
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

export default Blog