import React, {useState, useRef} from 'react';
import {TextField, Container, Box, Grid, Button, Typography } from '@mui/material';
import { createPortal } from 'react-dom';
import Tooltip from './tooltip.jsx';
import theme from '../theme.jsx';

interface Props {
  envSetup: {
    setApiKey: React.Dispatch<React.SetStateAction<string>>;
    apiKey: string;
    openSignup: boolean;
    setOpenSignup: React.Dispatch<React.SetStateAction<boolean>>;
    setGrafUrl: React.Dispatch<React.SetStateAction<string>>;
    grafUrl: string;
    setOpenSuccessfulSignup: React.Dispatch<React.SetStateAction<boolean>>;
  }
}

const urlText = 'Please enter exactly in the form of http://localhost:XXXX/ or http://[IP ADDRESS]/ or http://[URL]/ . Please do not add anything after the final slash';
const apiText = 'You can find your Grafana API key under the configuration gear in your Grafana account.';



const SignupModal = ({envSetup} : Props) => {
  const [signupValues, setSignupValues] = useState({
    username: '',
    password: '',
    verifyPassword: '',
    email: '',
    organization: '',
    jobTitle: '',
  }); 
  
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [currentApi, setCurrentApi] = useState(envSetup.apiKey);
  const [currentGrafUrl, setCurrentGrafUrl] = useState(envSetup.grafUrl);

  const height = (envSetup.apiKey && envSetup.grafUrl) ? '45%' : '56%';


  const verifyRef = useRef<HTMLInputElement>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(signupValues.password !== signupValues.verifyPassword) {
      verifyRef.current?.focus();
      return;
    }

    const body = {
      ...signupValues
    };

    envSetup.setOpenSuccessfulSignup(true);


    // const result = await fetch('/user/signupAdmin', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(body),
    // });

    // if(result.status !== 200) {
    //   setInvalid(true);
    //   return;
    // }

    // if(result.status == 200) {
    //   setSignupSuccess(true);
    //   envSetup();
    //   return;
    // }
  };



  return (

    createPortal(
      <Container component="main" id="signup-modal">
        <Box component="form"
          id="signup-form" 
          height={height}
          onSubmit={(event) => handleSignup(event)}
        >
          <Grid container id="signup-container"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch', backgroundColor: 'white'},
              '& .MuiGrid-item': {display:'flex', alignItems:'center', justifyContent:'center'}}}
          >
            <Grid 
              item 
              xs={12}
              display='flex'
              textAlign='center'
              justifyContent='center'

            >
              <Typography><span id="signup-header">SIGNUP</span></Typography>
            </Grid>
            <Grid 
              item 
              xs={6}
            >
              <TextField 
                required
                variant='outlined'
                label="Username"  
                // labelClassName={}
                value={signupValues.username} 
                onChange={input => setSignupValues({...signupValues, username:input.target.value})} 
                  
              />
            </Grid>
            <Grid 
              item 
              xs={6}
            >
              <TextField
                type="password" 
                label="Password" 
                required
                value={signupValues.password} 
                onChange={input => setSignupValues({...signupValues, password:input.target.value})}  
                placeholder="Password"/>
            </Grid>
            <Grid 
              item
              xs={6}
            >
              <TextField 
                type="password" 
                required
                inputRef={verifyRef}
                label="Verify Password"
                value={signupValues.verifyPassword} 
                onChange={input => setSignupValues({...signupValues, verifyPassword:input.target.value})}  
                placeholder="Type password again"/>
            </Grid>
            <Grid item xs={6}>
              <TextField 
                required
                label="Email" 
                value={signupValues.email} 
                onChange={input => setSignupValues({...signupValues, email:input.target.value})}  
                placeholder="Email"/>
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label="Organization" 
                required
                value={signupValues.organization} 
                onChange={input => setSignupValues({...signupValues, organization:input.target.value})}  
                placeholder="Organization"/>
            </Grid>
            <Grid 
              item 
              xs={6}
            >
              <TextField
                label="Job Title" 
                required
                value={signupValues.jobTitle} 
                onChange={input => setSignupValues({...signupValues, jobTitle:input.target.value})}  
                placeholder="Job title"/>
            </Grid>
            {!envSetup.grafUrl && <Grid 
              item 
              xs={6}
              display='flex'
            >
              <TextField
                type="text" 
                label="Grafana URL" 
                required
                className="env-text-field"
                value={currentGrafUrl} 
                onChange={input => setCurrentGrafUrl(input.target.value)} 
                placeholder="Grafana URL"/>
              <Tooltip text={urlText}/>
            </Grid>}
            {!envSetup.apiKey && <Grid 
              item 
              xs={6}
              display="flex"
            >
              <TextField
                type="text" 
                label="Grafana API key" 
                className="env-text-field"
                required
                value={currentApi} 
                onChange={input => setCurrentApi(input.target.value)} 
                placeholder="Grafana API key"/>
              <Tooltip text={apiText}/>
            </Grid>}
            <Grid 
              item
              xs={6}
              sx={{'& .MuiButton-root': { marginLeft: '10px', marginRight: '10px'}}}>
              <Button  
                variant="outlined"
                onClick={() => envSetup.setOpenSignup(false)}
              >CANCEL</Button>
              <Button 
                type="submit" 
                variant="contained"
              >SIGNUP</Button>
            </Grid>
          </Grid>
        </Box>
        
      </Container>, document.body)
  );
};

export default SignupModal;