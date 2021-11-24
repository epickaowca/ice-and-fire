/// <reference types="cypress" />

Cypress.Commands.add(
  "stubApi",
  (response, { page, pageSize, name, gender, lastPage }) => {
    cy.intercept(
      "GET",
      `https://anapioficeandfire.com/api/characters?page=${page}&pageSize=${pageSize}&name=${name}&gender=${gender}`,
      {
        statusCode: 200,
        headers: {
          link: `<https://anapioficeandfire.com/api/characters?page=3&pageSize=10>; rel='next', <https://anapioficeandfire.com/api/characters?page=1&pageSize=10>; rel='prev', <https://anapioficeandfire.com/api/characters?page=1&pageSize=10>; rel='first', <https://anapioficeandfire.com/api/characters?page=${lastPage}&pageSize=10>; rel='last'`,
        },
        body: response,
      }
    );
  }
);
