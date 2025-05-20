const { faker } = require("@faker-js/faker");
import loginApi from "../../support/api/login";
import userHomePage from "../../support/pages/user/home";
import productsApi from "../../support/api/products";
import userProductDetailsPage from "../../support/pages/user/product.details.page";

describe('Product details', () => {
  let token;
  let productId;
  let createdSuccessfully;
  let productName;
  let productPrice;
  let productDescription;
  let productQuantity;

  before(() => { loginApi.generateToken().then(authorization => token = authorization) });

  beforeEach(() => {
    createdSuccessfully = false;
    productName = faker.commerce.productName();
    productPrice = faker.number.int({ min: 1, max: 9999 });
    productDescription = faker.commerce.productDescription();
    productQuantity = faker.number.int({ min: 1, max: 99 });

    productsApi.create(token, { name: productName, description: productDescription, price: productPrice, quantity: productQuantity }).then(responseBody => {
      if (responseBody.message === "Cadastro realizado com sucesso") {
        createdSuccessfully = true;
        productId = responseBody['_id'];
      };
    });
    cy.login(Cypress.env('user').email, Cypress.env('user').password);
    cy.visit('/home');
  });

  afterEach(() => { if (createdSuccessfully) productsApi.delete(token, productId); });
  
  it('Product details must match with database', { tags: ['@ui', '@user'] }, () => {
    userHomePage.searchForProduct(productName);
    userHomePage.clickOnProductDetailsByName(productName);
    userProductDetailsPage.validateProductDetails({ name: productName, price: productPrice, quantity: productQuantity, description: productDescription });
  });
});
