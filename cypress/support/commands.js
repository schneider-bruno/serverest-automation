import homePage from "./pages/admin/home";
import loginPage from "./pages/login";

Cypress.Commands.add('login', (email = Cypress.env('user').email, password = Cypress.env('user').password) => { 
    cy.session('login', () => {
        cy.visit('/');
        loginPage.fillForm({ email, password, submit: true });

        cy.get(homePage.logoutBtn).should('be.visible');
    });
});

Cypress.Commands.add('getColumnIndex', (headerText) => {
    return cy.contains('th', headerText).invoke('index').then((index) => {
        return index;
    });
});

Cypress.Commands.add('validateTableCellData', (headerText, tableRow, data) => {
    cy.getColumnIndex(headerText).then(index => {
        cy.xpath(`//table//tbody/tr[${tableRow + 1}]/td[${index + 1}]`).invoke('text').should('contain', data);
    });
});

