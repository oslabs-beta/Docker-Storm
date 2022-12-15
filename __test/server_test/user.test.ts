import { beforeAll } from '@jest/globals';
import db from '../../src/server/models/dockerStormModel';
import { describe, it } from '@jest/globals';
import 'whatwg-fetch';


const userOne = {
  username: 'TestUser',
  password: 'TestPassword',
  role: 'TestRole'
};

beforeAll( () => {

  const createTest = `CREATE TABLE IF NOT EXISTS users(
    "id" SERIAL NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "role" text NOT NULL,
    PRIMARY KEY("id"),
    UNIQUE("username"))`;

  db.query(createTest, []);

});

describe('User Creation, Updating, and Deletion', () => {  

  beforeEach( async() => {
    await fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(userOne)
    })
      .then((data) => data.json())
      .then((result) => console.log(result));
  });

  afterEach(() => {
    fetch('http://localhost:8080/user/', {
      method: 'DELETE',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({ username: 'TestUser'})
    })
      .then((data) => data.json())
      .then((result => console.log(result)));
  });
  
  it('should confirm the user was added to the database', () => { 
    fetch('http://localhost:8080/user/all')
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        const arrayOfUsers : string[] = [];        
        result.forEach((element: { username: string; }) => {
          arrayOfUsers.push(element.username);
        });
        expect(arrayOfUsers).toContain(userOne.username);          
      });  
  });
});







