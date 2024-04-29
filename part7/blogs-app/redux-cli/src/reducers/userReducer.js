import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer';
import loginService from '../services/login'
import blogService from '../services/blogs'
const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            console.log(action)
            return action.payload
        }
    }
})

export const login = (username, pwd) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({
                username,
                password:pwd,
            })
            window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
            console.log("login ok")
            dispatch(setUser(user))
            blogService.setToken(user.token)
            dispatch(showNotification("success", `Welcom ${username}!`))
        } catch (exception) {
            dispatch(showNotification("error", "Wrong credentials"))
        }
    }
}

export const initUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }
}

export const logout = () => {
    console.log('logout')
    return async dispatch => {
        window.localStorage.removeItem("loggedBlogappUser")
        console.log('logout dispatch')
        blogService.setToken(null)
        dispatch(setUser(null))
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer