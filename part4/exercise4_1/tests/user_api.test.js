const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require ('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash})

    await user.save()
})

describe('when there are users in db', () => {
    test('creation succeeds with a valid user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'testUser',
            name: 'testUser',
            password: 'testPassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = uersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation succeeds without name property', async () => {
        const usersAtStart = await helper.usersInDb()

        const noName = {
            username: 'noName',
            password: 'testPassword'
        }

        await api
            .post('/api/users')
            .send(noName)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = await helper.usersInDb()
        expect(usernames).toContain(noName.username)
    })

    test('creation fails with a duplicate username', async () => {
        const usersAtStart = await helper.usersInDb()

        const dupUsername = {
            username: 'root',
            name: 'duplicateRoot',
            password: 'testPassword'
        }

        await api
            .post('/api/users')
            .send(dupUsername)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails without username', async () => {
        const usersAtStart = await helper.usersInDb()

        const noUsername = {
            name: 'noUsername',
            password: 'testPassword'
        }

        await api
            .post('/api/users')
            .send(noUsername)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with username length less than 3', async () => {
        const usersAtStart = await helper.usersInDb()

        const shortUsername = {
            username: 'sh',
            name: 'shortUsername',
            password: 'testPassword'
        }

        await api
            .post('/api/users')
            .send(shortUsername)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails without password', async () => {
        const usersAtStart = await helper.usersInDb()

        const noPassword = {
            username: 'noPassword',
            name: 'noPassword'
        }

        await api
            .post('/api/users')
            .send(noPassword)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart)
    })

    test('creation fails with password length less than 3', async () => {
        const usersAtStart = await helper.usersInDb()

        const shortPassword = {
            username: 'shortPassword',
            name: 'shortPassword',
            password: 'sh'
        }

        await api
            .post('/api/users')
            .send(shortPassword)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart)
    })
})