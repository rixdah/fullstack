const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('right amount of JSON-formatted blogs returned', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('returned blogs have identifier "id"', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach((blog) => {
        expect(blog.id).toBeDefined()
    })
})

test('HTTP POST to /api/blogs works correctly', async () => {
    const newBlog = {
        title: 'New testing blog',
        author: 'Riku',
        url: 'urlfortesting.com',
        likes: 45
    }
    await api
        .post('/api/blogs')
        .send(newBlog)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(blog => blog.title)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain('New testing blog')
})

test('likes field gets value 0 when no value is given', async () => {
    const blogWithNoLikesValue = {
        title: 'No likes given for this blog',
        author: 'Riku',
        url: 'nolikes.com'
    }

    await api
        .post('/api/blogs')
        .send(blogWithNoLikesValue)
    
    const response = await api.get('/api/blogs')
    expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('posting a blog with no title and url gets the status code 400 as response', async () => {
    const blogWithNoTitleAndUrl = {
        author: 'Riku',
        likes: 1
    }
    await api
        .post('/api/blogs')
        .send(blogWithNoTitleAndUrl)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})