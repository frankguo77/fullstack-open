import axios from "axios"

const baseUrl = '/anecdotes'

export const getAnecdotes = () => 
    axios.get(`${baseUrl}`).then(res => res.data)

export const createAnecdote = newAnecdote => 
    axios.post(`${baseUrl}`, newAnecdote).then(res => res.data)

export const updateAnecdote = updatedAnecdote => 
    axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)