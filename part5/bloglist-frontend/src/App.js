import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({ message: 'logged in successful', type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setUsername('')
      setPassword('')
      setNotification({ message: 'wrong credentials!', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleCreateBlog = async blogObject => {
    try {
      const blog = await blogService.create(blogObject)
      console.log(blog)
      setBlogs(blogs.concat(blog))
      setNotification({ message: `a new blog ${blog.title} by ${blog.author} added`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({ message: exception.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleUpdateBlog = async (id, blog) => {
    await blogService.update(id, blog)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const handleDeleteBlog = async id => {
    try {
      await blogService.remove(id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (err) {
      setNotification({ message: err.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  if (user === null) {
    return (
      <div>
        <h1>blogs</h1>
        <LoginForm
          notification={notification}
          username={username}
          password={password}
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      {notification && <Notification notification={notification} />}
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable label='create new blog'>
        <BlogForm addBlog={handleCreateBlog} />
      </Togglable>
      {blogs.sort((a,b) => a.likes > b.likes ? -1 : 1) && blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={handleUpdateBlog}
          handleDelete={handleDeleteBlog}
          user={user.username}
        />
      ))}
    </div>
  )
}

export default App