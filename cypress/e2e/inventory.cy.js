describe('MyStuff - Testes do Inventário', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.window().then((win) => win.localStorage.clear())
  })

  it('mostrar título e formulário', () => {
    cy.contains('h1', 'MyStuff').should('be.visible')
    cy.get('#formArtigo').should('be.visible')
  })

  it('guardar artigo novo', () => {
    cy.get('#itemName').type('Laptop')
    cy.get('#itemCategory').type('Electrónico')
    cy.get('#itemValue').type('800')
    cy.get('#itemLocation').type('Quarto')
    cy.get('#btnSave').click()
    
    cy.contains('Laptop').should('be.visible')
  })

  it('buscar por nome', () => {
    cy.get('#itemName').type('Telemóvel')
    cy.get('#itemLocation').type('Mesa')
    cy.get('#btnSave').click()

    cy.get('#itemName').type('Livro')
    cy.get('#itemLocation').type('Estante')
    cy.get('#btnSave').click()

    cy.get('#searchInput').type('Telemóvel')
    cy.contains('Telemóvel').should('be.visible')
  })

  it('editar e apagar artigo', () => {
    cy.get('#itemName').type('Câmera')
    cy.get('#itemLocation').type('Armário')
    cy.get('#btnSave').click()

    cy.get('button').contains('Editar').click()
    cy.get('#itemName').clear().type('Câmera Digital')
    cy.get('#btnSave').click()
    cy.contains('Câmera Digital').should('be.visible')

    cy.get('button').contains('Apagar').click()
    cy.contains('Câmera Digital').should('not.exist')
  })
})