import { ipcMain } from 'electron/main';
import React, {useEffect, useState} from 'react';
import { Job, JobArray, Target, TargetIpArray, Role } from '../../types.js';




interface Props {
  targetsArr: Target[];
  setTargetsArr: React.Dispatch<React.SetStateAction<Target[]>>;
}

interface Body {
  panelTitles: Job[],
  expr: string;
  panelType: string;
}


const Settings = (props : Props) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [job, setJob] = useState('');
  const [role, setRole] = useState<Role>('Manager');
  const [ip, setIp] = useState('');
  const [ports, setPorts] = useState('');
  const [added, setAdded] = useState(false);

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
    return (<div key={str}>
      <p>{target.targets[0]}</p>
      <p>{target.labels.job}</p>
      <p>{target.labels.role}</p>
      <br></br>
    </div>);
  });

  const style = {
    width: '100px'
  };


  return (
    <div>
      <p data-testid="update-pw"> UPDATE PASSWORD</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="password" placeholder='Current Password' value={password} onChange={input => setPassword(input.target.value)} />
        <input type="password" placeholder='New Password' value={newPassword} onChange={input => setNewPassword(input.target.value)} />
        <input type="password" placeholder='New Password' value={verifyPassword} onChange={input => setVerifyPassword(input.target.value)} />
        <button type="submit" onClick={() => changePassword()}>SUBMIT</button>
        <br></br>
        
      </form>
      <p>ADD A TARGET</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder='Ip Address' value={ip} onChange={input => setIp(input.target.value)} />
        <input type="text" placeholder='Port(s) by comma' value={ports} onChange={input => setPorts(input.target.value)} />
        <input type="text" placeholder='Job Name' value={job} onChange={input => setJob(input.target.value)} />
        <select name="Role" value={role} style={style} onChange={input => setRole(input.target.value as Role)}>
          <option value="Manager">Manager</option>
          <option value="Worker">Worker</option>
          <option value="Daemon">Daemon</option>
          <option value="Overall">Overall</option>
        </select>
        <button type="submit"  disabled={!job || !role || !ip} onClick={() => addTarget()}>SUBMIT</button>
      </form>
      {added && <div>Added node!</div>}

      <p>LIST OF ALL TARGETS</p>
      {targetMap}

    </div>





  );
};

export default Settings;