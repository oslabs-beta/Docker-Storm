// fix the fetch requests to include the new properties in the User interface
// display the new properties in the table
import React, {useState, useEffect} from 'react';
import Link from '@mui/material/Link';
import { Box, Container, TableContainer, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import theme from '../theme.jsx';
import { StyleSharp } from '@mui/icons-material';



interface User {
  username: string,
  role: string
  organization?: string,
  email?: string,
  jobTitle?: string,
  TableRow?: React.ElementType;
}


const styles = {
  buttonStyles: {
    marginTop: '10px', 
    border: theme.palette.primary.main,
    borderStyle: 'solid',
    backgroundColor: theme.palette.primary.main, 
    '&:hover': {
      backgroundColor: 'white',
      color: theme.palette.primary.main,
      
    },
    color: 'white'
  },
  gridStyles: {
    width: '50%',
    margin: '0px'
  },
  fields: {
    backgroundColor: '#ffffff',
  },
  tableHeader: {
    color: '#9FA2B4',
  }
  
};



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
      password: password,
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
    const jobTitle = user.job_title;
    const organization = user.organization;
    const email = user.email;

    return (
      <TableRow component={Paper}>
        <TableCell>{username}</TableCell>
        <TableCell>{organization}</TableCell>
        <TableCell>{jobTitle}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{role}</TableCell>
      </TableRow>
    );});


  return (
    <>
      <Box className="big-div" sx={{ display: 'flex', flexDirection: 'column', height:'100%'}}>


        <Box id="table-div" sx={{ margin: '10px 50px'}}>
          <h2>List of all users</h2>
          <TableContainer component={Paper} sx={{maxHeight: '50vh', overflow:'auto'}}>
            <Table stickyHeader>
              <TableHead >
                <TableRow >
                  <TableCell>Username</TableCell>
                  <TableCell>Organization</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mappedList}
              </TableBody>
            </Table>
          </TableContainer>        
        </Box>

        <Box sx={{ margin: '10px 50px', display: 'flex'}}>
          <Container component='form' onSubmit={(e) => e.preventDefault()} sx={{display:'flex', flexDirection: 'row', justifyContent:'space-between', alignContent: 'center'}}>
            <TextField type="text" placeholder='Username' value={username} onChange={input => setUsername(input.target.value)} style={styles.fields}/>
            <TextField type="text" placeholder='Role' value={role} onChange={input => setRole(input.target.value)}  style={styles.fields}/>
            <TextField type="password" placeholder='Password' value={password} onChange={input => setPassword(input.target.value)}  style={styles.fields}/>
            <TextField type="password" placeholder='Confirm Password' value={confirmPassword} onChange={input => setConfirmPassword(input.target.value)}  style={styles.fields}/>
            <Button sx={styles.buttonStyles} type="submit" onClick={addNewUser}>Add New User</Button>
            {missingField && <div>Please fill out all fields before submitting</div>}
            {matchPassword && <div>Passwords do not match</div>}
            {uniqueUser && <div>Username already taken, please choose another username</div>}
          </Container>
        </Box>

      </Box>
    </>
  );
};

export default Users;

// fix fetch request 
