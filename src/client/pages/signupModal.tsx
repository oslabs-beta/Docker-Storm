import React, {useState, useRef} from 'react';
import {TextField, Container, Box, Grid, Button, Typography } from '@mui/material';
import { createPortal } from 'react-dom';
import Tooltip from './tooltip.jsx';
import theme from '../theme.jsx';
import { QueryClient, useQueryClient, QueryCache } from '@tanstack/react-query';
import {cacheData} from '../../types.js';


interface Props {
  envSetup: {
    openSignup: boolean;
    setOpenSignup: React.Dispatch<React.SetStateAction<boolean>>;
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
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['cache']) as cacheData;
  const setupInfo = useRef<HTMLFormElement>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const height = (data.apiKey && data.grafUrl) ? '45%' : '56%';


  const verifyRef = useRef<HTMLInputElement>(null);

  const setConst = (gUrl:string, aKey:string) => {

    const body = {
      apiKey: gUrl,
      grafUrl: aKey
    };
    
    console.log(body);

    queryClient.setQueryData(['cache'], {grafUrl: gUrl, apiKey: aKey});
  
    fetch('/user/env', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body),
    });
  };



  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newGrafUrl = (setupInfo.current?.['graf-url']?.value);
    const newApiKey = (setupInfo.current?.['api-key']?.value);

    if(signupValues.password !== signupValues.verifyPassword) {
      verifyRef.current?.focus();
      return;
    }


    const body = {
      ...signupValues,
    };

    envSetup.setOpenSuccessfulSignup(true);


    const result = await fetch('/user/signupAdmin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });
    

    if(result.status !== 200) {
      // setInvalid(true);
      return;
    }

    if(result.status === 200) {
      setConst(newGrafUrl, newApiKey);
      setSignupSuccess(true);
      return;
    }
  };



  return (

    createPortal(
      <Container component="main" id="signup-modal">
        <Box component="form"
          id="signup-form" 
          height={height}
          ref={setupInfo}
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
            {!data.grafUrl && <Grid 
              item 
              xs={6}
              display='flex'
            >
              <TextField
                type="text" 
                label="Grafana URL" 
                required
                id='graf-url'
                className="env-text-field"
                placeholder="Grafana URL"/>
              <Tooltip text={urlText}/>
            </Grid>}
            {!data.apiKey && <Grid 
              item 
              xs={6}
              display="flex"
            >
              <TextField
                type="text" 
                label="Grafana API key" 
                className="env-text-field"
                id='api-key'
                required
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