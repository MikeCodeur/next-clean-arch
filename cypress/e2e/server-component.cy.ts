import {CreateProduct} from '@/services/types/domain/product-types'

describe('Server Component', () => {
  it('Sign-in: without session', () => {
    cy.visitSignIn()
  })

  it('Admin shop contains 20 products', () => {
    cy.visitShopAdmin()
    cy.get('tbody').find('tr').should('have.length', 20)
  })
})

describe('CRUD operations for Product', () => {
  const product = {
    title: 'Test Title Product',
    price: 10,
    description: 'Test Description',
    category: 'Electronic',
    quantity: 12,
  } satisfies CreateProduct

  const updateProduct = {
    title: 'Updated Product Title',
    description: 'Updated product description',
    category: 'Books',
    price: 120,
    quantity: 15,
  } satisfies CreateProduct

  it("Read product's list", () => {
    cy.visitShopAdmin()
    cy.get('tbody')
      .find('tr')
      .as('rows')
      .should('contain', 'Wilson Pro Staff Tennis Racket')
  })
  it('Create product', () => {
    cy.visitShopAdmin()
    cy.containProductTitle(product.title)
    cy.createProduct(product)
    cy.containToastMessage('Product saved')
    cy.containProductTitle(product.title, true)
  })

  it('Update product', () => {
    cy.visitShopAdmin()
    cy.containProductTitle(product.title, true)
    // cherche le produit déja créer
    cy.get('tbody').find('tr').as('product').contains(product.title)
    cy.updateProduct(updateProduct)
    cy.containToastMessage('Product saved')
    cy.containProductTitle(product.title)
    cy.containProductTitle(updateProduct.title, true)
  })

  it('Delete product', () => {
    cy.visitShopAdmin()
    cy.deleteProduct(updateProduct.title)
    cy.containToastMessage('Product deleted')
    cy.containProductTitle(updateProduct.title)
  })
})
