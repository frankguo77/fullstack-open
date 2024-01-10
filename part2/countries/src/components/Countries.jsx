const Country = ({country, clicked}) => {
     return (
          <p>
               {country.name} <button value = {country.name} onClick={clicked}>show</button>
          </p>
     )
}
const Countries = ({countries, clicked}) => {
   console.log(countries)
   if (countries.length == 0) {
        return null
   }
   
   if (countries.length < 10) {
        return (
            <>
                {countries.map((c) => <Country country = {c} clicked={clicked} />)}
            </>
        )
   }

   return (
        <p>Too many matches, specify another filter</p>
   )
}

export default Countries