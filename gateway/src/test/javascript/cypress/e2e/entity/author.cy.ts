import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Author e2e test', () => {
  const authorPageUrl = '/author';
  const authorPageUrlPattern = new RegExp('/author(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const authorSample = { name: 'Checking EXE', handle: 'sensor overriding Mouse' };

  let author;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/author/api/authors+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/author/api/authors').as('postEntityRequest');
    cy.intercept('DELETE', '/services/author/api/authors/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (author) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/author/api/authors/${author.id}`,
      }).then(() => {
        author = undefined;
      });
    }
  });

  it('Authors menu should load Authors page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('author');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Author').should('exist');
    cy.url().should('match', authorPageUrlPattern);
  });

  describe('Author page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(authorPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Author page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/author/new$'));
        cy.getEntityCreateUpdateHeading('Author');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', authorPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/author/api/authors',
          body: authorSample,
        }).then(({ body }) => {
          author = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/author/api/authors+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [author],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(authorPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Author page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('author');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', authorPageUrlPattern);
      });

      it('edit button click should load edit Author page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Author');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', authorPageUrlPattern);
      });

      it('edit button click should load edit Author page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Author');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', authorPageUrlPattern);
      });

      it('last delete button click should delete instance of Author', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('author').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', authorPageUrlPattern);

        author = undefined;
      });
    });
  });

  describe('new Author page', () => {
    beforeEach(() => {
      cy.visit(`${authorPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Author');
    });

    it('should create an instance of Author', () => {
      cy.get(`[data-cy="name"]`).type('input Ergonomic').should('have.value', 'input Ergonomic');

      cy.get(`[data-cy="handle"]`).type('salmon protocol').should('have.value', 'salmon protocol');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        author = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', authorPageUrlPattern);
    });
  });
});
