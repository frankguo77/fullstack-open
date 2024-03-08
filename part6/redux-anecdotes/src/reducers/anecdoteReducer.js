import { createSlice } from "@reduxjs/toolkit"
import anecdoteSevices from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers: {
    createNew(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      const anecdote = action.payload
      console.log('upateAnecdote', anecdote)
      return state.map(s => s.id !== anecdote.id ? s : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})
// switch (action.type) {
//   case 'VOTE':
//     const anecdote = state.find((s => s.id === action.payload.id))
//     const newanecdote = { ...anecdote, votes: anecdote.votes + 1 }
//     return state.map((s) => s.id !== action.payload.id ? s : newanecdote)
//   case 'NEW':
//     return [...state, action.payload]
//   default:
//     return state
// }

// export const voteFor = (id) => ({
//   type: 'VOTE',
//   payload: { id }
// })

// export const createNew = (content) => ({
//   type: 'NEW',
//   payload: {
//     content,
//     id: getId(),
//     votes: 0
//   }
// })
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteSevices.createNew(content)
    dispatch(createNew(newAnecdote))
  }
}

export const initializeAndecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteSevices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const increaseVote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteSevices.increaseVote(id)
    dispatch(updateAnecdote(anecdote))
  }
}
export const { createNew, updateAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer