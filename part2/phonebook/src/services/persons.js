import axios from "axios"
const baseUrl = '/api/persons'

// const baseUrl = '/persons'

const getAll = () => {
    console.log()

    const request =  axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = newObject => {
    const request =  axios.post(baseUrl, newObject)
    return request.then(res => res.data)
}

const update = (id, newObject) =>{
    const request =  axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(res => res.data)
}

const deletePerson = (id) => {
    const request =  axios.delete(`${baseUrl}/${id}`)
    return request.then(res => {
        console.log('delete', res.data)
        return res.data
    })
}

export default {getAll, create, update, deletePerson}