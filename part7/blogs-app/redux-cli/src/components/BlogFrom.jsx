import { useState, useRef } from "react"
import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from "react-redux"
import Togglable from "./Togglable"
import { Form, Button} from 'react-bootstrap'

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const addNewBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url,
        }
        dispatch(createBlog(newBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <Form onSubmit={addNewBlog}>
            <h1>create new</h1>
            <Form.Group>
                <Form.Label>title:</Form.Label>
                <Form.Control
                    type='text'
                    name='Title'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>author:</Form.Label>
                <Form.Control
                    type='text'
                    name='Author'
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>url:</Form.Label>
                <Form.Control
                    type='text'
                    name='Url'
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </Form.Group>
            <Button variant="primary" type='submit'>create</Button>
        </Form>
    )
}

const TogglableBlogForm = () => {
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();
  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(newBlog))
    } catch (err) {
      console.log('addBlog err', err)
      dispatch(showNotification('error', 'add blog error'))
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    </div>
  );
};

export default TogglableBlogForm 