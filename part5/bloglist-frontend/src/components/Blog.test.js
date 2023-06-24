import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  describe('when rendering a Blog component', () => {
    it('should render the blog title and author', () => {
      const blog = {
        id: 'abc123',
        title: 'Test blog',
        author: 'Testman T. Test',
        likes: 0,
        url: 'tests.com',
        user: {
          name: 'test user',
          username: 'testusername1'
        }
      }

      render(
        <Blog
          blog={blog}
          user={blog.user}
        />
      )

      const blogTitleElement = screen.getByText(blog.title)
      const blogAuthorElement = screen.getByText(blog.author)

      expect(blogTitleElement).toBeDefined()
      expect(blogAuthorElement).toBeDefined()
    })

    it('should not render the blog URL and likes by default', () => {
      const blog = {
        id: 'abc123',
        title: 'Test blog',
        author: 'Testman T. Test',
        likes: 0,
        url: 'tests.com',
        user: {
          name: 'test user',
          username: 'testusername1'
        }
      }

      render(
        <Blog
          blog={blog}
          user={blog.user}
        />
      )

      const blogUrlElement = screen.queryByText(blog.url)
      const blogLikesElement = screen.queryByText(blog.likes)

      expect(blogUrlElement).toBeNull()
      expect(blogLikesElement).toBeNull()
    })

    it('should render blog URL and likes if the view button is clicked', async () => {
      const blog = {
        id: 'abc123',
        title: 'Test blog',
        author: 'Testman T. Test',
        likes: 0,
        url: 'tests.com',
        user: {
          name: 'test user',
          username: 'testusername1'
        }
      }

      render(
        <Blog
          blog={blog}
          user={blog.user}
        />
      )

      const user = userEvent.setup()
      const viewButton = screen.getByText('view')

      await user.click(viewButton)

      const blogUrlElement = screen.queryByText(blog.url)
      const blogLikesElement = screen.queryByText(blog.likes)

      expect(blogUrlElement).toBeDefined()
      expect(blogLikesElement).toBeDefined()
    })

    describe('if the like button on a Blog is clicked', () => {
      it('should call the event handler the correct amount of times', async () => {
        const blog = {
          id: 'abc123',
          title: 'Test blog',
          author: 'Testman T. Test',
          likes: 0,
          url: 'tests.com',
          user: {
            name: 'test user',
            username: 'testusername1'
          }
        }

        const mockUpdateHandler = jest.fn()

        render(
          <Blog
            blog={blog}
            user={blog.user}
            handleUpdate={mockUpdateHandler}
          />
        )

        const user = userEvent.setup()
        const viewButton = screen.getByText('view')

        await user.click(viewButton)

        const likeButton = screen.getByText('like')

        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockUpdateHandler.mock.calls).toHaveLength(2)
      })
    })
  })
})