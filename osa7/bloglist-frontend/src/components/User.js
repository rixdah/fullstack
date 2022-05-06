import React from 'react'
import { useParams } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import BookIcon from '@mui/icons-material/Book'

const User = u => {
  const id = useParams().id
  const users = u.users
  const user = users.find(user => user.id === String(id))
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <List>
        {user.blogs.map(blog => (
          <ListItem key={blog.id}>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary={`${blog.title}`} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default User