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
  const deleteTest = 'DELETE FROM users WHERE username=$1';
  await db.query(deleteTest, [userOne.username]);
});


describe('Route Testing', () => {

  describe('Route Integration for Users', () => {

    describe('Upon Initiating App', () => {
      it('responds with 200 status and the login page', () => {
        return request(server)
          .get('/')
          .expect(200);
      });
    });

    describe('Upon Initiating App', () => {
      it('responds by creating a user with entered name and pw', () => {
        return request(server)
          .post('/user/signup')
          .send(userOne)
          .expect(200);
      });
    });

    describe('Upon Initiating App', () => {
      it('responds with error message if nothing is sent', () => {
        return request(server)
          .post('/user/login')
          .expect(400);
      });
    });

    describe('Upon Initiating App', () => {
      it('should post a request which allows us to update our env file', () => {
        return request(server)
          .post('/user/env')
          .expect(200);
      });
    });

    describe('Getting User List', () => {
      it('responds by providing user list', () => {
        return request(server)
          .get('/user/all')
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
  });


  describe('Route Integration for Grafana', () => {

    //Get request that creates an EmptyDB - verify if user has Grafana installed
    xdescribe('Should create an Empty DB', () => {
      it('responds by adding targets', () => {
        return request(server)
          .get('/graf/')
          .expect(200);
      });
    }); 

    //Post request initalizing the dashboard not already existing - verify if user has Grafana installed
    xdescribe('Upon Initializing Grafana', () => {
      it('responds with 200 status and the metrics page', () => {
        return request(server)
          .post('/graf/init')
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


  describe('Route Integration for Initializing DB', () => {

    describe('Should create an Empty DB', () => {
      it('responds by creating an Empty DB', () => {
        return request(server)
          .get('/init/')
          .expect(200);
      });
    }); 
  });

  describe('Route Integration for Metrics', () => {
    
    //verify if user has Grafana installed
    xdescribe('Should generate all targets', () => {
      it('responds by generating all targetsa', () => {
        return request(server)
          .get('/metric/')
          .expect(200);
      });
    });

    //verify if user has Grafana installed
    xdescribe('Should generate panel bodies', () => {
      it('responds by creating a panel', () => {
        return request(server)
          .post('/metric/genPanel')
          .expect(200);
      });
    }); 

    //verify if user has Grafana installed
    xdescribe('Should generate all static panels', () => {
      it('responds by creating static panels', () => {
        return request(server)
          .get('/metric/genStaticPanels')
          .expect(200);
      });
    }); 
  });
});