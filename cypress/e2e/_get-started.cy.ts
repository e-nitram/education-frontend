const userData = {};
const utmData = {};

describe('/get-started flow', () => {
  it('Page loads', () => {
    cy.visit('/get-started');
  });

  it('Allows an organic user to submit valid data', () => {
    cy.visit('/get-started');

    // Step 1
    // cy.get('[cy-Either]')

    // Step 2

    // Step 3

    // Step 4

    // Step 5

    // Step 6

    // Results

    // Offer Submit

    // Thank you modal
  });

  // it('Prevents a organic user from submitting invalid data', () => {
  //   cy.visit('/get-started');
  // });

  it('Allows a traffic user to submit valid data', () => {
    cy.request({ url: '/get-started', qs: utmData });

    // Step 1

    // Step 2

    // Step 3

    // Step 4

    // Step 5

    // Step 6

    // Results

    // Offer Submit

    // Thank you modal
  });

  // it('Prevents a traffic user from submitting invalid data', () => {
  //   cy.request({ url: '/get-started', qs: utmData });
  // });
});
