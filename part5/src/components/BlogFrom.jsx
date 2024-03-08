import { useState } from "react"

const BlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addNewBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url,
        }

        await props.addBlog(newBlog)
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

export default BlogForm