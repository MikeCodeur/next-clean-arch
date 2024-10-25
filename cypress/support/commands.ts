/// <reference types="cypress" />
import {CreateProduct} from '@/services/types/domain/product-types'
import '@testing-library/cypress/add-commands' // ajout des extensions de testing library
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// variable env pour les tests de cypress
const {email, password} = Cypress.env()

// -- This is a parent command --

// ROUTES
Cypress.Commands.add('visitSignIn', () => {
  cy.visit('/')
  cy.findAllByRole('link').each((link) => {
    if (link.find('h2:contains("Se Connecter")').length > 0) {
      cy.wrap(link).click()
    }
  })
  cy.findByText('Se connecter').should('be.visible')
})

Cypress.Commands.add('visitShopAdmin', () => {
  cy.visitSignIn()
  cy.login()
  cy.url().should('contain', '/sign-in')
  cy.location('pathname').should('eq', '/logout')
  cy.findByRole('heading', {level: 1, name: 'Déconnexion'}).should('be.visible')
  cy.findAllByRole('link').each((link) => {
    if (link.find('span:contains("Dashboard")').length > 0) {
      cy.wrap(link).click()
    }
  })
  cy.url().should('contain', '/dashboard')
  cy.findByText('Dashboard').should('be.visible')
  cy.findAllByRole('link').each((link) => {
    if (link.find('span:contains("Shop Admin")').length > 0) {
      cy.wrap(link).click()
    }
  })
  cy.findByRole('heading', {
    level: 1,
    name: 'Administration de la boutique',
  }).should('be.visible')
})
// AUTHENTIFICATION
Cypress.Commands.add('fillAuthForm', (email: string, password: string) => {
  cy.findByPlaceholderText('Email').type(email)
  cy.findByPlaceholderText('Password').type(password)
})

Cypress.Commands.add('login', () => {
  cy.fillAuthForm(email, password)
  cy.findByRole('button', {name: 'Login'}).click()
})

Cypress.Commands.add('signup', () => {
  const emailTest = `test-${Math.random()}@example.com`
  const passwordTest = 'test-password'
  cy.fillAuthForm(emailTest, passwordTest)
  cy.findByPlaceholderText('Confirm Password').type(passwordTest)
  cy.findByRole('button', {name: 'Register'}).click()
})

// PRODUCTS
Cypress.Commands.add(
  'fillProductForm',
  (product: CreateProduct, clear: boolean = false) => {
    if (clear) {
      cy.findByLabelText('Product price').clear()
      cy.findByLabelText('Product title').clear()
      cy.findByLabelText('Product description').clear()
      cy.findByLabelText('Product quantity').clear()
    }
    cy.findByLabelText('Product title').type(product.title ?? '')
    cy.findByLabelText('Product price').type(product.price?.toString() ?? '')
    cy.findByLabelText('Product description').type(product.description ?? '')
    cy.findByLabelText('Catégorie').as('category').click()
    cy.get('select')
      .get('option')
      .get(`span:contains("${product.category}")`)
      .click()
    cy.findByLabelText('Product quantity').type(
      product.quantity?.toString() ?? ''
    )
  }
)
// CRUD
Cypress.Commands.add('createProduct', (product: CreateProduct) => {
  cy.fillProductForm(product)
  cy.findByRole('button', {name: 'Save'}).click()
})
Cypress.Commands.add('updateProduct', (product: CreateProduct) => {
  cy.get('@product').findAllByRole('button', {name: 'Edit'}).click()
  cy.fillProductForm(product, true)
  cy.findByRole('button', {name: 'Save'}).click()
})
Cypress.Commands.add('deleteProduct', (productName: string) => {
  cy.containProductTitle(productName, true)
  cy.get('tbody').find('tr').as('product').contains(productName)
  cy.get('@product').findAllByRole('button', {name: 'Delete'}).click()
})

// PRODUCTS HELPERS
Cypress.Commands.add(
  'containProductTitle',
  (productName: string, isContain: boolean = false) => {
    cy.get('tbody').find('tr').as('rows')
    cy.get('@rows').should(isContain ? 'contain' : 'not.contain', productName)
  }
)
Cypress.Commands.add('containToastMessage', (message: string) => {
  cy.findByRole('status').should('contain', message)
})

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
