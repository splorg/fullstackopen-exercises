Cypress.Commands.add('clearDatabase', () => {
  cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

  const user = {
    name: 'Cypress User',
    username: 'cypress',
    password: 'pass123'
  }

  cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

  const secondUser = {
    name: 'Fake Cypress',
    username: 'fakeman',
    password: 'pass123'
  }

  cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser)

  cy.visit('')
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password
  }).then(response => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })

  cy.visit('')
})