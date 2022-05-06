import React, { useState } from 'react'
import { Button } from '@mui/material'

const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const showRemove = { display: blog.user.username === user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const deleteBlog = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      console.log(blog.id)
      await removeBlog(blog.id)
    }
  }

  return (
    <div>
      {blog.title} {blog.author}
    </div>
  )
}

export default Blog