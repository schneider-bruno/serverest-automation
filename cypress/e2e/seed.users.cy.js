import usersApi from "../support/api/users";

describe('Seed users in DB', () => {
  it('Admin', { tags: ['@seed'] }, () => {
    usersApi.create({ name: 'QA Admin', email: Cypress.env('admin').email, password: Cypress.env('admin').password, isAdmin: 'true' });
  });

  it('Non-Admin', { tags: ['@seed'] }, () => {
    usersApi.create({ name: 'QA User', email: Cypress.env('user').email, password: Cypress.env('user').password, isAdmin: 'false' });
  });
});
