import { afterAll, beforeAll } from '@jest/globals';
import db from '../../src/server/models/dockerStormModel';
import { describe, it } from '@jest/globals';

import 'whatwg-fetch';


const userOne = {
  username: 'TestUser',
  password: 'TestPassword',
  role: 'TestRole'
};

const userOneChanged = {
  username: 'TestUser',
  password: 'TestPasswordChanged',
  role: 'TestRole'
};

beforeAll( async() => {

  const createTest = `CREATE TABLE IF NOT EXISTS users(
    "id" SERIAL NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "role" text NOT NULL,
    PRIMARY KEY("id"),
    UNIQUE("username"))`;

  await db.query(createTest, []);

});


// afterAll(async() => {
//   const deleteTest = 'DELETE FROM users WHERE username=$1';
//   await db.query(deleteTest, [userOne.username]);
// });

describe('User Creation, Updating, and Deletion', () => {  
  it('should add user to the database', async () => {
    const createUser = 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3);';
    await db.query(createUser, [userOne.username, userOne.password, userOne.role]);
    await fetch('http://localhost:8080/user/all')
      .then((data) => data.json())
      .then((result) => {
        const arrayOfUsers : string[] = [];
        result.forEach((element) => {
          arrayOfUsers.push(element.username);
        });
        expect(arrayOfUsers).toContain(userOne.username);          
      });  
  });

  // it('should update the password of a user', async () => {
  //   const currentPassword = userOne.password;
  //   const changePassword = 'UPDATE users SET password=($1) WHERE username=($2);';
  //   await db.query(changePassword,[userOneChanged.password, userOne.username]);
  //   await fetch('http://localhost:8080/user/all')
  //     .then((data) => data.json())
  //     .then((result) => {
  //       console.log(result);
  //       const updatedUser = 'Select From users WHERE username=$1'
  //       db.query(updatedUser, [userOne.username]);
  //       const newPassword = await.db.query
  //       const arrayOfPasswords : string[] = [];
  //       result.forEach((element) => {
  //         arrayOfPasswords.push(element.password);
  //       });
  //       console.log(arrayOfPasswords);
  //       expect(updatedUser.password).not.toEqual(currentPassword);          
  //     }); 

    
  // });

  it('should delete user from the database', async () => {
    const deleteTest = 'DELETE FROM users WHERE username=$1';
    await db.query(deleteTest, [userOne.username]);
    await fetch('http://localhost:8080/user/all')
      .then((data) => data.json())
      .then((result) => {
        const arrayOfUsers : string[] = [];
        result.forEach((element) => {
          arrayOfUsers.push(element.username);
        });
        expect(arrayOfUsers).not.toContain(userOne.username);          
      });  
  });
});







