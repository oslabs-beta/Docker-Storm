import React, {useState} from 'react';
import {Typography, Container, Box, Grid, Button } from '@mui/material';
import SignupModal from './signupModal.jsx';
import SignupSuccess from './signupSuccess.jsx';

  




interface Props {
    setApiKey: React.Dispatch<React.SetStateAction<string>>;
    apiKey: string;
    openSignup: boolean;
    setOpenSignup: React.Dispatch<React.SetStateAction<boolean>>;
    setGrafUrl: React.Dispatch<React.SetStateAction<string>>;
    grafUrl: string;
    setOpenSuccessfulSignup: React.Dispatch<React.SetStateAction<boolean>>;
    openSuccessfulSignup: boolean;
}

// interface ResponseObject {
//     db: string;
//     key: string;
// }




const Signup = (props: Props) => { 

  // const envSetup = () => {
  //   const body = {
  //     apiKey: currentApi,
  //     grafUrl: currentGrafUrl
  //   };
    
  //   props.setApiKey(currentApi);
  //   props.setGrafUrl(currentGrafUrl);

  //   fetch('/user/env', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(body),
  //   });
  // };


  

  if(!props.openSuccessfulSignup) {
    return (
      <SignupModal envSetup={{...props} as Props}/>
    );
  } 

  return(
    <SignupSuccess setOpenSignup={props.setOpenSignup} setOpenSuccessfulSignup={props.setOpenSuccessfulSignup}/>
  );



  
};

export default Signup;