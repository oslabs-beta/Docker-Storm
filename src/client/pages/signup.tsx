import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {TextField, Container, Box, createStyles, Grid, Button } from '@mui/material';
import theme from '../theme.jsx';



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
    if(!usernameSignup || !passwordSignup || !verifyPasswordSignup || !emailSignup || !organization) {
      setInvalid(true);
    }
    
    if(passwordSignup !== verifyPasswordSignup) {
      return;
    }
    

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
                  <Grid 
                    item 
                    
                    xs={12}
                  >
                    <TextField 
                      type="text" 
                      required
                      fullWidth
                      label="Email" 
                      value={emailSignup} 
                      onChange={input => setEmailSignup(input.target.value)} 
                      placeholder="Email"/>
                  </Grid>
                  <Grid
                    item 
                    className="signup-grid"
                    xs={12}
                  >
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



// <div id="signup-form-div">
//   <form id="signup-form" onSubmit={(event) => event.preventDefault()}>
//     <label> Username
//       <TextField className="signup-form-input" type="text" value={usernameSignup} onChange={input => setUsernameSignup(input.target.value)} placeholder="Username"/>
//     </label>
//     <label> Password
//       <TextField className="signup-form-input" type="password" value={passwordSignup} onChange={input => setPasswordSignup(input.target.value)} placeholder="Password"/>
//     </label>
//     <label> Verify Password
//       <TextField className="signup-form-input" type="password" value={verifyPasswordSignup} onChange={input => setVerifyPasswordSignup(input.target.value)} placeholder="Type password again"/>
//     </label>
//     <label> Email
//       <TextField className="signup-form-input" type="text" value={emailSignup} onChange={input => setEmailSignup(input.target.value)} placeholder="Email"/>
//     </label>
//     <label> Organization
//       <TextField className="signup-form-input" type="text" value={organization} onChange={input => setOrganization(input.target.value)} placeholder="Organization"/>
//     </label>
//     <label> Job Title
//       <TextField className="signup-form-input" type="text" value={jobTitle} onChange={input => setJobTitle(input.target.value)} placeholder="Job title"/>
//     </label>
//     <button className="blue-button" type="submit" onClick={() => createAdminUser()}>Signup</button>
//     {invalid && <p className="error-p">Please fill out all fields</p>}
//     <button id="signup" onClick={() => { props.setOpenSignup(false); }}>Cancel</button>
//   </form>
            
            
// </div>;


// InputLabelProps={{
//   sx: { 
//     paddingBottom: '500px', 
//     color:'red',
//     '&::placeholder': {
//       textAlign: 'right !important',
//     },
//   }, 
// }}