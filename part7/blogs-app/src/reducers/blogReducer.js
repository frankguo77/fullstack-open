import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers:{
        setBlogs(state, action) {
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
       dispatch(setBlogs(blogs))
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const blog = await blogService.create(newBlog)
        dispatch(appendBlog(blog))
    }
}

export const updateBlog = (blog) => {
    return async dispatch => {
        const changedBlog = await blogService.update(blog)
        dispatch(changeBlog(changedBlog))
    }
} 

export const removeBlog = (id) => {
    return async dispatch => {
        const deletedBlog = await blogService.remove(id)
        // console.log('removeBlog', deletedBlog)
        dispatch(deleteBlog(id))
    }
}

export const { setBlogs, appendBlog, changeBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer