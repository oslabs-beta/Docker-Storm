import React, {useState, ReactNode} from 'react';
import { useNavigate } from 'react-router-dom';
import {TextField} from '@mui/material';

interface Props {
    setApiKey: (arg: string) => void;
    apiKey: string;
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
  const [invalid, setInvalid] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const createAdminUser = async () => {
    const body = {
      username: usernameSignup,
      password: passwordSignup,
      email: emailSignup,
      organization: organization,
      jobTitle: jobTitle
    };

    const result = await fetch('/user/signupAdmin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });

    if(result.status !== 200) {
      setInvalid(true);
      return;
    }

    if(result.status == 200) {
      setSignupSuccess(true);
      return;
    }
  };


  return (
    <div id="signup-background-div">
      <div id="signup-inner-div">
        

        {!signupSuccess &&
          <div id="signup-form-div">
            <form id="signup-form" onSubmit={(event) => event.preventDefault()}>
              <label> Username
                <TextField className="signup-form-input" type="text" value={usernameSignup} onChange={input => setUsernameSignup(input.target.value)} placeholder="Username"/>
              </label>
              <label> Password
                <TextField className="signup-form-input" type="password" value={passwordSignup} onChange={input => setPasswordSignup(input.target.value)} placeholder="Password"/>
              </label>
              <label> Verify Password
                <TextField className="signup-form-input" type="password" value={verifyPasswordSignup} onChange={input => setVerifyPasswordSignup(input.target.value)} placeholder="Type password again"/>
              </label>
              <label> Email
                <TextField className="signup-form-input" type="text" value={emailSignup} onChange={input => setEmailSignup(input.target.value)} placeholder="Email"/>
              </label>
              <label> Organization
                <TextField className="signup-form-input" type="text" value={organization} onChange={input => setOrganization(input.target.value)} placeholder="Organization"/>
              </label>
              <label> Job Title
                <TextField className="signup-form-input" type="text" value={jobTitle} onChange={input => setJobTitle(input.target.value)} placeholder="Job title"/>
              </label>
              <button className="blue-button" type="submit" onClick={() => createAdminUser()}>Signup</button>
              {invalid && <p className="error-p">Please fill out all fields</p>}
              <button id="signup" onClick={() => { props.setOpenSignup(false); }}>Cancel</button>
            </form>
            
            
          </div>
        }

        {signupSuccess &&
          <div id="signup-success-msg-div">
            <h3>Signup Successful!</h3>
          </div>
        }

      </div>
    </div>
  );
};

export default Signup;


