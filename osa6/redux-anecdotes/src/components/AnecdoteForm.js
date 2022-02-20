import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    console.log(event.target)
    const text = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(text))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm