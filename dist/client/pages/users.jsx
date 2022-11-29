import React, { useState, useEffect } from 'react';
const Users = () => {
    const [userList, setUserList] = useState([]);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const addUsersToArray = (arr) => {
        setUserList(arr);
    };
    const grabUsers = () => {
        fetch('/user/all')
            .then((data) => data.json())
            .then((result) => {
            addUsersToArray(result);
        });
    };
    const addNewUser = () => {
        if (!username || !role || !password || !confirmPassword || password !== confirmPassword) {
            return;
        }
        const body = {
            username: username,
            role: role,
            password: password
        };
        fetch('/user/signup', {
            method: 'POST',
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.status === 200) {
                const newUserList = [...userList];
                const newUser = {
                    username: username,
                    role: role
                };
                newUserList.push(newUser);
                setUserList(newUserList);
            }
        }).then(() => {
            setUsername('');
            setRole('');
            setPassword('');
            setConfirmPassword('');
        });
    };
    useEffect(() => {
        grabUsers();
    }, []);
    const mappedList = userList.map(user => {
        const username = user.username;
        const role = user.role;
        return (<div key={username}>{username}, {role}</div>);
    });
    return (<>
      <div>List of all users</div>
      <div>{mappedList}</div>
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Username" value={username} onChange={input => setUsername(input.target.value)}/>
        <input type="text" placeholder="Role" value={role} onChange={input => setRole(input.target.value)}/>
        <input type="text" placeholder="Password" value={password} onChange={input => setPassword(input.target.value)}/>
        <input type="text" placeholder="Confirm Password" value={confirmPassword} onChange={input => setConfirmPassword(input.target.value)}/>
        <button type="submit" onClick={addNewUser}>Add New User</button>
      </form>
    </>);
};
export default Users;
