import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
    return (
       <li>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleVote}>vote</button>
          </div>
       </li> 
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        console.log('AnecdoteList',state)
        if (state.filter === '') {
            console.log('state.anecdotes',state.anecdotes)
            return state.anecdotes
                .toSorted((a, b) => b.votes - a.votes)
        }

        return state.anecdotes.filter((ad) =>
            ad.content.toLowerCase()
                .includes(state.filter.toLowerCase()))
            .toSorted((a, b) => b.votes - a.votes)
    })
        

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={() => {
                        console.log('vote', anecdote.id)
                        dispatch(increaseVote(anecdote.id))
                        dispatch(setNotification(`Your voted for "${anecdote.content}" !`, 5))
                    }}
                />
            )}
        </ul>
    )
}

export default AnecdoteList