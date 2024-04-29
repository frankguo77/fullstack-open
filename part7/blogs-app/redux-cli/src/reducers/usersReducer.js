import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer';
import usersService from '../services/users'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            console.log(action)
            return action.payload
        }
    }
})

export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            const users = await usersService.getAll()
            dispatch(setUsers(users))
        } catch (exception) {
            dispatch(showNotification("error", "Fail to get all users."))
        }
    }
}

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer