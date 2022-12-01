import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();
    function confirmCredentials() {
        const body = {
            username: username,
            password: password
        };
        fetch('/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
            .then((result) => {
            if (result.status === 200)
                navigate('/app');
            else {
                setInvalid(true);
                setUsername('');
                setPassword('');
            }
        })
            .catch((err) => {
            console.log(err);
        });
    }
    return (_jsxs("form", { onSubmit: (event) => event.preventDefault(), children: [_jsx("input", { type: "text", value: username, onChange: input => setUsername(input.target.value), placeholder: "username" }), _jsx("input", { type: "text", value: password, onChange: input => setPassword(input.target.value), placeholder: "password" }), _jsx("button", { type: "submit", onClick: confirmCredentials, children: "LOGIN" }), invalid && _jsx("p", { children: "Invalid username/password please try again" })] }));
};
export default Login;
