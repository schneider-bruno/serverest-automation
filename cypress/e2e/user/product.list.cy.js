const { faker } = require("@faker-js/faker");
import loginApi from "../../support/api/login";
import userHomePage from "../../support/pages/user/home";
import productsApi from "../../support/api/products";
import myProductListPage from "../../support/pages/user/my.product.list";

describe('Product List', () => {
  let token;
  let productId;
  let createdSuccessfully;
  let productName;
  let productPrice;

  before(() => { loginApi.generateToken().then(authorization => token = authorization) });

  beforeEach(() => {
    createdSuccessfully = false;
    productName = faker.commerce.productName();
    productPrice = faker.number.int({ min: 1, max: 9999 });

    productsApi.create(token, { name: productName, price: productPrice }).then(responseBody => {
      if (responseBody.message === "Cadastro realizado com sucesso") {
        createdSuccessfully = true;
        productId = responseBody['_id'];
      };
    });
    
    cy.login(Cypress.env('user').email, Cypress.env('user').password);
    cy.visit('/home');
  });

  afterEach(() => { if (createdSuccessfully) productsApi.delete(token, productId); });
  
  it('Total price is calculated correctly', { tags: ['@ui', '@user'] }, () => {
    const numberOfCliksToIncrease = faker.number.int({ min: 1, max: 20 });
    const totalProductQuantity = 1 + numberOfCliksToIncrease;

    userHomePage.searchForProduct(productName);
    userHomePage.clickOnAddProductToListByName(productName);
    Cypress._.times(numberOfCliksToIncrease, () => {
      cy.get(myProductListPage.increaseQuantityBtn).click();
    });
    myProductListPage.validateProductQuantityPrice(productPrice, totalProductQuantity);
  });
});
