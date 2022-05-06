import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import User from './User'
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableRow,
  TableCell
} from '@mui/material'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>User</strong></TableCell>
              <TableCell><strong>Blogs created</strong></TableCell>
            </TableRow>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users