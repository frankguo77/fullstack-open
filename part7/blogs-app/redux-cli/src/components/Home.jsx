import Blogs from "./Blogs"
// import LoginForm from "./LoginForm"
import TogglableBlogForm from "./BlogFrom"
// import {useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { useEffect } from "react"

const Home = () => {
    // const user = useSelector(state => state.user)
    // const navigate = useNavigate()
    // useEffect(() => {
    //     console.log("home useEffect", user)
    //     if (!user) {
    //         navigate('/login')
    //     }
    // }, [user])

    return (
        <div>
            {/* <LoginForm /> */}
            <TogglableBlogForm />
            <Blogs />
        </div>
    )
}

export default Home 