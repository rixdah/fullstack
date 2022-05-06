import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import { BrowserRouter as Router, Route, Link, Routes, Navigate, useLocation } from 'react-router-dom'
import Blogs from './components/Blogs'
import Users from './components/Users'
import { Container, Button, Alert, AppBar, Toolbar, NativeSelect } from '@mui/material'
import User from './components/User'
import userService from './services/users'
import BlogInfo from './components/BlogInfo'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationSeverity, setNotificationSeverity] = useState('success')
  const [users, setUsers] = useState([])

  const blogFormRef = useRef()
  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationSeverity('error')
      setNotificationMessage('Wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNotificationSeverity('success')
    setNotificationMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 4000)
  }

  const updateBlog = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    const blogs = await blogService.getAll()
    setBlogs( blogs )
  }

  const removeBlog = async id => {
    await blogService.remove(id)
    blogService.getAll().then(blogs => setBlogs(blogs))
  }

  const sortBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes)
  }

  const location = useLocation()

  if (user === null) {
    return (
      <Container>
        <div>
          {notificationMessage && <Alert severity={notificationSeverity}>{notificationMessage}</Alert>}
        </div>
        <div>
          <Routes>
            <Route path='/' element={<Navigate replace to='/login' />} />
            <Route path='/login' element={<LoginForm
              handleLogin={handleLogin}
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)} />} />
          </Routes>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div>
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Button color='inherit' component={Link} to='/'>
                Blogs
              </Button>
              <Button color='inherit' component={Link} to='/users'>
                Users
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        <h2>Blog app</h2>
        <div>
          {notificationMessage && <Alert severity={notificationSeverity}>{notificationMessage}</Alert>}
        </div>
        <div>
          {user.name} logged in <Button color='primary' variant='contained' onClick={handleLogout}>Logout</Button>
        </div><br/>
        <Routes>
          <Route path='/login' element={<Navigate replace to='/' />} />
          <Route path='/' element={<Blogs
            sortBlogs={sortBlogs}
            blogs={blogs}
            updateBlog={updateBlog}
            user={user}
            removeBlog={removeBlog}
            blogFormRef={blogFormRef}
            addBlog={addBlog} />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User users={users}/>} />
          <Route path='/blogs/:id' element={<BlogInfo blogs={blogs} updateBlog={updateBlog} />} />
        </Routes>
      </div>
    </Container>
  )
}

export default App