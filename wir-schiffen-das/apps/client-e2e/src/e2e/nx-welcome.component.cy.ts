describe('client', () => {
  beforeEach(() => cy.visit('/iframe.html?id=nxwelcomecomponent--primary'));
  it('should render the component', () => {
    cy.get('wir-schiffen-das-nx-welcome').should('exist');
  });
});
