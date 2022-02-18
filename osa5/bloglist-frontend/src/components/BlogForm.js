import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    addBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  }

  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>Title:<input
          type='text'
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          placeholder='Title of the blog'
        /></div>
        <div>Author:<input
          type='text'
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          placeholder='Author of the blog'
        /></div>
        <div>Url:<input
          type='text'
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
          placeholder='Url for the blog'
        /></div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm