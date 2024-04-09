import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice ({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})

export const showNotification = (status, content) => {
    return async dispatch => {
        console.log('showNotification', status, content)
        dispatch(setNotification({status, content}))
        setTimeout(() => dispatch(setNotification(null)), 5000)
    }
}

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer