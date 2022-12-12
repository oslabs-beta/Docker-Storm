import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {TextField, Container, Box, Grid, Button } from '@mui/material';
import theme from '../theme.jsx';
import Tooltip from './tooltip.jsx';




interface Props {
    setApiKey: (arg: string) => void;
    apiKey: string;
    openSignup: boolean;
    setOpenSignup: (arg: boolean) => void;
    setGrafUrl: (value: string) => void;
    grafUrl: string;
}

interface ResponseObject {
    db: string;
    key: string;
}

const urlText = 'Please enter exactly in the form of http://localhost:XXXX/ or http://[IP ADDRESS]/ or http://[URL]/ . Please do not add anything after the final slash';
const apiText = 'You can find your Grafana API key under the configuration gear in your Grafana account.';


const Signup = (props: Props) => { 
  const [usernameSignup, setUsernameSignup] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');
  const [verifyPasswordSignup, setVerifyPasswordSignup] = useState('');
  const [emailSignup, setEmailSignup] = useState('');
  const [organization, setOrganization] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [currentApi, setCurrentApi] = useState(props.apiKey);
  const [currentGrafUrl, setCurrentGrafUrl] = useState(props.grafUrl);
  const navigate = useNavigate();


  const envSetup = () => {
    const body = {
      apiKey: currentApi,
      grafUrl: currentGrafUrl
    };
    
    props.setApiKey(currentApi);
    props.setGrafUrl(currentGrafUrl);

    fetch('/user/env', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body),
    });
  };



  const createAdminUser = async () => {
    if(!usernameSignup || !passwordSignup || !verifyPasswordSignup || !emailSignup || !organization || !currentApi || !currentGrafUrl || !jobTitle) {
      setInvalid(true);
      return;
    }
    
    if(passwordSignup !== verifyPasswordSignup) {
      return;
    }

    envSetup();

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
            <Container component="main" >
              <Box component="form"
                id="signup-form" 
                onSubmit={(event) => event.preventDefault()}
              >
                <Grid container 
                  sx={{gap: '10px 0px', marginLeft: '0', marginRight: '0', width: '100%', paddingLeft: '0px', paddingRight: '0px'}}
                >
                  <Grid 
                    item
                    xs={12}
                  >
                    <TextField 
                      required
                      variant='outlined'
                      fullWidth 
                      type="text"
                      label="Username"  
                      // labelClassName={}
                      value={usernameSignup} 
                      onChange={input => setUsernameSignup(input.target.value)} 
                      
                    />
                  </Grid>
                  <Grid 
                    xs={12}
                    item 
                  >
                    <TextField
                      type="password" 
                      label="Password" 
                      required
                      fullWidth
                      value={passwordSignup} 
                      onChange={input => setPasswordSignup(input.target.value)} 
                      placeholder="Password"/>
                  </Grid>
                  <Grid 
                    item
                    xs={12}
                  >
                    <TextField 
                      type="password" 
                      required
                      fullWidth
                      label="Verify Password"
                      value={verifyPasswordSignup} 
                      onChange={input => setVerifyPasswordSignup(input.target.value)} 
                      placeholder="Type password again"/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      type="text" 
                      required
                      fullWidth
                      label="Email" 
                      value={emailSignup} 
                      onChange={input => setEmailSignup(input.target.value)} 
                      placeholder="Email"/>
                  </Grid>
                  <Grid item className="signup-grid" xs={12}>
                    <TextField 
                      type="text" 
                      label="Organization" 
                      required
                      fullWidth
                      value={organization} 
                      onChange={input => setOrganization(input.target.value)} 
                      placeholder="Organization"/>
                  </Grid>
                  <Grid 
                    item 
                    xs={12}
                  >
                    <TextField
                      type="text" 
                      label="Job Title" 
                      required
                      fullWidth
                      value={jobTitle} 
                      onChange={input => setJobTitle(input.target.value)} 
                      placeholder="Job title"/>
                  </Grid>
                  {!props.grafUrl && <Grid 
                    item 
                    xs={12}
                    display='flex'
                  >
                    
                    <TextField
                      type="text" 
                      label="Grafana URL" 
                      required
                      fullWidth
                      value={currentGrafUrl} 
                      onChange={input => setCurrentGrafUrl(input.target.value)} 
                      placeholder="Grafana URL"/>
                    <Tooltip text={urlText}/>
                  </Grid>}
                  {!props.apiKey && <Grid 
                    item 
                    xs={12}
                    display="flex"
                  >
                    
                    <TextField
                      type="text" 
                      label="Grafana API key" 
                      required
                      fullWidth
                      value={currentApi} 
                      onChange={input => setCurrentApi(input.target.value)} 
                      placeholder="Grafana API key"/>
                    <Tooltip text={apiText}/>
                  </Grid>}
                  <Grid 
                    item
                    xs={12}
                    sm={6}
                    textAlign="center">
                    <Button 
                      sx={{color:theme.palette.primary.contrastText, paddingLeft:'20px', paddingRight:'20px', border: '1.3px solid #ffffff'}} 
                      onClick={() => { props.setOpenSignup(false); }}>Cancel</Button>
                  </Grid>

                  <Grid 
                    item
                    xs={12}
                    sm={6}
                    textAlign="center">
                    <Button 
                      type="submit" 
                      sx={{backgroundColor:theme.palette.primary.main, 
                        color:'white', 
                        paddingLeft:'20px', 
                        paddingRight:'20px',
                        border: '1.3px solid',
                        '&:hover': {
                          backgroundColor: 'white',
                          color: theme.palette.primary.main,
                        }}}  
                      onClick={() => createAdminUser()}>Signup</Button>
                  </Grid>

                </Grid>
                {(passwordSignup && passwordSignup !== verifyPasswordSignup) && <p className="error-p">Make sure your passwords match!</p> }
                {invalid && <p className="error-p">Please fill out all fields</p>}
                  
                
              </Box>
            
            </Container>
        }

        {signupSuccess &&
            <Box sx={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignContent: 'center'}}>
              <Grid 
                item
                xs={12}
                sm={6}
                textAlign="center">
                <h2>Signup Successful!</h2>
                <Button 
                  sx={{backgroundColor:theme.palette.primary.main, color:'white', paddingLeft:'20px', paddingRight:'20px', 
                    '&:hover': {
                      backgroundColor: 'white',
                      color: theme.palette.primary.main,
                      border: '1.3px solid'
                    }}} 
                  onClick={() => { props.setOpenSignup(false); }}>LOGIN</Button>
              </Grid>
            </Box>
        }

      </div>
    </div>
  );
};

export default Signup;