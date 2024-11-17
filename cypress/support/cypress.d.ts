declare namespace Cypress {
  interface ResolvedConfigOptions {
    hideXHRInCommandLog?: boolean;
  }
}

declare namespace Cypress {
  interface Chainable {
    selectProgramWithOptions(): Chainable<any>;
  }
}