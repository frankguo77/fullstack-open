import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch, showNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updateAnecdote) => {
      // queryClient.invalidateQueries({queryKey:['anecdotes']})
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueriesData(['anecdotes'], anecdotes.map(andecdote => andecdote.id !== updateAnecdote.id ? andecdote : updateAnecdote))
      // notificationDispatch({type:'SHOW', payload: `anecdote '${updateAnecdote.content}' voted`})
      // setTimeout(()=>{notificationDispatch({type: 'HIDE'})}, 5000)
      showNotification(notificationDispatch, `anecdote '${updateAnecdote.content}' voted`)
    }
  })
  const handleVote = (anecdote) => {
    console.log('vote')
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    updateAnecdoteMutation.mutate(updatedAnecdote)
  }
  
  const result = useQuery( {
    queryKey:['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  
  const anecdotes = result.data
  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
