import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY
const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`

const getWeather = (location) => {
  const url = `${baseUrl}&q=${location}&aqi=no`

  const request = axios.get(url)

  return request.then(response => response.data)
}

export default { getWeather }