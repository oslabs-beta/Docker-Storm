import request from 'supertest';
import db from '../../src/server/models/dockerStormModel';
const server = 'http://localhost:8080';

const userOne = {
  username: 'KevinTest',
  password: 'asdf',
  role: 'testrole'
};

const userOneChanged = {
  username: 'KevinTest',
  password: 'asdfgh',
  role: 'testrole'
};

beforeAll(async () => {
  const createTest = `CREATE TABLE IF NOT EXISTS users(
    "id" SERIAL NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "role" text NOT NULL,
    PRIMARY KEY("id"),
    UNIQUE("username"))`;

  await db.query(createTest, []);

});

afterAll(async() => {
  console.log('afterEach');
  const deleteTest = 'DELETE FROM users WHERE username=$1';
  await db.query(deleteTest, [userOne.username]);
});

describe('Route Integration', () => {
  describe('Upon Initiating App', () => {
    it('responds with 200 status and the login page', () => {
      return request(server)
        .get('/')
        .expect(200);
    });
  });
  
  describe('Upon Initializing Grafana', () => {
    it('responds with 200 status and the metrics page', () => {
      return request(server)
        .post('/graf/init')
        .expect(200);
    });
  });
  
  describe('Upon Signing Up', () => {
    it('responds with the home page', () => {
      return request(server)
        .post('/user/signup')
        .send(userOne)
        .expect(200);
    });
  }); 

  describe('Upon Logging In', () => {
    it('responds with the home page', () => {
      return request(server)
        .post('/user/login')
        .send(userOne)
        .expect(200);
    });
  }); 

  describe('Upon Deleting User', () => {
    it('responds by deleting the user', () => {
      return request(server)
        .delete('/user/')
        .send(userOne.username)
        .expect(200);
    });
  }); 

  describe('Upon Changing Password', () => {
    it('responds by changing the password', () => {
      return request(server)
        .patch('/user/')
        .send(userOne)
        .expect(200);
    });
  }); 
  
});