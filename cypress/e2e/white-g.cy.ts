import { formValues } from '../support/constants';

const { whiteGSteps } = formValues;

describe('WhiteG Form', () => {
  // beforeEach(() => {
  //   cy.location('pathname').should('eq', '/') // Verifies the initial route
  // })

  it('Visits the landing page and redirects to another route', async () => {
    cy.visit('/landing-page');
    cy.location('pathname').should('eq', '/landing-page'); // Verifies the final route

    // --------------------------------------------------------Steps 1:
    cy.contains('button', whiteGSteps.one.value)
      .parents('a')
      .invoke('removeAttr', 'target')
      .should('be.visible')
      .click();

    // --------------------------------------------------------Steps 2:
    cy.get('[data-testid="whiteG-step-2"]').should('exist');

    // In school > Radio button
    cy.get('.chakra-radio-group')
      .eq(0)
      .should('exist')
      .find('p')
      .should('have.text', whiteGSteps.two.inSchool.question)
      .siblings('.chakra-stack')
      .find('label.chakra-radio')
      .contains(whiteGSteps.two.inSchool.value)
      .click();

    // cy.get('.chakra-radio-group').eq(1)
    //   .should('exist')
    //   .find('p')
    //   .should('have.text', 'Are you looking for a new school to attend?')
    //   .siblings('.chakra-stack')
    //   .find('label.chakra-radio')
    //   .contains('No')
    //   .click();

    // Age > Select
    cy.get('[data-testid="age"]')
      .find('p')
      .should('have.text', whiteGSteps.two.age.question)
      .siblings('.chakra-select__wrapper')
      .find('select')
      .select(whiteGSteps.two.age.value)
      .should('have.value', whiteGSteps.two.age.value);

    // Hight school graduation year > Select
    cy.get('[data-testid="hsyear"]')
      .find('p')
      .should('have.text', whiteGSteps.two.hsyear.question)
      .siblings('.chakra-select__wrapper')
      .find('select')
      .should('exist')
      .select(whiteGSteps.two.hsyear.value)
      .should('have.value', whiteGSteps.two.hsyear.value);
    // .select(`selected option ${whiteGSteps.two.hsyear.value}`);

    // Preferred_enrollment > Select
    // cy.get('[data-testid="preferred_enrollment"] p')
    //   .should('have.text', whiteGSteps.two.preferred_enrollment.question)
    //   .siblings('.chakra-select__wrapper')
    //   .find('[data-testid="preferred_enrollment-select"]')
    //   .select(whiteGSteps.two.preferred_enrollment.label)
    //   .should('have.value', whiteGSteps.two.preferred_enrollment.value);

    // Next Step > button
    cy.get('[data-testid="next-step"]').should('exist').click();

    // --------------------------------------------------------Steps 3:
    cy.get('[data-testid="whiteG-step-3"]').should('exist');

    // Teaching Certificate > Radio button
    cy.get('[data-testid="teaching_certificate"] p')
      .should('have.text', whiteGSteps.three.teaching_certificate.question)
      .next('[data-testid="options"]')
      .contains(whiteGSteps.three.teaching_certificate.label)
      .should('be.visible') // Ensure the element is visible before clicking
      .click(); // Try forcing the click event if necessary

    // Learning Preference > Radio button
    cy.get('[data-testid="learning_preference"] p')
      .should('have.text', whiteGSteps.three.learning_preference.question)
      .next('[data-testid="radio-labels"]')
      .contains(whiteGSteps.three.learning_preference.label)
      .should('be.visible')
      .click();

    // Computer Internet Access > Radio button
    cy.get('[data-testid="computer_internet_access"] p')
      .should('have.text', whiteGSteps.three.computer_internet_access.question)
      .next('[data-testid="radio-labels"]')
      .contains(whiteGSteps.three.computer_internet_access.label)
      .should('be.visible')
      .click();

    // US Citizen > Radio button
    cy.get('[data-testid="us_citizen"] p')
      .should('have.text', whiteGSteps.three.us_citizen.question)
      .next('[data-testid="radio-labels"]')
      .contains(whiteGSteps.three.us_citizen.label)
      .should('be.visible')
      .click();

    // Military Status > Radio button
    cy.get('[data-testid="military_status"] p')
      .should('have.text', whiteGSteps.three.military_status.question)
      .next('[data-testid="radio-labels"]')
      .contains(whiteGSteps.three.military_status.label)
      .should('be.visible')
      .click();

    // Email > Input field
    cy.get('[data-testid="email"] [data-testid="question"]')
      .should('have.text', whiteGSteps.three.email.question)
      .siblings('input[type="email"]')
      .should('be.visible')
      .type(whiteGSteps.three.email.value);

    // Next Step > Button
    cy.get('button[data-testid="next"]').should('be.visible').click();

    // --------------------------------------------------------Steps 4:
    cy.get('[data-testid="whiteG-step-4"]').should('exist');

    // Area of interest  > Text field
    cy.get('[data-testid="whiteG-step-4"]').contains(
      '[data-testid="question"]',
      whiteGSteps.four.subjectInterests.question,
    );

    // Area of interest  > Checkbox field
    cy.contains(
      '[data-testid="question"]',
      whiteGSteps.four.subjectInterests.question,
    ).then(() => {
      if (whiteGSteps.four.subjectInterests.selectAll) {
        // Select All interests
        cy.get('[data-testid="selectAll"]').should('be.visible').click();
      } else {
        whiteGSteps.four.subjectInterests.values.forEach((label) => {
          cy.contains('label', label) // Find the label element containing the specified label text.
            .click(); // Assert that the checkbox is checked.
        });
      }
    });

    // Next Step > Button
    cy.get('[data-testid="next"]').should('be.visible').click();

    // --------------------------------------------------------Steps 5:
    cy.get('[data-testid="whiteG-step-5"]').should('exist');

    // First Name > Input Field
    cy.get('[data-testid="whiteG-step-5"] input[data-testid="first_name"]')
      .should('be.visible')
      .type(whiteGSteps.five.first_name.value);

    // Last Name > Input Field
    cy.get('[data-testid="whiteG-step-5"] input[data-testid="last_name"]')
      .should('be.visible')
      .type(whiteGSteps.five.last_name.value);

    // Address > Places Autocomplete Field
    cy.get(
      '[data-testid="whiteG-step-5"] input[id="places-autocomplete-input"]',
    )
      .should('be.visible')
      .type(whiteGSteps.five.address.value);

    cy.wait(3000);
    cy.get('[data-testid="whiteG-step-5"] div[id*=listbox]')
      .should('be.visible')
      .contains(whiteGSteps.five.address.autoComplete)
      .click();

    cy.wait(2000);
    // Phone Number > Input Field
    cy.get('[data-testid="whiteG-step-5"] input[type="tel"]')
      .should('be.visible')
      .type(whiteGSteps.five.phone.value);

    // Terms Checkbox > Checkbox Field
    cy.get('[data-testid="whiteG-step-5"] [data-testid="tcpa_disclosure"]')
      .should('be.visible')
      .click();

    // Show School > Button
    cy.get('[data-testid="show_schools"]').should('be.visible').click();

    cy.location('pathname').should('eq', '/school-offers');
    cy.wait(3000);

    // Get all the result cards
    cy.selectProgramWithOptions();

    cy.get('[data-testid="tcpa_disclosure_checkbox"]').click();
    cy.get('button').contains('Submit').click();

    cy.wait(10000);
    cy.get('button[aria-label="Close modal"]').click();

    cy.wait(1000);
    cy.location('pathname').should('eq', '/interested-programs');
  });
});
