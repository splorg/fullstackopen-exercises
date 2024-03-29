import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = e => {
    console.log(e)
    e.preventDefault()

    addBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='blog title'
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='blog author'
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='blog URL'
          />
        </div>
        <button id='create-blog-btn' type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
