const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')
const helper = require('./test.helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = helper.initialUsers.map(user => new User(user))
  const userPromises = userObjects.map(user => user.save())
  await Promise.all(userPromises)
})

describe('POST /api/users', () => {
  
  describe('when posting a valid user', () => {

    it('adds the user', async () => {
      const user = {
        username: 'teste',
        name: 'teste teste',
        password: 'testesenha123'
      }

      await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const users = await helper.getUsersInDB()
      const usernames = users.map(user => user.username)

      expect(users).toHaveLength(helper.initialUsers.length + 1)
      expect(usernames).toContain(user.username)
    })

  })

  describe('when posting a user with invalid username', () => {

    it('returns with status code 400', async () => {
      const user = {
        username: 'ab',
        name: 'teste',
        password: 'teste'
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
      
      expect(response.body.error).toBeDefined()
    })

  })

  describe('when posting a user with invalid password', () => {

    it('returns with status code 400', async () => {
      const user = {
        username: 'abcdefg',
        name: 'teste',
        password: 'hi'
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
      
      expect(response.body.error).toBeDefined()
    })

  })

})

afterAll(async () => {
  await mongoose.connection.close()
})