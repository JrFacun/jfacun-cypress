import { generateUser } from '../../support/utils/userAPI_Faker';

describe('User API Tests', () => {

  it('should create a new user successfully', () => {
    const newUser = generateUser();

    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/user',
      body: newUser,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      cy.log('Create User Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message');
    });
  });

  it('should create multiple users using createWithList endpoint', () => {
    const users = [
      generateUser(),
      generateUser()
    ];

    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/user/createWithList',
      body: users,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      cy.log('✅ CREATE USERS WITH LIST Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(200);
    });
  });
  it('should create multiple users using createWithArray endpoint', () => {
    cy.fixture('usersAPI').then((users) => {
      cy.request({
        method: 'POST',
        url: 'https://petstore.swagger.io/v2/user/createWithArray',
        body: users,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        cy.log('✅ CREATE WITH ARRAY Response:', JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message');
      });
    });
  });

  it('should GET - log in the user successfully and return a session token', () => {
    cy.request({
      method: 'GET',
      url: 'https://petstore.swagger.io/v2/user/login?username=sample&password=123456',
    }).then((response) => {
      cy.log('Login Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('message').and.to.include('logged in user session');
    });
  });

  it('Should return 404 when attempting to GET user data with invalid username in the URL', () => {
    const invalidUsername = 'invalidUser123';

    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/user/${invalidUsername}`,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log('Response:', response);

      expect(response.status).to.eq(404);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.all.keys('code', 'type', 'message');
      expect(response.body.type).to.eq('error');
      expect(response.body.code).to.eq(1);
      expect(response.body.message).to.eq('User not found');
    });
  });
  it('should retrieve an existing user and return 200', () => {
    const username = 'string';

    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/user/${username}`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('✅ GET EXISTING USER Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('username', username);
    });
  });

  it('should return 404 for non-existing user', () => {
    const nonExistingUser = 'thisUserDoesNotExist123';

    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/user/${nonExistingUser}`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('❌ GET NON-EXISTING USER Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq('User not found');
    });
  });

  it('should log out the user successfully', () => {
    cy.request('https://petstore.swagger.io/v2/user/logout')
      .then((response) => {
        cy.log('Logout Response:', JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('code', 200);
      });
  });

  it('should return 404 when trying to delete a non-existent or not-logged-in user', () => {
    const usernameToDelete = 'nonexistentuser';
    cy.request({
      method: 'DELETE',
      url: `https://petstore.swagger.io/v2/user/${usernameToDelete}`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Response body:', response.body);
      expect(response.status).to.eq(404);
    });
  });

  it('should update the user details successfully', () => {
    const username = 'sampleuser';
    const updatedUser = generateUser();
    updatedUser.username = username;

    cy.request({
      method: 'PUT',
      url: `https://petstore.swagger.io/v2/user/${username}`,
      body: updatedUser,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      cy.log('✅ PUT Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message').and.to.eq(String(updatedUser.id));
    });
  });

  it('should handle a simulated 400 Bad Request error', () => {

    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/user',
      body: 'invalid-body-should-be-object-not-string', 
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log('⚠️ Simulated 500 Error Response:', JSON.stringify(response.body));
      expect([400, 500]).to.include(response.status);
    });
  });


});
