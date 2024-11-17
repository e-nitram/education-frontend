/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
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
import 'cypress-localstorage-commands';

Cypress.Commands.add('selectProgramWithOptions', () => {
  cy.get('[data-testid="result-card"]')
    .first()
    .then((card) => {
      // Check if the card contains a program dropdown
      cy.wrap(card).find('[id="custom-react-select"]').click();
      // Select option 1 from the program dropdown
      cy.get('[id*="option-1"]').eq(0).click();

      // Find all the custom-react-select elements inside the card
      cy.wrap(card)
        .find('[id="custom-react-select"]')
        .then(($questions) => {
          // Loop through each select element except the first one
          for (let i = 1; i < $questions.length; i++) {
            const $question = $questions.eq(i);

            // Select option 1 for each question
            cy.wrap($question).click({ multiple: true });
            cy.wrap($question).get('[id*="option-1"]').eq(0).click();
          }
        });
    });
});
