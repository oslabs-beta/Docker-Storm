import { afterAll, beforeAll } from '@jest/globals';
import db from '../../src/server/models/dockerStormModel';
import { describe, it } from '@jest/globals';

const userOne = {
  username: 'KevinTest',
  password: 'asdf',
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
})

describe('User Creation, Login, and Deletion', () => {  
  it('should create a user to the database', () => {
    // const createUser = 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3);';
    // db.query(createUser, [userOne.username, userOne.password, userOne.role]);
    fetch('localhost:8080/user/signup', {//need a route here to get list of users 
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userOne)
    });
      // .then((data) => data.json())
      // .then((result) => {
      //   return;
      // });
  });

  // it('should save a user with hashed_password and salt attributes', async () => {
  //   try {
  //     fetch('localhost:8080/user/signup', {//need a route here to get list of users 
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(userOne)
  //   })
  //       let result = await new User({ username: "sam", email: "sam@ed.info", password: 'qwer213'}).save()
  //       expect(Object.keys(result._doc)).toEqual(expect.arrayContaining( ['salt', 'hashed_password']))
  //   }
  //   catch (err) {
  //       throw new Error(err)
  //   }
  // })
});   

// //change password

// //
// // })
// // it('should login a user to the database', () => {
// //   const loginUser = 'SELECT INTO users (username, password, role) VALUES ($1, $2, $3);';
// //   db.query(loginUser, [userOne.username, userOne.password, userOne.role]);
// // });    
// // it('should login a user to the test database', () => {
// //   return request(server)
// //     .post('/')
// //     .expect(200);
// // });

// // it('should delete a user in the database', () => {
// //   return request(server)
// //     .delete('/')
// //     .expect(200);




// //crud functionality should suffice for now