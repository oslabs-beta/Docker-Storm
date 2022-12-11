// fix the fetch requests to include the new properties in the User interface
// display the new properties in the table
import React, {useState, useEffect} from 'react';
import Link from '@mui/material/Link';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';



interface User {
  username: string,
  role: string
  organization?: string,
  email?: string,
  jobTitle?: string,
  TableRow: React.ElementType;
}




const Users = () => {

  const [userList, setUserList] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [missingField, setMissingField] = useState(false);
  const [matchPassword, setMatchPassword] = useState(false);
  const [uniqueUser, setUniqueUser] = useState(false);


  const addUsersToArray = (arr: User[]) => {
    setUserList(arr);
  };

  const grabUsers = () => {
    fetch('/user/all')
      .then((data) => data.json())
      .then((result) => {
        addUsersToArray(result as User[]);
      });

  };

  const addNewUser = () => {
    setMissingField(false);
    setMatchPassword(false);
    setUniqueUser(false);
    if(!username || !role || !password || !confirmPassword) {
      setMissingField(true);
      return;
    }
    
    if(password !== confirmPassword) {
      setMatchPassword(true);
      return;
    }

    const body = {
      username: username,
      role: role,
      password: password
    };

    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if(response.status === 200) {
        const newUserList = [...userList];
        const newUser: User = {
          username: username,
          role: role,
        };
        newUserList.push(newUser);

        // unsure if there isn't a better way to this 
        setUserList(newUserList);
        setUsername('');
        setRole('');
        setPassword('');
        setConfirmPassword('');
        setMissingField(false);
        setMatchPassword(false);
        setUniqueUser(false);
      } else {
        setUniqueUser(true);
      }
    });

  };



  useEffect(() => {
    grabUsers();
  },[]);

  const mappedList = userList.map(user => {
    const username = user.username;
    const role = user.role;
    const organization = user.organization;
    const email = user.email;

    return (
      <TableRow component={Paper}>
        <TableCell>{username}</TableCell>
        <TableCell>{role}</TableCell>
      </TableRow>
    );});


  return (
    <>
      <div>List of all users</div>
      <div id="table-div">
        <TableContainer component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappedList}
          </TableBody>
        </TableContainer>
      </div>
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <input type="text" 
            placeholder="Username" 
            value={username} 
            onChange={input => setUsername(input.target.value)} />
          <input type="text"
            placeholder="Role"
            value={role}
            onChange={input => setRole(input.target.value)}/>
          <input type="text" 
            placeholder="Password" 
            value={password}
            onChange={input => setPassword(input.target.value)}/>
          <input type="text" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={input => setConfirmPassword(input.target.value)}/>
          <button type="submit" onClick={addNewUser}>Add New User</button>
          {missingField && <div>Please fill out all fields before submitting</div>}
          {matchPassword && <div>Passwords do not match</div>}
          {uniqueUser && <div>Username already taken, please choose another username</div>}
        </form>
      </div>
    </>
  );
};

export default Users;

// fix fetch request 
// fix table
// fix div