describe('Home page', () => {
  it("Le titre de la page d'accueil est correct", () => {
    cy.visit('/')
    cy.get('p').contains('Next Module')
  })
  it("L'auteur de la page d'accueil est correct", () => {
    cy.visit('/')
    cy.get('code').first().contains('Mike codeur')
  })

  it("L'accueil possèdes 8 cartes avec des liens", () => {
    cy.visit('/')
    cy.get('div').eq(3).find('a').should('have.length', 8)
  })
})
