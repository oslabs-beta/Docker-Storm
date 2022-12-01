import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mac from '../../../resources/mac.png';
import waves from '../../../resources/waves.png';
// could maybe use cacheing to prevent need to fetch env file every time
const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();
    const setKeys = (apiKey, pgUri) => {
        props.setPgUri(pgUri);
        props.setApiKey(apiKey);
    };
    const confirmCredentials = () => {
        const body = {
            username: username,
            password: password
        };
        fetch('/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
            .then((data) => data.json())
            .then(async (result) => {
            // check if response is valid and we successfully logged in
            if (Object.keys(result).length === 2) {
                setKeys(result.key, result.db);
                if (props.apiKey && props.pgUri) {
                    navigate('/app');
                }
                else {
                    navigate('/setup');
                }
                // if response not valid - username/password was incorrect 
            }
            else {
                setInvalid(true);
                setUsername('');
                setPassword('');
            }
        });
    };
    return (<div id="login-big-div">

      <div id="left-div" className="half-n-half">
        <form id="login-form" onSubmit={(event) => event.preventDefault()}>
          <input className="login-input" type="text" value={username} onChange={input => setUsername(input.target.value)} placeholder="username"></input>
          <input className="login-input" type="password" value={password} onChange={input => setPassword(input.target.value)} placeholder="password"></input>
          <button className="blue-button" type="submit" onClick={confirmCredentials}>LOGIN</button>
          {invalid && <p className="error-p">Invalid username/password please try again</p>}
        </form>
      </div>

      <div id="right-div" className="half-n-half">
        <div id="waves-div" style={{ backgroundImage: `url(${waves})` }}>
          <img src={mac} id="mac-img" alt="mac"/>
          {/* <img src={waves} id="waves-img" alt="waves" /> */}
        </div>
      </div>
    </div>);
};
export default Login;
