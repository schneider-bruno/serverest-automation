class MyProductListPage {
    constructor() {
        this.clearListBtn = '[data-testid=limparLista]',
        this.increaseQuantityBtn = '[data-testid=product-increase-quantity]'
    };

    validateProductQuantityPrice(price, quantity) {
        const totalPrice = price * quantity;

        cy.contains('p', 'R$').should('contain', totalPrice);
    };
};

const myProductListPage = new MyProductListPage();
export default myProductListPage;