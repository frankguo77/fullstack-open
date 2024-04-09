import { useState, useRef } from "react"
import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from "react-redux"
import Togglable from "./Togglable"

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
        <form onSubmit={addNewBlog}>
            <h1>create new</h1>
            <div>
                title:
                <input
                    type='text'
                    name='Title'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    type='text'
                    name='Author'
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                    type='text'
                    name='Url'
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

const TogglableBlogForm = () => {
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();
  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      dispatch(showNotification('success', `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`))
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