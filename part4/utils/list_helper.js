const dummy = blogs => {
  blogs.forEach(() => console.log('.')) // pls stop annoying me about unused params ESlint

  return 1
}

const totalLikes = blogs => {
  if (!blogs.length) return 0

  if (blogs.length === 1) return blogs[0].likes

  const total = blogs.reduce((acc, curr) => {
    acc += curr.likes
    return acc
  }, 0)

  return total
}

const favoriteBlog = blogs => {
  if (!blogs.length) return {}

  if (blogs.length === 1) return {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes
  }

  return blogs.reduce((acc, curr) => {
    if (curr.likes > acc.likes) {
      return {
        title: curr.title,
        author: curr.author,
        likes: curr.likes
      }
    } else {
      return {
        title: acc.title,
        author: acc.author,
        likes: acc.likes
      }
    }
  })
}

const mostBlogs = blogs => {
  if (!blogs.length) return {}

  const authors = new Set(blogs.map(b => b.author))

  const authorsMap = new Map()

  authors.forEach(author => {
    const totalBlogs = blogs.reduce((acc, curr) => {
      if (curr.author === author) {
        acc += 1
      }

      return acc
    }, 0)

    authorsMap.set(author, totalBlogs)
  })

  const topBlogger = [...authorsMap.entries()].reduce((acc, curr) => curr[1] > acc[1] ? curr : acc)

  return {
    author: topBlogger[0],
    blogs: topBlogger[1]
  }
}

const mostLikes = blogs => {
  if (!blogs.length) return {}

  const authors = new Set(blogs.map(b => b.author))

  const authorsMap = new Map()

  authors.forEach(author => {
    const likes = blogs.reduce((acc, curr) => {
      if (curr.author === author) {
        acc += curr.likes
      }

      return acc
    }, 0)

    authorsMap.set(author, likes)
  })

  const mostLikedAuthor = [...authorsMap.entries()].reduce((acc, curr) => curr[1] > acc[1] ? curr : acc)

  return {
    author: mostLikedAuthor[0],
    likes: mostLikedAuthor[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}