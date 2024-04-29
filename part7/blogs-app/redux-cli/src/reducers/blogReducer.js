import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'
import { showNotification } from "./notificationReducer";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers:{
        setBlogs(state, action) {
            console.log(action)
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        changeBlog(state, action) {
            const changedBlog = action.payload
            return state.map((blog) => blog.id == changedBlog.id ? changedBlog : blog)
        },
        deleteBlog(state, action) {
            const deleteID = action.payload
            return state.filter(blog => blog.id != deleteID)
        }
    }
})

export const initBlogs = () => {
    return async dispatch => {
       const blogs = await blogService.getAll() 
       console.log(blogs)
       dispatch(setBlogs(blogs))
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const blog = await blogService.create(newBlog)
        dispatch(appendBlog(blog))
        dispatch(showNotification('success', `a new blog ${blog.title} by ${blog.author} added`))
    }
}

export const updateBlog = (blog) => {
    return async dispatch => {
        const changedBlog = await blogService.update(blog)
        dispatch(changeBlog(changedBlog))
        dispatch(showNotification('success', `a blog ${blog.title} by ${blog.author} updated`))
    }
} 

export const removeBlog = (id) => {
    return async dispatch => {
        const _ = await blogService.remove(id)
        // console.log('removeBlog', deletedBlog)
        dispatch(deleteBlog(id))
        dispatch(showNotification('success', `a blog ${blog.title} by ${blog.author} deleted`))
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        const blog = await blogService.addComment(id, comment)
        dispatch(changeBlog(blog))
    }
}

export const { setBlogs, appendBlog, changeBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer