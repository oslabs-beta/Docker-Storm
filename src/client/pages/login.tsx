import React, {useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import mac from '../../../resources/media/mac.png';
import waves from '../../../resources/media/waves.png';
import loginLogo from '../../../resources/media/login-logo.png';
import {TextField, Container, Box, Grid, Button } from '@mui/material';
import Signup from './signup.jsx';
import useLogin from '../queries/useLogin.jsx';

interface Props {
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  setGrafUrl: React.Dispatch<React.SetStateAction<string>>;
  grafUrl: string;
  apiKey: string;
}

interface ResponseObject {
  grafUrl: string;
  key: string;
}
  
const Login = (props: Props) => {
  const [invalid, setInvalid] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openSuccessfulSignup, setOpenSuccessfulSignup] = useState(false);
  const loginCredentials = useRef<HTMLFormElement>(null);
  const loginAttempt = useLogin();
  const [body, setBody] = useState('asdf');

  const navigate = useNavigate();

  const setKeys = (apiKey: string, grafUrl: string) => {
    props.setGrafUrl(grafUrl);
    props.setApiKey(apiKey);
  };

  const confirmCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (loginCredentials.current?.['username-input']?.value);
    const password = (loginCredentials.current?.['password-input']?.value);
    console.log(username, password);

    // const result = await loginAttempt.mutateAsync({username,password});
    // the query is hitting the backend properly, but the result is not reflecting - tbh I imagine that 
    // it has to do with use effect under the hood ?

    
    // this is always returning false for some reason
    // console.log(loginAttempt);
    // console.log('loginAttempt', loginAttempt);
    // setBody(result.grafUrl);
    // console.log('result', result);


    try {
      const loginResults = await loginAttempt.mutateAsync({username, password});

      const grafUrl = loginResults.grafUrl;
      const apiKey = loginResults.key;
      console.log(loginResults);
      setBody(grafUrl + apiKey);

    } catch (err) {
      setBody('err');
    }
    // const data = await (result as Response).json();
    // console.log('data', data);

    


    // const result = useQuery(['login'], () =>loginAttempt(username, password));

    // console.log(result.isSuccess);
    

    // if(result.status !== 200) {
    //   setInvalid(true);
    //   setUsername('');
    //   setPassword('');
    //   return;
    // }

    // setKeys(data.key, data.grafUrl);
    // if(data.key && data.grafUrl) {
    //   navigate('/app/metrics');
    // } else {
    //   navigate('/setup');
    // }
  };

  return (


    <>
      <div id="login-big-div">
        <div id="left-div" className="half-n-half">
          <div id="login-logo-div">
            <img src={loginLogo} alt="" />
          </div>

          <Container 
            component="main" >
            <Box component="form"
              data-testid="user-input-field"
              ref={loginCredentials}
              id="login-form" 
              onSubmit={(event) => confirmCredentials(event)}
            >
              <Grid container 
                sx={{'& .MuiTextField-root': {width: '30ch', marginTop:'7px'}}}
                justifyContent="center"
                alignContent="center"
                direction="column"
              >
                <Grid
                  item 
                >
                  <TextField 
                    data-testid="username-input"
                    required
                    id='username-input'
                    label="Username"
                  />
                </Grid>
                <Grid
                  item 
                  className="login-grid"

                  xs={12}
                >
                  <TextField 
                    data-testid="password-input"
                    required
                    id='password-input'
                    type="password"
                    label="Password"  
                    error={loginAttempt.isError}
                    helperText={loginAttempt.isError && 'incorrect password'}
                  />
                </Grid>
                <Grid item xs={12} display="flex" sx={{marginTop: '20px'}}>
                  <Grid 
                    item
                    xs={12}
                    sm={6}
                    textAlign="center">
                    <Button 
                      data-testid="sign-up button"
                      variant='outlined'
                      onClick={() => {setOpenSignup(true);}}>SIGNUP
                    </Button>
                  </Grid>

                  <Grid 
                    item
                    xs={12}
                    sm={6}
                    textAlign="center">
                    <Button 
                      data-testid="login button"
                      variant='contained'
                      type="submit"
                    >LOGIN
                    </Button>
                  </Grid>
                </Grid>
                {invalid && <p className="error-p">Invalid username/password please try again</p>}
              </Grid>
            </Box>
          </Container>
        </div>
      

        <div id="right-div" className="half-n-half">
          <div id="waves-div" style={{ backgroundImage: `url(${waves})`}}>
            <img src={mac} id="mac-img" alt="mac" />
          </div>
        </div>
      
      </div>
      {openSignup && <Signup 
        setApiKey={props.setApiKey} 
        apiKey={props.apiKey} 
        setGrafUrl={props.setGrafUrl}
        grafUrl={props.grafUrl}
        openSignup={openSignup}
        setOpenSignup={setOpenSignup}
        setOpenSuccessfulSignup={setOpenSuccessfulSignup}
        openSuccessfulSignup={openSuccessfulSignup}
      />}
      <div>{body}</div>
    </>

  );
};



export default Login;