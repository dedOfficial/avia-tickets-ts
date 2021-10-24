describe('Form', () => {
  it('When visiting the home page, the form is visible', () => {
    cy.visit('http://localhost:9000');

    cy.get('[data-hook=mainForm]').should('be.visible');
  });

  it('When typing a value into origin city autocomplete, this autocomplete is visible and has typed value', () => {
    cy.get('[data-hook=autocompleteOrigin]').as('origin');

    cy.get('@origin').should('be.visible');
    cy.get('@origin').type('Москва, Россия');
    cy.get('@origin').should('have.value', 'Москва, Россия');
  });

  it('When typing a value into destination city autocomplete, this autocomplete is visible and has typed value', () => {
    cy.get('[data-hook=autocompleteDestination]').as('destination');

    cy.get('@destination').should('be.visible');
    cy.get('@destination').type('Одесса, Украина');
    cy.get('@destination').should('have.value', 'Одесса, Украина');
  });

  it('When clicking on the depart datepicker, the datepicker modal should be opens', () => {
    cy.get('[data-hook=datepickerDepartInput]').as('depart');
    cy.get('[data-hook=datepickerDepartWrap] .datepicker-container').as(
      'departContainer'
    );

    cy.get('@depart').click();
    cy.get('@departContainer').should('be.visible');
  });

  it('After selecting departing date, it should be displayed in the input field in the right format', () => {
    cy.get(
      '[data-hook=datepickerDepartWrap] .datepicker-container .is-today'
    ).as('today');
    cy.get(
      '[data-hook=datepickerDepartWrap] .datepicker-container .btn-flat'
    ).as('modalButtons');
    cy.get('[data-hook=datepickerDepartInput]').as('depart');

    cy.get('@today').click();
    cy.get('@today').should('have.class', 'is-selected');

    cy.get('@modalButtons').contains('Ok').click();

    cy.get('@depart').then(($input) => {
      const val = $input.val();
      // YYYY-MM
      expect(val).to.match(/^\d{4}-\d{2}$/);
    });
  });

  it('When clicking on the return datepicker, the datepicker modal should be opens', () => {
    cy.get('[data-hook=datepickerReturnInput]').as('return');
    cy.get('[data-hook=datepickerReturnWrap] .datepicker-container').as(
      'returnContainer'
    );

    cy.get('@return').click();
    cy.get('@returnContainer').should('be.visible');
  });

  it('After selecting retrun date, it should be displayed in the input field in the right format', () => {
    cy.get(
      '[data-hook=datepickerReturnWrap] .datepicker-container .is-today'
    ).as('today');
    cy.get(
      '[data-hook=datepickerReturnWrap] .datepicker-container .btn-flat'
    ).as('modalButtons');
    cy.get('[data-hook=datepickerReturnInput]').as('return');

    cy.get('@today').click();
    cy.get('@today').should('have.class', 'is-selected');

    cy.get('@modalButtons').contains('Ok').click();

    cy.get('@return').then(($input) => {
      const val = $input.val();
      // YYYY-MM
      expect(val).to.match(/^\d{4}-\d{2}$/);
    });
  });

  it('When selecting the currency from thew header dropdown it should be changed and visible in the header', () => {
    cy.get('[data-hook=currencySelect] .dropdown-trigger').as(
      'currencyTrigger'
    );
    cy.get('[data-hook=currencySelect] .dropdown-content li').as(
      'currencyItem'
    );
    cy.get('@currencyTrigger').click();
    cy.get('@currencyItem').contains('€ ES Euro').click();
    cy.get('@currencyTrigger').should('have.value', '€ ES Euro');
  });
});
