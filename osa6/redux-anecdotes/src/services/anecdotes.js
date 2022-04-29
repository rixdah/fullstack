import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = asObject(content)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const getAnecdoteById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const modifyAnecdote = async (id) => {
  const anecdote = await getAnecdoteById(id)
  const votedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
  return response
}

export default { getAll, createNew, modifyAnecdote }