import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
    console.log('reducer', state, action)
    switch (action.type) {
        case "SHOW":
            return action.payload
        case "HIDE":
            return ""
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    console.log('NotificationContextProvider', notification)

    return (
        <NotificationContext.Provider value = {[notification, notificationDispatch]} >
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export const showNotification = (dispatch, message) => {
    console.log('showNotification', message)
    // const notificationAndDispatch = useContext(NotificationContext)
    // console.log('notificationAndDispatch', notificationAndDispatch)
    // const dispatch = notificationAndDispatch[1]
    dispatch({type: 'SHOW', payload: message})
    setTimeout(() => {
       dispatch({type: 'HIDE'}) 
    }, 5000);
}

export default NotificationContext