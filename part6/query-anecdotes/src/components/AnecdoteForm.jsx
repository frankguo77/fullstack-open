import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch, showNotification } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      // notificationDispatch({type:'SHOW', payload: `anecdote '${newAnecdote.content}' added`})
      // setTimeout(()=>{notificationDispatch({type: 'HIDE'})}, 5000)
      showNotification(notificationDispatch, `anecdote '${newAnecdote.content}' added`)
    },
    onError: (error) => {
      // console.log('onError')
      // console.log('err', error)
      // showNotification(notificationDispatch, `too short anecdote, must have length 5 or more !`)
      showNotification(notificationDispatch, error.response.data.error)
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, id: getId(), votes: 0})
}


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
