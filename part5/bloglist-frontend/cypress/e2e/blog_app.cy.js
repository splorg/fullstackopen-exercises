describe('Blog App', function () {
  beforeEach(function () {
    cy.clearDatabase()
  })

  describe('when opening the web app', function () {
    it('renders the login page', function () {
      cy.contains('login to application')
    })
  })

  describe('when logging in', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cypress')
      cy.get('#password').type('pass123')
      cy.get('#login-btn').click()

      cy.contains('Cypress User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('nonexistent-user')
      cy.get('#password').type('wrongpass123')
      cy.get('#login-btn').click()

      cy.contains('wrong credentials!')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypress', password: 'pass123' })
    })

    it('should allow a new blog to be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('blog created by cypress!')
      cy.get('#author').type('cypress test')
      cy.get('#url').type('cypress.com')
      cy.get('#create-blog-btn').click()

      cy.contains('blog created by cypress!')
    })

    describe('when a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypress Blog #1',
          author: 'Cypress Man',
          url: 'cypress.com'
        })
      })

      it('should allow to view details', function () {
        cy.contains('view').click()
        cy.contains('cypress.com')
      })

      it('should allow to like the blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()
      })

      it('should allow blog author to delete blog', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.on('window:confirm', () => true)
      })

      it('should not allow user to delete someone elses blog', function () {
        // logging out of cypress user
        cy.contains('logout').click()

        // logging as wrong user
        cy.login({ username: 'fakeman', password: 'pass123' })

        cy.contains('view').click()
        cy.get('remove').should('not.exist')
      })
    })

    describe('when multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Least Liked Blog',
          author: 'Cypress Man',
          url: 'cypress.com',
          likes: 2
        })

        cy.createBlog({
          title: 'Third Most Liked Blog',
          author: 'Cypress Man',
          url: 'cypress.com',
          likes: 4
        })

        cy.createBlog({
          title: 'Most Liked Blog',
          author: 'Cypress Man',
          url: 'cypress.com',
          likes: 10
        })

        cy.createBlog({
          title: 'Second Most Liked Blog',
          author: 'Cypress Man',
          url: 'cypress.com',
          likes: 7
        })
      })

      it('should order the blogs by their amount of likes', function () {
        cy.get('.blog').eq(0).should('contain', 'Most Liked Blog')
        cy.get('.blog').eq(1).should('contain', 'Second Most Liked Blog')
        cy.get('.blog').eq(2).should('contain', 'Third Most Liked Blog')
        cy.get('.blog').eq(3).should('contain', 'Least Liked Blog')
      })
    })
  })
})