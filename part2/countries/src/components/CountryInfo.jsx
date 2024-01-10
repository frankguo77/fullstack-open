import { useEffect, useState } from "react"
import weatherService from "../services/weather"

const Weather = ({city}) => {
    const [weather, setWeather] = useState(null)

    const iconUrl = `https://openweathermap.org/img/wn`

    useEffect(() =>{
        weatherService
        .getWeather(city)
        .then((data) => {
            console.log(data)
            setWeather(data)
        })
    },[])

    if (!weather) {
        return <p>Preparing wheather data...</p>
    }

    return (
        <>
            <h1>Wheather in {city}</h1>
            <p>temperature {weather.main.temp} Celcius</p>
            <img alt={weather.weather[0].discription} src={`${iconUrl}/${weather.weather[0].icon}@2x.png`}></img>
            <p>wind {weather.wind.speed} m/s</p>
        </>
    )


}
const CountryInfo = ({country}) => {
    console.log("CountryInfo", country)
   return ( 
        <>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {country.lan.map((c)=> <li key = {c}>{c}</li>)}
            </ul>
            <img src={country.flag.png} alt={country.flag.alt} />
            <Weather city = {country.capital} />
        </>
   )
}

export default CountryInfo