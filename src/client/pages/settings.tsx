import { ipcMain } from 'electron/main';
import React, {useEffect, useState} from 'react';
import { Job, JobArray, Target, TargetIpArray, Role } from '../../types.js';
import {TextField, Select, MenuItem, Container, Box, createStyles, Grid, Button, Typography } from '@mui/material';
import theme from '../theme.jsx';



interface Props {
  targetsArr: Target[];
  setTargetsArr: React.Dispatch<React.SetStateAction<Target[]>>;
}

interface Body {
  panelTitles: Job[],
  expr: string;
  panelType: string;
}

const styles = {
  buttonStyles: {
    marginTop: '10px', 
    border: theme.palette.primary.main,
    borderStyle: 'solid',
    backgroundColor: theme.palette.primary.main, 
    '&:hover': {
      backgroundColor: 'white',
      color: theme.palette.primary.main,
      
    },
    color: 'white'
  },

  gridStyles: {
    width: '50%',
    margin: '0px'
  },
  
};


const Settings = (props : Props) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [job, setJob] = useState('');
  const [role, setRole] = useState<Role>('Manager');
  const [ip, setIp] = useState('');
  const [ports, setPorts] = useState('');
  const [added, setAdded] = useState(false);
  const [pwAdded, setPwAdded] = useState(false);

  function changePassword(){
    if(newPassword !== verifyPassword){
      alert('Both new passwords need to be the same');
    }
    else{
      const body = {password, newPassword};
      fetch('/user', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      })
        .then((result) => {
          if(result.status === 400)
            alert('Invalid current password');
          else{
            setPassword('');
            setNewPassword('');
            setVerifyPassword('');
            setPwAdded(true);
          }
        });
    }
  }

  function addTarget() {
    const portArr: string[] = ports.split(/[ ,]+/).filter(Boolean);
    const ipArr: string[] = [];
    portArr.forEach((portElem: string) => {
      ipArr.push(`${ip}:${portElem}`);
    });
    
    const obj : Target = {
      targets: ipArr,
      labels:  {
        job: job,
        role: role
      } 
    }; 
    props.setTargetsArr([...props.targetsArr, obj]);
    setAdded(true);
    

    // could maybe add type validation here 
    fetch('/graf/targetsAdd', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    });

    const body: Body = {
      panelTitles: [
        {job: job, role: role}
      ],
      panelType: 'gauge',
      expr: '100 - (avg(irate(node_cpu_seconds_total{mode=\'idle\', job=<jobname>}[1m])) * 100)'
    };

    fetch('/metric/genPanel', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then((data) => data.json())
      .then((result) => {
        fetch('/graf/', {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(result)
        });
      });

    setJob('');
    setRole('Manager');
    setIp('');
    setPorts('');
  }




  const targetMap = props.targetsArr.map((target) => {
    const str = `${target.targets[0]} ${target.labels.job} ${target.labels.role}`;
    return (<Grid item xs={4} key={str} component="div" sx={{borderStyle: 'solid', borderRadius: '10px',borderColor:'black'}}>
      <Typography>{`IP Address: ${target.targets[0]}`}</Typography>
      <Typography>{`Job Name: ${target.labels.job}`}</Typography>
      <Typography>{`Role: ${target.labels.role}`}</Typography>

    </Grid>);
  });

  const style = {
    width: '100px'
  };


  return (
    <Box>
      <Typography marginTop="30px" align="center"> UPDATE PASSWORD</Typography>
      <Container component='form' onSubmit={(e) => e.preventDefault()} sx={{justifyItems:'center'}}>
        <Box display="flex" flexDirection="column" alignItems="center" marginTop="20px">
          <Box display="flex" justifyContent="center">
            <TextField type="password" placeholder='Current Password' value={password} onChange={input => setPassword(input.target.value)} />
            <TextField type="password" placeholder='New Password' value={newPassword} onChange={input => setNewPassword(input.target.value)} />
            <TextField type="password" placeholder='New Password' value={verifyPassword} onChange={input => setVerifyPassword(input.target.value)} />
          </Box>
          <Button sx={styles.buttonStyles} 
            type="submit" 
            disabled={!password || !newPassword || !verifyPassword} 
            onClick={() => changePassword()}>
            SUBMIT
          </Button>
        </Box>
        {pwAdded && <div>Changed password!</div>}
        
      </Container>
      <Typography marginTop="30px"align="center">ADD A TARGET</Typography>
      <Container component="form" onSubmit={(e) => e.preventDefault()}>
        <Box display="flex" flexDirection="column" alignItems="center" marginTop="20px">
          <Box display="flex" flexDirection="row" >
            <TextField type="text" placeholder='Ip Address' value={ip} onChange={input => setIp(input.target.value)} />
            <TextField type="text" placeholder='Port(s) by comma' value={ports} onChange={input => setPorts(input.target.value)} />
            <TextField type="text" placeholder='Job Name' value={job} onChange={input => setJob(input.target.value)} />
          </Box>
          <Select name="Role" value={role} sx={{marginTop: '10px'}} onChange={input => setRole(input.target.value as Role)}>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Worker">Worker</MenuItem>
            <MenuItem value="Daemon">Daemon</MenuItem>
            <MenuItem value="Overall">Overall</MenuItem>
          </Select>
          <Button type="submit" sx={styles.buttonStyles} disabled={!job || !role || !ip} onClick={() => addTarget()}>SUBMIT</Button>
        </Box>
      </Container>
      {added && <div>Added node!</div>}
      
      <Box display="flex" flexDirection="column" alignItems="center" margin="30px">
        <Typography>LIST OF TARGETS:</Typography>
        <Grid container spacing={1} sx={{width: '1fr', margin:'0px'}}>
          {targetMap}
        </Grid>
      </Box>

    </Box>





  );
};

export default Settings;