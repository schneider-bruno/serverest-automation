class UserHomePage {
    constructor() {
        this.logoutBtn = '[data-testid=logout]',
        this.searchField = '[data-testid=pesquisar]',
        this.searchBtn = '[data-testid=botaoPesquisar]',
        this.loadingIcon = '.loading-container .loading',
        this.addToListBtn = '[data-testid=adicionarNaLista]'
    };

    searchForProduct(name) {
        cy.get(this.searchField).type(name);
        cy.get(this.searchBtn).click();
        cy.get(this.loadingIcon).should('not.exist');
    };

    clickOnProductDetailsByName(name) {
        cy.contains('.card-title.negrito', name).parents('div.card-body').find('a.card-link').click();
    };

    clickOnAddProductToListByName(name) {
        cy.contains('.card-title.negrito', name).parents('div.card-body').find(this.addToListBtn).click();
    };
};

const userHomePage = new UserHomePage();
export default userHomePage;