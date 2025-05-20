class AdminListUsersPage {
    constructor() {
        this.registerUsersBtn = '[data-testid=cadastrarUsuarios]'
    };

    findUserRowByEmail(email) {
        return cy.get('table tr').contains(email).parents('tr').invoke('index').then((index) => {
            return index;
        })
    };

    deleteUserByEmail(email) {
        cy.xpath(`//td[contains(., '${email}')]/..//button[@class="btn btn-danger"]`).click();
        cy.contains('td', email).should('not.exist');
    }
};

const adminListUsersPage = new AdminListUsersPage();
export default adminListUsersPage;