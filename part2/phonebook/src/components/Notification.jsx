const Notification = ({notification}) => {
    if (notification == null) {
        return null
    }
    
    return (
        <div className = {`notification ${notification.status}`} >
            {notification.message}
        </div> 
    ) 
} 

export default Notificatio