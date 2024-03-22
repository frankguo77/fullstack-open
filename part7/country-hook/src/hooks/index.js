import { useState, useEffect } from "react"
import countryServices from '../services/countries'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log('useEffect', name)
    if (!name) { return }
    countryServices.getCountry(name)
      .then((res) => {
        const newCountry = {
          found: true,
          data: {
           name: res.data.name.common, 
           capital: res.data.capital,
           population: res.data.population,
           flag: res.data.flags.png
          }
        }
        setCountry(newCountry)
      })
      .catch (() => {
        setCountry({found: false})
      })
  }, [name])

  // return country
  // console.log('useCountry', country)
  return country
}
