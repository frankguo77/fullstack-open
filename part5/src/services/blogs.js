import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request
  .then(response => {
    console.log('response', JSON.stringify(response.data))
    // return []
    return response.data
  })
  .catch (error => console.log(error))
}

export default { getAll }