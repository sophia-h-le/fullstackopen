const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
})

describe('Return blog info when there is some blogs saved', () => {
    beforeEach(async () => {
        const newUser = {
            username: 'root',
            name: 'root',
            password: 'password'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)

        let headers = {
            'Authorization': `bearer ${result.body.token}`
        }
    })

    test('blogs are return as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .set(headers)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api
                .get('/api/blogs')
                .set(headers)
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the default unique identifier property of the blog posts is _id', async () => {
        const blogs = await Blog.find({})
        expect(blogs[0]._id).toBeDefined()
    })
})

describe('adding blog by http post request to /api/blogs', () => {
    beforeEach(async () => {
        const newUser = {
          username: 'root',
          name: 'root',
          password: 'password',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
    
        const result = await api
          .post('/api/login')
          .send(newUser)
    
        let headers = {
          'Authorization': `bearer ${result.body.token}`
        }
      })

    test('a valid blog can be added', async() => {
        const blogToAdd = {
            title: 'new blog to add',
            author: 'test user',
            url: 'dummy url',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(blogToAdd)
            .expect(201)
            .set(headers)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        
        const contentsAtEnd = blogsAtEnd.map(b => b.title)
        expect(contentsAtEnd).toContain(blogToAdd.title)
        }
    )

    test('missing likes will be default to 0', async() => {
        const noLikeBlog = {
            title: 'blog missing likes property',
            author: 'test user',
            url: 'another dummy url'
        }

        await api.post('/api/blogs')
            .send(noLikeBlog)
            .expect(201)
            .set(headers)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const addedBlog = blogsAtEnd.find(b => b.title === noLikeBlog.title)
        expect(addedBlog.likes).toBe(0)
    })
    test('missing title will get response 400', async() => {
        const noTitleBlog = {
            author: 'test user',
            url: 'more dummy url',
            like: 0
        }

        await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .set(headers)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    test('missing url will get response 400', async() => {
        const noUrlBlog = {
            title: 'no url blog',
            author: 'test user',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(noUrlBlog)
            .set(headers)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('updating a blog', () => {
    beforeEach(async () => {
        const newUser = {
          username: 'root',
          name: 'root',
          password: 'password',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
    
        const result = await api
          .post('/api/login')
          .send(newUser)
    
        let headers = {
          'Authorization': `bearer ${result.body.token}`
        }
    })

    test('increment likes', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[blogsAtStart.length -1]
        const newBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes + 1
        }
        
        await api.put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)
            .set(headers)
            .expect('Content-Type', /application\/json/)
            
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        const updatedBlog = blogsAtEnd.find(b => b.title === newBlog.title)
        expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1)
    })
})

describe('deleting a blog', () => {
    beforeEach(async () => {
        const newUser = {
          username: 'root',
          name: 'root',
          password: 'password',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
    
        const result = await api
          .post('/api/login')
          .send(newUser)
    
        let headers = {
          'Authorization': `bearer ${result.body.token}`
        }
    })

    test('success deletion of a blog with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        console.log('blog at start length', blogsAtStart.length)
        const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set(headers)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const contentsAtEnd = blogsAtEnd.map(b => b.title)
        expect (contentsAtEnd).not.toContain(blogToDelete.title)
    })
})

afterAll(() => {
    mongoose.connection.close()
})