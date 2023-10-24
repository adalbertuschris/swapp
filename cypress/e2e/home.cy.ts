describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('display homepage', () => {
    cy.contains('Welcome');
  });

  it('navigate to homepage when user click title on toolbar', () => {
    cy.get('[data-test=toolbar]').get('[data-test=title]').click();
    cy.url().should('eq', 'http://localhost:4200/');
  });

  it('navigate to people game', () => {
    cy.get('[data-test=resource-link]').first().as('peopleLink');
    cy.get('@peopleLink').contains('People');
    cy.get('@peopleLink').click();
    cy.url().should('include', '/cards/people');
    cy.contains('People');
  });

  it('navigate to starship game', () => {
    cy.get('[data-test=resource-link]').last().as('starshipLink');
    cy.get('@starshipLink').contains('Starships');
    cy.get('@starshipLink').click();
    cy.url().should('include', '/cards/starships');
    cy.contains('Starships');
  });
});
