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
        <button id="exit-button" onClick={() => { props.setOpenSignup(false); }}>X</button>

        {!signupSuccess &&
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
              <button className="blue-button" type="submit" onClick={() => createAdminUser()}>Signup</button>
              {invalid && <p className="error-p">Please fill out all fields</p>}
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


