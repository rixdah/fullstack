import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import SendIcon from '@mui/icons-material/Send'
import blogService from '../services/blogs'

const BlogInfo = ({ blogs, updateBlog }) => {
  const [comment, setComment] = useState('')
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === String(id))

  const incrementLikes = async () => {
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await updateBlog(blog.id, newBlog)
  }

  const addComment = async () => {
    await blogService.addComment(blog.id, { comment })
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <Button variant='contained' color='success' onClick={incrementLikes}>Like</Button></p>
      <p>Added by {blog.user.name}</p>
      <h2>Comments</h2>
      <List>
        {blog.comments.map(comment => (
          <ListItem key={comment}>
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>
            <ListItemText primary={comment}/>
          </ListItem>
        ))}
      </List>
      <form onSubmit={addComment}>
        <div>
          <TextField label='Comment' onChange={({ target }) => setComment(target.value)}/>
        </div>
        <div>
          <Button variant='contained' type='submit' size='large' endIcon={<SendIcon />} >Add comment</Button>
        </div>
      </form>
    </div>

  )
}

export default BlogInfo