import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
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
        return (_jsxs("div", { children: [username, ", ", role] }, username));
    });
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: "List of all users" }), _jsx("div", { children: mappedList }), _jsxs("form", { onSubmit: e => e.preventDefault(), children: [_jsx("input", { type: "text", placeholder: "Username", value: username, onChange: input => setUsername(input.target.value) }), _jsx("input", { type: "text", placeholder: "Role", value: role, onChange: input => setRole(input.target.value) }), _jsx("input", { type: "text", placeholder: "Password", value: password, onChange: input => setPassword(input.target.value) }), _jsx("input", { type: "text", placeholder: "Confirm Password", value: confirmPassword, onChange: input => setConfirmPassword(input.target.value) }), _jsx("button", { type: "submit", onClick: addNewUser, children: "Add New User" })] })] }));
};
export default Users;
