import { faker } from "@faker-js/faker";

class AdminRegisterUsersPage {
    constructor() {
        this.nameField = '#nome',
        this.emailField = '#email',
        this.passwordField = '#password',
        this.adminCheckbox = '#administrador',
        this.submitBtn = '[data-testid=cadastrarUsuario]'
    };

    fillForm(formData = {}) {
        const {
            name = faker.person.fullName(),
            email = faker.internet.email(),
            password = 'defaultPassword#321',
            isAdmin = false,
            submit = false
        } = formData;

        cy.get(this.nameField).type(name);
        cy.get(this.emailField).type(email);
        cy.get(this.passwordField).type(password);
        if (isAdmin) cy.get(this.adminCheckbox).click();

        if (submit) cy.get(this.submitBtn).click();
    }
};

const adminRegisterUsersPage = new AdminRegisterUsersPage();
export default adminRegisterUsersPage;