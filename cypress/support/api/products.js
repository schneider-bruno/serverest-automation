import { faker } from "@faker-js/faker";

class ProductsApi {
    constructor() {
        this.url = `${Cypress.env('apiBaseUrl')}/produtos`;
    };

    create(token, productDetails = {}) {
        const {
            name = faker.commerce.productName(),
            price = faker.number.int({ min: 1, max: 9999 }),
            description = faker.commerce.productDescription(),
            quantity = faker.number.int({ min: 1, max: 99 })
        } = productDetails
        return cy.request({
            method: 'POST',
            url: this.url,
            headers: { Authorization: token },
            body: {
                nome: name,
                preco: price,
                descricao: description,
                quantidade: quantity
            },
            failOnStatusCode: false 
        }).then(res => { return res.body });
    };

    delete(token, productId) {
        cy.request({
            method: 'DELETE',
            url: `${this.url}/${productId}`,
            headers: { Authorization: token },
            failOnStatusCode: false
        }).then(res => { expect(res.status).to.eq(200) });
    };
};

const productsApi = new ProductsApi();
export default productsApi;