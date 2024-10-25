/// <reference types="cypress" />
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
//
//
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
