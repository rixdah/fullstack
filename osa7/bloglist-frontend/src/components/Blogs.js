import Blog from './Blog'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  Button
} from '@mui/material'

const Blogs = ({ sortBlogs, blogs, updateBlog, user, removeBlog, blogFormRef, addBlog }) => (
  <div>
    <Toggleable buttonLabel='Create new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog}/>
    </Toggleable><br/>
    {sortBlogs()}
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell><strong>Blog title</strong></TableCell>
          </TableRow>
          {blogs.map(blog => (
            <TableRow key={blog.id}>
              <TableCell>
                <Button href={`/blogs/${blog.id}`}><Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} removeBlog={removeBlog} /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

export default Blogs