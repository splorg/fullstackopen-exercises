import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  describe('when rendering a BlogForm component', () => {
    it('should render correctly', () => {
      render(<BlogForm />)

      const headingText = screen.getByText('create new')

      expect(headingText).toBeDefined()
    })

    describe('when the create button is clicked', () => {
      it('should call the submit event handler', async () => {
        const mockSubmitHandler = jest.fn()
        const user = userEvent.setup()

        render(<BlogForm addBlog={mockSubmitHandler} />)

        const title = screen.getByPlaceholderText('blog title')
        const author = screen.getByPlaceholderText('blog author')
        const url = screen.getByPlaceholderText('blog URL')
        const createButton = screen.getByText('create')

        await user.type(title, 'testing blogform')
        await user.type(author, 'userEvent')
        await user.type(url, 'www.tests.com')
        await user.click(createButton)

        expect(mockSubmitHandler.mock.calls).toHaveLength(1)
      })

      it('should call the submit event handler with the correct details', async () => {
        const mockSubmitHandler = jest.fn()
        const user = userEvent.setup()

        render(<BlogForm addBlog={mockSubmitHandler} />)

        const title = screen.getByPlaceholderText('blog title')
        const author = screen.getByPlaceholderText('blog author')
        const url = screen.getByPlaceholderText('blog URL')
        const createButton = screen.getByText('create')

        await user.type(title, 'testing blogform')
        await user.type(author, 'userEvent')
        await user.type(url, 'www.tests.com')
        await user.click(createButton)

        expect(mockSubmitHandler.mock.calls).toHaveLength(1)
        expect(mockSubmitHandler.mock.calls[0][0].title).toBe('testing blogform')
        expect(mockSubmitHandler.mock.calls[0][0].author).toBe('userEvent')
        expect(mockSubmitHandler.mock.calls[0][0].url).toBe('www.tests.com')
      })
    })
  })
})