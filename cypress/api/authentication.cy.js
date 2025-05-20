import loginApi from "../support/api/login";
import productsApi from "../support/api/products";

const successMessage = "Cadastro realizado com sucesso";

describe('Authentication', () => {
  it('Admin Token allows product creation', { tags: ['@api', '@auth'] }, () => {
    loginApi.generateToken().then(token => {
      productsApi.create(token, {}).then(responseBody => {
        expect(responseBody.message).to.eq(successMessage);
        if (responseBody.message === successMessage) productsApi.delete(token, responseBody['_id']);
      });
    });
  });

  it('User Token does not allow product creation', { tags: ['@api', '@auth'] }, () => {
    loginApi.generateToken(Cypress.env('user').email, Cypress.env('user').password).then(token => {
      productsApi.create(token, {}).then(responseBody => {
        expect(responseBody.message).to.eq("Rota exclusiva para administradores");
        if (responseBody.message === successMessage) productsApi.delete(token, responseBody['_id']);
      });
    });
  });

  it('Invalid Token is not allowed', { tags: ['@api', '@auth'] }, () => {
    const invalidToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNTg5NzU4NzQ2LCJleHAiOjE1ODk3Njg3NDZ9.B6TASHV8k9xBerz4NSeFBlAZGSDhZlqESt767M0567I";

    productsApi.create(invalidToken, {}).then(responseBody => {
      expect(responseBody.message).to.eq("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais");
    });
  });
});
