describe('client', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'));
  it('should render the component', () => {
    cy.get('wir-schiffen-das-root').should('exist');
  });
});
