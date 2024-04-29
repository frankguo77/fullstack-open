import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    if (notification === null) {
        return null
    }
    console.log('Notification', notification)
    
    return (
        // <div className = {`notification ${notification.status}`} >
        <Alert variant={notification.status} >
            {notification.message}
        </Alert>
    ) 
} 

export default Notification