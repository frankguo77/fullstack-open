import { createAnecdote } from "../requests"
import { useMutation, QueryClient, useQueryClient } from "@tanstack/react-query"


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
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
