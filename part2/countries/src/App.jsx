import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries]= useState([])
  const [candidats, setCandidates] = useState([])
  const [country, setCountry] = useState(null)

  const getAllCountries = () =>{
    countryService
    .getAll()
    .then(data => {
        console.log(data)
        const allContris = data.map((c) => {
            if (c.capital == null) {
              console.log(c.name.common)
            }
            // console.log(!c.capital.length ? c.capital[0] :"")
            return {
              name: c.name.common,
              capital: (c.capital!=null && c.capital.length) ? c.capital[0] :"",
              area: c.area,
              lan: c.languages == null ? [] : Object.entries(c.languages).map(([k,v]) => v),
              flag: c.flags
            }
        })
        console.log(allContris)

        setCountries(allContris)
      })
  }

  const getCandidates = () => {
    const candids = countries.filter((c) => c.name.startsWith(filter))
    setCandidates(candids)
    // console.log("getCandidates")
    // console.log("All",countries)
    // console.log("Can", candids)
    // if (candids.length == 0) {
    //   setDetail(candids[0])
  }

  const filterChangedHandler = (event) =>{
    console.log(event.target.value)
    setFilter(event.target.value)
    setCountry(null)
  }
  
  const countryClicked = (event) => {
      console.log("countryClicked:", event)
      const selectedCountry = countries.find((c) => c.name == event.target.value)
      setCountry(selectedCountry)
  }

  useEffect(() =>{
    if (countries.length == 0) {
        getAllCountries()        
        return
    }
    
    if (filter.trim().length == 0) {
      setCandidates([])
      return
    }

    getCandidates()
  },[filter])
  
  if (countries.length==0) return <p>Preparing county data...</p>

  return (
    <>
      <Filter value = {filter} handler = {filterChangedHandler} />
      {!country
          ?<Countries countries = {candidats} clicked = {countryClicked}/>
          :<CountryInfo country = {country} />
      }
    </>
  )
}

export default App
