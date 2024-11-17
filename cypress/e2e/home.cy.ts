// import { formValues } from '../support/constants';

// const { mainSteps } = formValues;

// describe('Home page', () => {
//   Cypress.on('uncaught:exception', (_err, _runnable) => {
//     // returning false here prevents Cypress from
//     // failing the test
//     return true;
//   });

//   it('Visits the landing page and redirects to another route', () => {
//     cy.visit('/');
//     cy.location('pathname').should('eq', '/'); // Verifies the initial route

//     cy.contains('[data-testid="checkbox-text"]', mainSteps.one.value).click();
//     cy.get('[data-testid="get-started-btn"]')
//       .should('contain', 'Get Started')
//       .parents('a')
//       .invoke('removeAttr', 'target')
//       .click();

//     cy.location('pathname').should('eq', '/get-started');
//     cy.get('[data-testid="next-step-btn"]')
//       .should('contain', 'Next step')
//       .click();
//     cy.contains(
//       '[data-testid="checkbox-text"]',
//       mainSteps.three.value1,
//     ).click();
//     cy.contains(
//       '[data-testid="checkbox-text"]',
//       mainSteps.three.value2,
//     ).click();
//     cy.get('[data-testid="step3-next-btn"]')
//       .should('contain', 'Next step')
//       .click();
//     cy.contains('Highest level of education').click();

//     cy.get('[id*="react-select-2-option-"]').each(($option) => {
//       // Get the text of the current option.
//       const optionText = $option.text();

//       // Perform the selection based on the desired condition
//       if (optionText === mainSteps.four.current_education_level.value) {
//         // Click on the desired option.
//         cy.wrap($option).click();
//       }
//     });

//     cy.contains(mainSteps.four.hsyear.question).click();
//     cy.contains(mainSteps.four.hsyear.value).click();

//     cy.contains(mainSteps.four.currently_enrolled_in_college.question).click();
//     cy.contains(mainSteps.four.currently_enrolled_in_college.value).click();
//     cy.get('[data-testid="step4-next-btn"]')
//       .should('contain', 'Next step')
//       .click();

//     cy.wait(500);
//     cy.get('[data-testid="step5"] input[type="email"]').type(
//       mainSteps.five.email.value,
//     );
//     cy.get('[data-testid="step5"] input[type="tel"]').type(
//       mainSteps.five.phone.value,
//     );
//     cy.get('[data-testid="step5"] input[id="places-autocomplete-input"]')
//       .should('be.visible')
//       .type(mainSteps.five.address.value);

//     cy.wait(3000);
//     cy.get('div[id*=listbox]')
//       .should('be.visible')
//       .contains(mainSteps.five.address.autoComplete)
//       .click();

//     cy.contains(mainSteps.five.computer_internet_access.question).click();
//     cy.contains(mainSteps.five.computer_internet_access.value).click();

//     cy.get('[data-testid="step5-next-btn"]').click();

//     // --------------------------------------------------------Steps 6:
//     cy.get('[data-testid="step-6"]').should('exist');

//     cy.get('[data-testid="step-6"] [data-testid="first_name"]').type(
//       mainSteps.six.first_name.value,
//     );
//     cy.get('[data-testid="step-6"] [data-testid="last_name"]').type(
//       mainSteps.six.last_name.value,
//     );

//     cy.contains(mainSteps.six.gender.label).click();
//     cy.contains(mainSteps.six.gender.value).click();

//     cy.contains(mainSteps.six.birthdate.label).click();
//     cy.contains(mainSteps.six.birthdate.value).click();

//     cy.contains(mainSteps.six.us_citizen.label).click();
//     cy.contains(mainSteps.six.us_citizen.value).click();

//     cy.contains(mainSteps.six.miliatry_association.label).click();
//     cy.contains(mainSteps.six.miliatry_association.value).click();

//     cy.get('[data-testid="tcpa_disclosure_checkbox"]').click();
//     cy.get('button').contains('Get Results').click();

//     // Check if the current pathname is '/results'
//     cy.location('pathname').should('eq', '/results');

//     // Wait for 3000 milliseconds (3 seconds)
//     // cy.wait(3000)

//     // Get all the result cards
//     cy.selectProgramWithOptions();

//     cy.get('[data-testid="tcpa_disclosure_checkbox"]').click();
//     cy.get('button').contains('Submit').click();

//     // cy.wait(10000)
//     // cy.get('button[aria-label="Close modal"]').click()

//     // cy.wait(1000)
//     // cy.location('pathname').should('eq', '/interested-programs')
//   });
// });
