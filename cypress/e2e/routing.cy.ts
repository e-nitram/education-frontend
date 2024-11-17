describe('Sitemap', () => {
  it('Homepage loads', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/');
  });

  it('Schools loads', () => {
    cy.visit('/schools');
    cy.location('pathname').should('eq', '/schools');
  });

  it('Areas-of-Interest index loads', () => {
    // cy.visit('/area-of-interest');
    // cy.location('pathname').should('eq', '/area-of-interest');
  });

  it('Subjects index loads', () => {
    cy.visit('/subjects');
    cy.location('pathname').should('eq', '/subjects');
  });

  it('Terms and conditions loads', () => {
    cy.visit('/terms-and-conditions');
    cy.location('pathname').should('eq', '/terms-and-conditions');
  });

  it('Get-started loads', () => {
    cy.visit('/get-started');
    cy.location('pathname').should('eq', '/get-started');
  });

  it('DNC loads', () => {
    cy.visit('/do-not-call');
    cy.location('pathname').should('eq', '/do-not-call');
  });

  it('Privacy Policy loads', () => {
    cy.visit('/privacy-policy');
    cy.location('pathname').should('eq', '/privacy-policy');
  });

  it('Clicks loads', () => {
    cy.visit('/clicks');
    cy.location('pathname').should('eq', '/clicks');
  });

  it('Landing-page/1 loads', () => {
    cy.visit('/landing-page/1');
    cy.location('pathname').should('eq', '/landing-page/1');
  });
});
