const listHelper = require('../utils/list_helper')

const emptyList = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('dummy()', () => {
  test('returns one', () => {
    const result = listHelper.dummy(emptyList)
    expect(result).toBe(1)
  })
})

describe('totalLikes()', () => {

  describe('when the blog list is empty', () => {
    test('returns zero', () => {
      const result = listHelper.totalLikes(emptyList)
      expect(result).toBe(0)
    })
  })

  describe('when the blog list has a single blog', () => {
    test('returns that blogs likes', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

  describe('when the blog list has multiple blogs', () => {
    test('returns the total likes of the blogs in the list', () => {
      const result = listHelper.totalLikes(listWithManyBlogs)
      expect(result).toBe(36)
    })
  })
})

describe('favoriteBlog()', () => {

  describe('when the blog list is empty', () => {
    test('returns an empty object', () => {
      expect(listHelper.favoriteBlog(emptyList)).toEqual({})
    })
  })

  describe('when the blog list has a single blog', () => {
    test('returns that blog', () => {
      expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
    })
  })

  describe('when the blog list has multiple blogs', () => {
    test('returns the blog with the most likes', () => {
      expect(listHelper.favoriteBlog(listWithManyBlogs)).toEqual({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      })
    })
  })

})

describe('mostBlogs()', () => {

  describe('when the blog list is empty', () => {
    test('returns an empty object', () => {
      expect(listHelper.mostBlogs(emptyList)).toEqual({})
    })
  })

  describe('when the blog list has a single blog', () => {
    test('returns that blogs author', () => {
      expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
        author: 'Edsger W. Dijkstra',
        blogs: 1
      })
    })
  })

  describe('when the blog list has multiple blogs', () => {
    test('returns the blogger with the most blogs', () => {
      expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual({
        author: 'Robert C. Martin',
        blogs: 3
      })
    })
  })

})

describe('mostLikes()', () => {

  describe('when the blog list is empty', () => {
    test('returns an empty object', () => {
      expect(listHelper.mostLikes(emptyList)).toEqual({})
    })
  })

  describe('when the blog list has a single blog', () => {
    test('returns that blogs author', () => {
      expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
    })
  })

  describe('when the blog list has multiple blogs', () => {
    test('returns the blogger with the most likes', () => {
      expect(listHelper.mostLikes(listWithManyBlogs)).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 17
      })
    })
  })

})