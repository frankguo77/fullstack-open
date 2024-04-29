import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    // console.log('login', response.data)
    return response.data
}

export default {getAll}