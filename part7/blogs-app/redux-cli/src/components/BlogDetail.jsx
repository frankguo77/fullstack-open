import {useDispatch, useSelector} from 'react-redux'
import { updateBlog , addComment} from '../reducers/blogReducer'
import {useMatch} from 'react-router-dom'
import { useState } from 'react'
import { showNotification } from '../reducers/notificationReducer'
import {Button, Form} from 'react-bootstrap'

const BlogDetail = () => {
  const [comment, setComment] = useState('')
  const blogs = useSelector(state => state.blogs)
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const dispatch = useDispatch()
  const increaseLikes = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(newBlog))
  }

  const addCommentToServer = () => {
    if (!comment) {
      dispatch(showNotification('error', `comment should not be empty`))

      return
    }

    console.log('addCommentToServer', comment)
    
    dispatch(addComment(blog.id, comment))
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes <Button onClick={increaseLikes}>like</Button>
      <br />
      added by {blog.author}
      <h3>comments</h3>
      <input type='text' value={comment} onChange={({target})=> { console.log( target.value) ; setComment(target.value)}} />
      <Button onClick={addCommentToServer}>add comment</Button>
      <ul>
        {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default BlogDetail