import {mount} from 'cypress/react'
import {CreateProduct} from '@/services/types/domain/product-types'
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
      logout(): Chainable<void>
      fillProductForm(
        product: CreateProduct,
        clear?: boolean = false
      ): Chainable<void>
      createProduct(product: CreateProduct): Chainable<void>
      updateProduct(product: CreateProduct): Chainable<void>
      deleteProduct(producName: string): Chainable<void>
      containProductTitle(
        productName: string,
        isContain?: boolean = false
      ): Chainable<void>
      containToastMessage(message: string): Chainable<void>
      visitSignIn(): Chainable<void>
      visitShopAdmin(): Chainable<void>
    }
  }
}
