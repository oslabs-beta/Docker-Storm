import { ipcMain } from 'electron/main';
import React, {useEffect, useState} from 'react';
import { Job, JobArray, Target, TargetIpArray, Role } from '../../types.js';
import {ImageList, TextField, Select, MenuItem, Container, Box, createStyles, Grid, Button, Typography } from '@mui/material';
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
    marginLeft: '20px',
    marginRight: '20px', 
    paddingLeft: '20px',
    paddingRight: '20px',
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
    return (<Grid item xs={4} key={str} component="div" sx={{border: '1px solid #D3D3D3', borderRadius: '10px', backgroundColor:'#ffffff', padding:'20px 10px', margin:'0px 10px'}}>
      <Typography>{`IP Address: ${target.targets[0]}`}</Typography>
      <Typography>{`Job Name: ${target.labels.job}`}</Typography>
      <Typography>{`Role: ${target.labels.role}`}</Typography>
    </Grid>);
  });

  const style = {
    width: '100px'
  };


  return (
    <Box id="big-div" sx={{ display: 'flex', flexDirection: 'column', height:'100%'}}>
      <Box sx={{ margin: '10px 5%', height:'inherit'}}>
        <h2>Settings</h2>
        <Box sx={{backgroundColor:'#ffffff', height:'80%', borderRadius:'15px', padding:'0px 20px'}}>
          <Container component='form' onSubmit={(e) => e.preventDefault()} sx={{justifyItems:'center'}}>
            <Box display="flex" flexDirection="column">
              <Typography marginTop="30px"> UPDATE PASSWORD</Typography>
              <Box display="flex" flexDirection='row' sx={{alignItems: 'center'}}>
                <TextField type="password" placeholder='Current Password' value={password} onChange={input => setPassword(input.target.value)} />
                <TextField type="password" placeholder='New Password' value={newPassword} onChange={input => setNewPassword(input.target.value)} />
                <TextField type="password" placeholder='New Password' value={verifyPassword} onChange={input => setVerifyPassword(input.target.value)} />
                <Button sx={styles.buttonStyles} type="submit" disabled={!password || !newPassword || !verifyPassword} onClick={() => changePassword()}>SUBMIT</Button>
              </Box>
            </Box>
            {pwAdded && <div>Changed password!</div>}
        
          </Container>
          <Container component="form" onSubmit={(e) => e.preventDefault()}>
            <Box display="flex" flexDirection="column" marginTop="20px">
              <Typography marginTop="30px">ADD A TARGET</Typography>
              <Box display="flex" flexDirection="row" sx={{alignItems: 'center'}}>
                <TextField type="text" placeholder='Ip Address' value={ip} onChange={input => setIp(input.target.value)} />
                <TextField type="text" placeholder='Port(s) by comma' value={ports} onChange={input => setPorts(input.target.value)} />
                <TextField type="text" placeholder='Job Name' value={job} onChange={input => setJob(input.target.value)} />
                <Select name="Role" value={role}  onChange={input => setRole(input.target.value as Role)}>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Worker">Worker</MenuItem>
                  <MenuItem value="Daemon">Daemon</MenuItem>
                  <MenuItem value="Overall">Overall</MenuItem>
                </Select>
                <Button type="submit" sx={styles.buttonStyles} disabled={!job || !role || !ip} onClick={() => addTarget()}>SUBMIT</Button>
              </Box>
            </Box>
          </Container>
          {added && <div>Added node!</div>}
      
          <Box display="flex" flexDirection="column" sx={{width:'70vw', marginTop:'50px', paddingLeft:'15px'}}>
            <Typography>LIST OF TARGETS:</Typography>
            <ImageList sx={{width:'100%', margin:'20 10px', gridAutoFlow: 'column', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr)) !important',
              gridAutoColumns: 'minmax(300px, 1fr)', overflowX:'scroll'}}>
              {targetMap}
            </ImageList>
          </Box>
        </Box>
      </Box>
    </Box>





  );
};

export default Settings;