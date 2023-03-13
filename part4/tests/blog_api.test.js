const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')

const helper = require('./test.helper')

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany({})
  
  const testUser = {
    username: 'teste',
    name: 'teste',
    password: 'testando'
  }

  await api
    .post('/api/users')
    .send(testUser)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const blogPromises = blogObjects.map(blog => blog.save())
  await Promise.all(blogPromises)
})

describe('GET /api/blogs', () => {

  describe('when requesting all blogs', () => {

    it('returns the correct amount of blogs', async () => {
      const blogs = await helper.getBlogsInDB()
  
      expect(blogs).toHaveLength(helper.initialBlogs.length)
    })

    it('returns blogs identified by id property', async () => {
      const blogs = await helper.getBlogsInDB()
  
      blogs.forEach(blog => {
        expect(blog._id).toBeUndefined()
        expect(blog.id).toBeDefined()
      })
    })

  })

})

describe('POST /api/blogs', () => {
  
  describe('when adding a valid blog', () => {
    
    it('adds the blog', async () => {
      const user = {
        username: 'teste',
        password: 'testando'
      }

      const loggedUser = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newBlog = {
        title: 'teste add blog',
        url: 'teste.com',
        likes: 7
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loggedUser.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.getBlogsInDB()

      const titles = blogs.map(blog => blog.title)

      expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
      expect(titles).toContain('teste add blog')
    })

  })

  describe('when adding a blog without the likes property', () => {

    it('likes will default to 0', async () => {
      const user = {
        username: 'teste',
        password: 'testando'
      }

      const loggedUser = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      const newBlog = {
        title: 'teste default likes',
        url: 'teste.com',
      }
        
      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loggedUser.body.token}`)
        .send(newBlog)
          
      expect(response.body.likes).toBe(0)
    })

  })

  describe('when adding a blog without url or title', () => {

    it('responds with status code 400', async () => {
      const user = {
        username: 'teste',
        password: 'testando'
      }

      const loggedUser = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      const blogWithoutTitle = {
        url: 'teste.com',
        likes: 7
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loggedUser.body.token}`)
        .send(blogWithoutTitle)
        .expect(400)
      
      const blogWithoutUrl = {
        title: 'teste add blog',
        likes: 7
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loggedUser.body.token}`)
        .send(blogWithoutUrl)
        .expect(400)
    })

  })

  describe('when adding a blog while unauthorized', () => {

    it('returns with status code 401', async () => {
      const newBlog = {
        title: 'teste add blog',
        url: 'teste.com',
        likes: 7
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

  })

})

afterAll(async () => {
  await mongoose.connection.close()
})