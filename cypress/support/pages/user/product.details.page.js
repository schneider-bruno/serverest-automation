class UserProductDetailsPage {
    constructor() {
        this.productNameH2 = '[data-testid=product-detail-name]'
    };

    validateProductDetails(productDetails = {}) {
        const { name, description, price, quantity } = productDetails;

        cy.get(this.productNameH2).should('contain', name);
        cy.contains('h4', 'R$').should('contain', price);
        cy.contains('h4', 'Quantidade').should('contain', quantity);
        cy.contains('h4', 'Descrição').should('contain', description);
    }
};

const userProductDetailsPage = new UserProductDetailsPage();
export default userProductDetailsPage;