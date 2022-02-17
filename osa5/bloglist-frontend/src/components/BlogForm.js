import { useState } from 'react'

const BlogForm = ({addBlog}) => {
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
          onChange={({target}) => setNewTitle(target.value)}
        /></div>
        <div>Author:<input
          type='text'
          value={newAuthor}
          onChange={({target}) => setNewAuthor(target.value)}
        /></div>
        <div>Url:<input
          type='text'
          value={newUrl}
          onChange={({target}) => setNewUrl(target.value)}
        /></div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm