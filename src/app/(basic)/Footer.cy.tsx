import Footer from './Footer';

// Describe the test suite
describe('Footer Component', () => {
  const aois = [
    { slug: 'art-design', show: 'Art & Design' },
    { slug: 'business', show: 'Business' },
    { slug: 'comp-tech', show: 'Computers & Technology' },
    { slug: 'education', show: 'Education' },
    { slug: 'law', show: 'Law & Criminal Justice' },
    { slug: 'liberal-arts', show: 'Liberal Arts' },
    { slug: 'healthcare', show: 'Nursing & Healthcare' },
    { slug: 'psychology', show: 'Psychology & Counseling' },
    { slug: 'trades', show: 'Trades & Vocational' },
  ];

  // Before each test, mount your component
  beforeEach(() => {
    cy.mount(<Footer />);
  });

  // Add your test cases
  it('should display the logo', () => {
    // Use Cypress commands to locate and assert the presence of the logo
    cy.get('img[alt="EducationDirectory.net"]').should('exist');
  });

  it('should have links to areas of interest', () => {
    // Find the h2 element with the specified text
    cy.contains('h2', 'Areas of Interest')
      // Find its parent div and then find the links within it
      .parent()
      .find('a')
      // Iterate over the links and assert the href attribute
      .each((link, index) => {
        cy.wrap(link).should(
          'have.attr',
          'href',
          `/area-of-interest/${aois[index].slug}`,
        );
      });
  });

  it('should have a link to the privacy policy', () => {
    // Assert the presence of the privacy policy link
    cy.get('a:contains("Privacy Policy")').should(
      'have.attr',
      'href',
      '/privacy-policy',
    );
  });

  it('should have a link to the terms of use', () => {
    // Assert the presence of the terms of use link
    cy.get('a:contains("Terms of Use")').should(
      'have.attr',
      'href',
      '/terms-and-conditions',
    );
  });

  it('should have a link to "Do not sell my info"', () => {
    // Assert the presence of the "Do not sell my info" link
    cy.get('a:contains("Do not sell my info")').should(
      'have.attr',
      'href',
      '/do-not-call',
    );
  });

  it('should display contact information', () => {
    // Assert the presence of the contact information link
    cy.get('a:contains("(877) 835-5785")').should(
      'have.attr',
      'href',
      'tel:8778355785',
    );
  });

  it('should have the legal information text', () => {
    // Assert the presence of the legal information text
    cy.contains(
      'This is an offer for educational opportunities and not an offer for nor a guarantee of employment.',
    );
  });

  it('should have the source link in legal information', () => {
    // Assert the presence of the source link in legal information
    cy.get('a[href="https://www.bls.gov/ooh/fastest-growing.htm"]').should(
      'exist',
    );
  });
});
