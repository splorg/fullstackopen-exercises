import { useState } from "react"

import CountryInfo from "./CountryInfo"

const CountryList = ({ countries, search }) => {
  const [country, setCountry] = useState({})

  const handleShow = country => {
    setCountry(country)
    console.log(country)
  }

  const filteredCountries = countries.filter(country => {
    if (country.name.common.includes(search.toLowerCase())) {
      return true
    }

    if (country.altSpellings.filter(spelling => spelling.toLowerCase().includes(search.toLowerCase())).length) {
      return true
    }
    
    return false
  })

  if (filteredCountries.length === 1 && !country.name) {
    setCountry(filteredCountries[0])
  }

  if (filteredCountries.length === 0 && country.name) {
    setCountry({})
  }

  return (
    <>
      {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
      {(filteredCountries.length <= 10 && !country.name) && filteredCountries.map(country => (
        <div key={country.name.common}>
          <p>{country.name.common}</p>
          <button onClick={() => handleShow(country)}>show</button>
        </div>
      ))}
      {country.name && <CountryInfo country={country} />}
    </>
  )
}

export default CountryList
