import { useEffect, useState } from "react"

import weatherService from "../services/weather"

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    weatherService
      .getWeather(country.capital[0])
      .then(weatherResponse => {
        const weatherObj = {
          temperature: weatherResponse.current.temp_c,
          icon: weatherResponse.current.condition.icon,
          condition: weatherResponse.current.condition.text.toLowerCase()
        }
        setWeather(weatherObj)
        console.log(weather)
      })
  }, [])

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <p><b>languages:</b></p>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>weather in {country.capital[0]}:</h2>
      <p>temperature is {weather.temperature} celsius</p>
      <div>
        <img src={weather.icon} alt={weather.condition}></img>
        <p>condition is {weather.condition}</p>
      </div>
    </>
  )
}

export default CountryInfo
