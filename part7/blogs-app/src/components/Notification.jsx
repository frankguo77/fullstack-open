import { useSelector } from "react-redux"

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    if (notification === null) {
        return null
    }
    console.log('Notification', notification)
    
    return (
        <div className = {`notification ${notification.status}`} >
            {notification.message}
        </div> 
    ) 
} 

export default Notification