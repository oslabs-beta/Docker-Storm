import React, { useState } from 'react';
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
    return (<form onSubmit={(event) => event.preventDefault()}>
      <input type="text" value={username} onChange={input => setUsername(input.target.value)} placeholder="username"></input>
      <input type="text" value={password} onChange={input => setPassword(input.target.value)} placeholder="password"></input>
      <button type="submit" onClick={confirmCredentials}>LOGIN</button>
      {invalid && <p>Invalid username/password please try again</p>}
    </form>);
};
export default Login;
