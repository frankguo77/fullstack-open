import axios from "axios"
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_WEATHER_KEY 

const getWeather = (city) => {
    const request =  axios.get(`${baseUrl}?units=metric&q=${city}&appid=${apiKey}`)
    return request.then(res => res.data)
}


export default {getWeather}  