class LoginApi {
    constructor() {
        this.url = `${Cypress.env('apiBaseUrl')}/login`;
    };

    generateToken(email = Cypress.env('admin').email, password = Cypress.env('admin').password) {
        return cy.request({
            method: 'POST',
            url: this.url,
            body: {
                email,
                password
            },
            failOnStatusCode: false 
        }).then(res => {
            expect(res.status).to.eq(200);
            return res.body.authorization;
        })
    };
};

const loginApi = new LoginApi();
export default loginApi;