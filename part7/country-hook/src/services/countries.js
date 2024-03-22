import axios from "axios"
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request =  axios.get(`${baseUrl}/all`)
    return request.then(res => res.data)
}


const getCountry = async (name) => {
    const response = await axios.get(`${baseUrl}/name/${name}`)
    console.log(response)
    return response
}

export default {getAll, getCountry} 