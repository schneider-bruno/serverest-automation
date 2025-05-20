class UsersApi {
    constructor() {
        this.url = `${Cypress.env('apiBaseUrl')}/usuarios`;
    };

    create(userData = {}) {
        const { name, email, password, isAdmin } = userData;

        cy.request({
            method: 'POST',
            url: this.url,
            body: {
                nome: name,
                email,
                password,
                administrador: isAdmin
            },
            failOnStatusCode: false 
        }).then(res => { cy.log(res.body.message) });
    };
};

const usersApi = new UsersApi();
export default usersApi;