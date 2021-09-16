// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Caliuser',
      username: 'caliuser',
      password: 'california'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('display login form', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('User login', function() {
    it('login successfully with valid credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('caliuser')
      cy.get('#password').type('california')
      cy.get('#login-button').click()
      cy.contains('Caliuser logged in')
    })

    it('login fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('caliuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('#error').should('contain', 'Wrong credentials')
      cy.get('html').should('not.contain', 'Caliuser logged in')
    })
  })

  describe('user logged in can do things', function() {
    beforeEach(function() {
      cy.login({
        username: 'caliuser',
        password: 'california'
      })
    })

    it('create new blog', function() {
      cy.contains('Add New Blog').click()
      cy.get('#title').type('New Sample Blog')
      cy.get('#author').type('Sample Author')
      cy.get('#url').type('http://sampleblog.com/new')
      cy.contains('Add Blog').click()
      cy.contains('New Sample Blog - Sample Author')
    })

    it('like a blog', function() {
      cy.contains('Add New Blog').click()
      cy.get('#title').type('New Sample Blog')
      cy.get('#author').type('Sample Author')
      cy.get('#url').type('http://sampleblog.com/new')
      cy.contains('Add Blog').click()
      cy.contains('New Sample Blog - Sample Author').click()
      cy.contains('View').click()
      cy.contains('0')
      cy.get('#like-button').click()
      cy.contains('1')
    })

    it('user can delete a blog they created', function() {
      cy.contains('Add New Blog').click()
      cy.get('#title').type('New Sample Blog')
      cy.get('#author').type('Sample Author')
      cy.get('#url').type('http://sampleblog.com/new')
      cy.contains('Add Blog').click()
      cy.contains('New Sample Blog - Sample Author').click()
      cy.contains('View').click()
      cy.get('#remove-button').click()

      cy.get('html').should('not.contain', 'New Sample Blog - Sample Author')
    })
  })

  it('order blogs', function() {
    beforeEach(function() {
      cy.login({
        username: 'caliuser',
        password: 'california'
      })

      cy.createBlog({ title: 'Sample 1', author: 'Sample Author', url: 'http://sample.com/1', likes: 5 })
      cy.createBlog({ title: 'Sample 2', author: 'Sample Author', url: 'http://sample.com/2', likes: 4 })
      cy.createBlog({ title: 'Sample 3', author: 'Sample Author', url: 'http://sample.com/3', likes: 3 })
      cy.createBlog({ title: 'Sample 4', author: 'Sample Author', url: 'http://sample.com/4', likes: 2 })
      cy.createBlog({ title: 'Sample 5', author: 'Sample Author', url: 'http://sample.com/5', likes: 10 })

      cy.contains('Sample 1').parent().parent().as('blog1')
      cy.contains('Sample 2').parent().parent().as('blog2')
      cy.contains('Sample 3').parent().parent().as('blog3')
      cy.contains('Sample 4').parent().parent().as('blog4')
      cy.contains('Sample 5').parent().parent().as('blog5')
    })

    it('by likes', function() {
      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('5')
        cy.wrap(blogs[1]).contains('1')
        cy.wrap(blogs[2]).contains('2')
        cy.wrap(blogs[3]).contains('3')
        cy.wrap(blogs[4]).contains('4')

      })
    })
  })
})


  

