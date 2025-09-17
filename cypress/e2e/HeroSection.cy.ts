describe('HeroSection', () => {
  it('should load the homepage and display the hero section', () => {
    // Visit the site
    cy.visit('http://localhost:3000');

    // Check if the main heading in the HeroSection is visible
    cy.get('h1')
      .contains(
        'Best Sellers'
      )
      .should('be.visible');

    // "Shop Now" button
    cy.get('a')
      .contains('Shop Now')
      .should('be.visible');
  });
});
