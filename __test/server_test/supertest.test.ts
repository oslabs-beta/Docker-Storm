import request from 'supertest';
import db from '../../src/server/models/dockerStormModel';

const server = 'http://localhost:8080';

interface User {
  username: string,
  password: string,
  role: string
}

const userOne: User = {
  username: 'TestUser',
  password: 'TestPassword',
  role: 'TestRole'
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


describe('Route Testing', () => {

  describe('Route Integration', () => {

    describe('Upon Initiating App', () => {
      it('responds with 200 status and the login page', () => {
        return request(server)
          .get('/')
          .expect(200);
      });
    });
    
    //below test will only run successfully if user has Grafana installed
    xdescribe('Upon Initializing Grafana', () => {
      it('responds with 200 status and the metrics page', () => {
        return request(server)
          .post('/graf/init')
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

    // describe('Upon Changing Password', () => {
    //   it('responds by changing the password', () => {
    //     return request(server)
    //       .patch('/user/')
    //       .send(userOne)
    //       .expect(200);
    //   });
    // }); 
  

    describe('Getting User List', () => {
      it('responds by providing user list', () => {
        return request(server)
          .get('/user/all')
          .expect(200);
      });
    }); 

    describe('Should Add Targets', () => {
      it('responds by adding targets', () => {
        return request(server)
          .post('/graf/targetsAdd')
          .expect(200);
      });
    }); 

  });
});