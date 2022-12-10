import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import mac from '../../../resources/media/mac.png';
import waves from '../../../resources/media/waves.png';
import loginLogo from '../../../resources/media/login-logo.png';
import { DefaultDeserializer } from 'v8';

interface Props {
  setApiKey: (arg: string) => void;
  setGrafUrl: (arg: string) => void;
  apiKey: string;
  openSignup: boolean;
  setOpenSignup: (arg: boolean) => void;
}
interface ResponseObject {
  grafUrl: string;
  key: string;
}
  
// could maybe use cacheing to prevent need to fetch env file every time
const Login = (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();



  const setKeys = (apiKey: string, grafUrl: string) => {
    props.setGrafUrl(grafUrl);
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
    console.log(data);

    setKeys(data.key, data.grafUrl);
    if(data.key && data.grafUrl) {
      navigate('/app');
    } else {
      navigate('/setup');
    }

  };

  return (
    <div id="login-big-div">
      <div id="left-div" className="half-n-half">
        <div id="login-logo-div">
          <img src={loginLogo} alt="" />
        </div>
        <form id="login-form" onSubmit={(event) => event.preventDefault()}>
          <input className="login-input" type="text" value={username} onChange={input => setUsername(input.target.value)} placeholder="username"></input>
          <input className="login-input" type="password" value={password} onChange={input => setPassword(input.target.value)} placeholder="password"></input>
          <button className="blue-button" type="submit" onClick={confirmCredentials}>LOGIN</button>
          <button id="signup" onClick={() => { props.setOpenSignup(true); }}>Signup</button>
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