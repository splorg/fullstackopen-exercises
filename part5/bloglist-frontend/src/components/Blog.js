import { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleDelete, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleDetailVisibility = () => {
    console.log(blog)
    setShowDetails(!showDetails)
  }

  const handleLike = (id, blog) => {
    const updatedBlog = blog
    updatedBlog.likes += 1
    handleUpdate(id, updatedBlog)
  }

  const handleRemove = (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(id)
    }
  }

  const showBlogDetails = () => {
    return (
      <div>
        <p>{blog.url}</p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <p>likes: {blog.likes}</p>
          <button onClick={() => handleLike(blog.id, blog)}>like</button>
        </div>
        <p>{blog.user.name}</p>
        {user === blog.user.username
          && <button onClick={() => handleRemove(blog.id)}>remove</button>
        }
      </div>
    )
  }

  const blogStyle = {
    paddingBlock: 10,
    paddingInline: 5,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <p>{blog.title}</p>
        <span>-</span>
        <p>{blog.author}</p>
        <button onClick={handleDetailVisibility}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {showDetails && showBlogDetails()}
    </div>
  )
}

export default Blog