import React, {useState, ReactNode} from 'react';
import { useNavigate } from 'react-router-dom';

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



const Signup = (props: Props) => { 
  const [usernameSignup, setUsernameSignup] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');
  const [verifyPasswordSignup, setVerifyPasswordSignup] = useState('');
  const [emailSignup, setEmailSignup] = useState('');
  const [organization, setOrganization] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const navigate = useNavigate();



  return (
    <div id="signup-big-div">
      <button id="exit-button" onClick={() => { props.setOpenSignup(false); }}>X</button>
      <div id="signup-form-div">
        <form id="signup-form" onSubmit={(event) => event.preventDefault()}>
          <label> Username:
            <input className="signup-form-input" type="text" value={usernameSignup} onChange={input => setUsernameSignup(input.target.value)} placeholder="username"/>
          </label>
          <label> Password:
            <input className="signup-form-input" type="password" value={passwordSignup} onChange={input => setPasswordSignup(input.target.value)} placeholder="password"/>
          </label>
          <label> Verify Password:
            <input className="signup-form-input" type="text" value={verifyPasswordSignup} onChange={input => setVerifyPasswordSignup(input.target.value)} placeholder="type password again"/>
          </label>
          <label> Email:
            <input className="signup-form-input" type="text" value={emailSignup} onChange={input => setEmailSignup(input.target.value)} placeholder="email"/>
          </label>
          <label> Organization:
            <input className="signup-form-input" type="text" value={organization} onChange={input => setOrganization(input.target.value)} placeholder="organization"/>
          </label>
          <label> Job Title:
            <input className="signup-form-input" type="text" value={jobTitle} onChange={input => setJobTitle(input.target.value)} placeholder="job title"/>
          </label>
          <button className="blue-button" type="submit"></button>
        </form>
      </div>
    </div>
  )
}

export default Signup;


// make sure the username does not already exist


// for the form, make constant get requests that search the backend for usernames that already exist


// send request to server,
// check if PG URI exist
// check if there are any users in the table
// 

// modal: type in the PG_URI .. use writefile to make the .env


