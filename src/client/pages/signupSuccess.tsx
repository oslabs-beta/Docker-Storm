import React from 'react';
import { createPortal } from 'react-dom';
import {Container, Box, Typography, Button} from '@mui/material';

interface Props {
  setOpenSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccessfulSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupSuccess = ({setOpenSignup, setOpenSuccessfulSignup} : Props) => {
  return (
    createPortal(
      <Container component="main" id="signup-modal">
        <Box id="signup-confirm">
          <Typography>Account created. Please login!</Typography>
          <Button variant='outlined' 
            size="medium" 
            onClick={() => {
              setOpenSignup(false); 
              setOpenSuccessfulSignup(false);
            }}>Close</Button>
        </Box>
      </Container>, 
      document.body
    )
  );
};

export default SignupSuccess;