class LoginPage {
    constructor() {
        this.loginField = '#email',
        this.passwordField = '#password',
        this.submitBtn = '[data-testid=entrar]'
    };

    fillForm(formData = {}) {
        const {
            email = Cypress.env('user').email,
            password = Cypress.env('user').password,
            submit = false
        } = formData;

        cy.get(this.loginField).type(email);
        cy.get(this.passwordField).type(password);

        if (submit) cy.get(this.submitBtn).click();
    };
};

const loginPage = new LoginPage();
export default loginPage;