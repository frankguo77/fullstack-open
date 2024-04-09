import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newtoken => {
    token = `Bearer ${newtoken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    // return []
    return response.data
  } catch (error) {
     console.log(error)
  }
}

const create = async newblog => {
  const config = {
    headers : { Authorization: token }
  }

  const response = await axios.post(baseUrl, newblog, config)
  return response.data
} 

const update = async (newblog) => {
  const config = {
    headers : { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${newblog.id}`, newblog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers : { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove, setToken }