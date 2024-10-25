import {mount} from 'cypress/react'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      fillAuthForm(email: string, password: string)
      login(): Chainable<void>
      signup(): Chainable<void>
    }
  }
}
