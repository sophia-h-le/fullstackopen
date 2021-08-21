const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    const user = await User.findById(decodedToken.id)

    if (body.title === 'undefined' || body.url === 'undefined') {
        response.status(400).end()
    } else {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            comments: body.comments || [],
            user: user._id
        })
    
        // blog.save()
        //     .then(savedBlog => {
        //         response.status(201).json(savedBlog.toJSON())
        //     })
        //     .catch(error => next(error))
        try {
            const savedBlog = await blog.save()
            logger.info(`added ${blog.title} to the blog list`)
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
            logger.info(`blog added to user ${user.username}`)
            response.status(201).json(savedBlog.toJSON())
        } catch (exception) {
            next(exception)
        }
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const user = await User.findById(decodedToken.id)

    const blogToDelete =  await Blog.findById(request.params.id)

    if (blogToDelete.user._id.toString() === user._id.toString()) {
        try {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } catch (exception) {
            next(exception)
        }
    } else {
        return response.status(401).json({ error: 'Unauthorized' })
    }
    
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    const user = await User.findById(decodedToken.id)

    const blogToUpdate = await Blog.findById(request.params.id)

    if (blogToUpdate.user._id.toString() === user._id.toString()) {
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            comments: body.comments || [],
            user: user._id
        }

        try {
            const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
            logger.info(`blog ${blog.title} successfully updated`)
            response.status(200).json(blogToUpdate.toJSON())
        } catch (exception) {
            next(exception)
        }
    } else {
        return response.status(401).json({ error: 'Unauthorized' })
    }
})

module.exports = blogsRouter