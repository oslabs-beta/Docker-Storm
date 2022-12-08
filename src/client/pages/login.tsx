import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import mac from '../../../resources/mac.png';
import waves from '../../../resources/waves.png';
import { DefaultDeserializer } from 'v8';

interface Props {
  setApiKey: (arg: string) => void;
  apiKey: string;
  setPgUri: (arg: string) => void;
  pgUri: string;
  openSignup: boolean;
  setOpenSignup: (arg: boolean) => void;
}
interface ResponseObject {
  db: string;
  key: string;
}
  
// could maybe use cacheing to prevent need to fetch env file every time
const Login = (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const navigate = useNavigate();



  const setKeys = (apiKey: string, pgUri: string) => {
    props.setPgUri(pgUri);
    props.setApiKey(apiKey);
  };

  const confirmCredentials = async () => {
    const body = {
      username: username,
      password: password
    };
    
    const result = await fetch('/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });

    if(result.status !== 200) {
      setInvalid(true);
      setUsername('');
      setPassword('');
      return;
    }
    const data: ResponseObject = await result.json();

    setKeys(data.key, data.db);
    if(data.key && data.db) {
      navigate('/app');
    } else {
      navigate('/setup');
    }

  };

  return (
    <div id="login-big-div">
      <div id="left-div" className="half-n-half">
        <form id="login-form" onSubmit={(event) => event.preventDefault()}>
          <input className="login-input" type="text" value={username} onChange={input => setUsername(input.target.value)} placeholder="username"></input>
          <input className="login-input" type="password" value={password} onChange={input => setPassword(input.target.value)} placeholder="password"></input>
          <button className="blue-button" type="submit" onClick={confirmCredentials}>LOGIN</button>
          <button id="signup" onClick={() => { setOpenSignup(true); }}>Signup</button>
          {invalid && <p className="error-p">Invalid username/password please try again</p>}
        </form>
      </div>

      <div id="right-div" className="half-n-half">
        <div id="waves-div" style={{ backgroundImage: `url(${waves})`}}>
          <img src={mac} id="mac-img" alt="mac" />
        </div>
      </div>
    </div>
  );
};



export default Login;