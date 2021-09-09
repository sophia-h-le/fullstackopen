import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token},
  }
}

const getAll = async() => {
  // const request = axios.get(baseUrl)
  // return request.then(response => response.data)
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blogToUpdate) => {
  const response = await axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate, config)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove, setToken }