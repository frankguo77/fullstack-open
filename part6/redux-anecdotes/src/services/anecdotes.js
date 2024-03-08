import axios from 'axios'

const baseUrl = '/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createNew = async (content) => {
    const object = {content, id:getId(), votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const increaseVote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    const obj = response.data
    console.log('increaseVote', obj)
    const newObj = {...obj, votes : obj.votes + 1}
    const putResponse = await axios.put(`${baseUrl}/${id}`, newObj)
    console.log('increaseVote',putResponse.data)
    return putResponse.data
}

export default { getAll , createNew, increaseVote }