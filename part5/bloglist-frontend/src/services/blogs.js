import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async blogObject => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const update = async (id, blogObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = await axios.put(`${ baseUrl }/${id}`, blogObject, config)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = await axios.delete(`${ baseUrl }/${id}`, config)
  return request.data
}

// eslint-disable-next-line
export default { getAll, create, update, remove, setToken }