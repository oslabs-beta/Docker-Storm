import { beforeAll } from '@jest/globals';
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
  it('should add user to the database', async () => {
    await fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(userOne)
    });
    fetch('http://localhost:8080/user/all')
      .then((data) => data.json())
      .then((result) => {
        const arrayOfUsers : string[] = [];
        console.log(arrayOfUsers);
        result.forEach((element: { username: string; }) => {
          arrayOfUsers.push(element.username);
        });
        expect(arrayOfUsers).toContain(userOne.username);          
      });  
  });

  // db.query(queryStr, [username])
  //       .then((data) => {
  //         if(data.rows.length === 1){
  //           const validPassword = bcrypt.compareSync(password, data.rows[0].password);
  //           if(validPassword) return next();

  it('should update the password of a user', () => {
    const currentPassword = userOne.password;
    console.log(currentPassword);
    // const changePassword = 'UPDATE users SET password=($1) WHERE username=($2);';
    // db.query(changePassword,[userOneChanged.password, userOne.username]);
    fetch('https://localhost:8080/user/', {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(userOne)
    })
      .then((data) => console.log(data));



    // fetch('http://localhost:8080/user/all')
    //   .then((data) => data.json())
    //   .then(() => {
    //     const queryStr = 'SELECT password FROM users WHERE username=$1';
    //     const userName = [userOne.username];
    //     console.log(userName);
    //     const updatedPass = db.query(queryStr, userName);
    //     console.log(updatedPass);
    //     expect(updatedPass).not.toEqual(currentPassword);          
    //   }); 

    
  });

  it('should delete user from the database', async () => {
    // const deleteTest = 'DELETE FROM users WHERE username=$1';
    // await db.query(deleteTest, [userOne.username]);
    await fetch('http://localhost:8080/user/', {
      method: 'DELETE',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({ username: 'TestUser'})
    })
      .then((data) => console.log(data));
    const queryStr = 'SELECT * FROM users';
    const result = db.query(queryStr, []);

    fetch('http://localhost:8080/user/all')
      .then((data) => data.json())
      .then((result) => {
        const arrayOfUsers : string[] = [];
        console.log(arrayOfUsers);
        result.forEach((element: { username: string; }) => {
          arrayOfUsers.push(element.username);
        });
        expect(arrayOfUsers).not.toContain(userOne.username);          
      });  
  });
});







