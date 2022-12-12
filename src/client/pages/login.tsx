import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import mac from '../../../resources/media/mac.png';
import waves from '../../../resources/media/waves.png';
import loginLogo from '../../../resources/media/login-logo.png';
import {TextField, Container, Box, Grid, Button } from '@mui/material';
import theme from '../theme.jsx';
import Signup from './signup.jsx';
import { DefaultDeserializer } from 'v8';

interface Props {
  setApiKey: (arg: string) => void;
  setGrafUrl: (arg: string) => void;
  grafUrl: string;
  apiKey: string;
}

interface ResponseObject {
  grafUrl: string;
  key: string;
}
  
const Login = (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
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

    setKeys(data.key, data.grafUrl);
    if(data.key && data.grafUrl) {
      navigate('/app/metrics');
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

        <Container 
          component="main" >
          <Box component="form"
            data-testid="user-input-field"
            id="login-form" 
            onSubmit={(event) => event.preventDefault()}
          >
            <Grid container 
              sx={{gap: '10px 0px', marginLeft: '0', marginRight: '0', marginTop:'30px', width: '100%', paddingLeft: '0px', paddingRight: '0px'}}
              justifyContent="center"
              alignContent="center"
              direction="column"
            >
              <Grid
                item 
                className="login-grid"
                xs={12}
              >
                <TextField 
                  data-testid="username-input"
                  required
                  variant='outlined'
                  type="text"
                  label="Username"
                  value={username} 
                  onChange={input => setUsername(input.target.value)}
                  sx={{ width: 350 }} 
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
                  variant='outlined'
                  type="password"
                  label="Password"  
                  value={password} 
                  onChange={input => setPassword(input.target.value)}
                  sx={{ width: 350 }} 
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
                    sx={{color:theme.palette.primary.contrastText, paddingLeft:'30px', paddingRight:'30px', border: '1.3px solid #ffffff'}} 
                    onClick={() => { setOpenSignup(true); }}>SIGNUP
                  </Button>
                </Grid>

                <Grid 
                  item
                  xs={12}
                  sm={6}
                  textAlign="center">
                  <Button 
                    data-testid="login button"
                    type="submit" 
                    sx={{color:'white', 
                      backgroundColor: theme.palette.primary.main, 
                      paddingLeft:'30px', 
                      paddingRight:'30px',
                      border: '1.3px solid',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: theme.palette.primary.main,
                        
                      },}} 
                    onClick={confirmCredentials}>LOGIN
                  </Button>
                </Grid>
              </Grid>
              {invalid && <p className="error-p">Invalid username/password please try again</p>}
            </Grid>
          </Box>
        </Container>
      </div>
      {openSignup && <Signup 
        setApiKey={props.setApiKey} 
        apiKey={props.apiKey} 
        setGrafUrl={props.setGrafUrl}
        grafUrl={props.grafUrl}
        openSignup={openSignup}
        setOpenSignup={setOpenSignup}
      />}

      <div id="right-div" className="half-n-half">
        <div id="waves-div" style={{ backgroundImage: `url(${waves})`}}>
          <img src={mac} id="mac-img" alt="mac" />
        </div>
      </div>
    </div>
  );
};



export default Login;