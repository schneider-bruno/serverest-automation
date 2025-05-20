const { faker } = require("@faker-js/faker");
import adminHomePage from "../../support/pages/admin/home";
import adminRegisterUsersPage from "../../support/pages/admin/register.users";
import adminListUsersPage from "../../support/pages/admin/list.users";

describe('Managing users', () => {
  beforeEach(() => {
    cy.login(Cypress.env('admin').email, Cypress.env('admin').password);
    cy.visit('/admin/home');
  });

  describe('Registering Users', () => {
    const newUserName = faker.person.fullName();
    const newUserEmail = faker.internet.email();
    const newUserPassword = `${newUserEmail.split('@')[0]}#123`
    let registeredSuccessfully;
    
    beforeEach(() => { 
      registeredSuccessfully = false;
      cy.get(adminHomePage.registerUsersBtn).click();
    });

    afterEach(() => { if (registeredSuccessfully) adminListUsersPage.deleteUserByEmail(newUserEmail); });

    it('Register a new non-admin user', { tags: ['@ui', '@admin'] }, () => {
      adminRegisterUsersPage.fillForm({ name: newUserName, email: newUserEmail, password: newUserPassword, submit: true });
      adminListUsersPage.findUserRowByEmail(newUserEmail).then(rowIndex => {
        cy.validateTableCellData('Nome', rowIndex, newUserName);
        cy.validateTableCellData('Senha', rowIndex, newUserPassword);
        cy.validateTableCellData('Administrador', rowIndex, 'false');
      }).then(() => registeredSuccessfully = true)
    });
  });
});
