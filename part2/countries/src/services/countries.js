import axios from "axios"
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request =  axios.get(`${baseUrl}/all`)
    return request.then(res => res.data)
}


const getCountry = (name) => {
    const request =  axios.get(`${baseUrl}/name/${name}`)
    return request.then(res => {
        console.log('getcountry', res.data)
        return res.data
    })
}

export default {getAll, getCountry} 