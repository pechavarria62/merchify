describe('Homepage', () => {
  it('should load the homepage and display the hero section', () => {
    // Visit the homepage
    cy.visit('http://localhost:3000');

    // Check if the main heading in the HeroSection is visible
    cy.get('h1')
      .contains(
        'Find your style, anytime, anywhere'
      )
      .should('be.visible');

    // You can also check for other elements, for example, the "Shop Now" button
    cy.get('a')
      .contains('Shop Now')
      .should('be.visible');
  });
});
