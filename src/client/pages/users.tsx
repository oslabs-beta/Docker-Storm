import React, {useState, useEffect} from 'react';
import userIcon from '../../../resources/icons/user-icon.png';


interface User {
  username: string,
  role: string
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
          role: role
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
    return (
      <tr key={username}>
        <td>{username}</td> 
        <td>{role}</td>
        <td className="centered"><button className="deleteBtn">X</button></td>
      </tr>
    );
  });


  return (
    <>
      <div className="page-wrapper">
        <div className="page-inner-wrapper-div" id="top-inner-wrapper-div">
          <h2 className='page-title dark-text'><span className="page-title-span">
              <img className="title-icon dark-icon" src={userIcon} alt="" />Users</span></h2>
          <form id="add-user-form" onSubmit={e => e.preventDefault()}>
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
            <button type="submit" className="blue-button" onClick={addNewUser}>Create New User</button>
          </form>
        </div>
        <div className="page-inner-wrapper-div" id="bottom-inner-wrapper-div">
          <div id="tableDiv">
            <table>
              <tr>
                <th>User Name</th>
                <th>Role</th>
                <th>Delete</th>
              </tr>
         
              {mappedList}
            </table>
          </div>
          {missingField && <div>Please fill out all fields before submitting</div>}
          {matchPassword && <div>Passwords do not match</div>}
          {uniqueUser && <div>Username already taken, please choose another username</div>}
        </div>
      </div>
    </>
  );
};

export default Users;
