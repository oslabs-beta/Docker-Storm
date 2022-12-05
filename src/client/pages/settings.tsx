import { ipcMain } from 'electron/main';
import React, {useEffect, useState} from 'react';
import { Job, JobArray, Target, TargetIpArray, Role } from '../../types.js';





const Settings = () => {
  const[password, setPassword] = useState('');
  const[newPassword, setNewPassword] = useState('');
  const[verifyPassword, setVerifyPassword] = useState('');
  const[job, setJob] = useState('');
  const[role, setRole] = useState<Role>('Manager');
  const[ip, setIp] = useState('');
  const[targetsArr, setTargetsArr] = useState<Target[]>([]);
  const[added, setAdded] = useState(false);

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
    const obj : Target = {
      targets: [ip],
      labels:  {
        job: job,
        role: role
      } 
    }; 

    setTargetsArr([...targetsArr, obj]);
    setAdded(true);
    

    // could maybe add type validation here 
    fetch('/graf/targetsAdd', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    });

    setJob('');
    setRole('Manager');
    setIp('');

    return;
  }

  useEffect(() => {
    fetch('/metric/')
      .then((data) => data.json())
      .then((result) => {
        const arr = makeTargetArray(result.jobs, result.targets);
        setTargetsArr(arr);
      });
  }, []);


  const makeTargetArray = (jobs: Job[], ips: string[]) : Target[] => {
    const result: Target[] = [];
    for(let i = 0; i < jobs.length; i++) {
      const obj: Target = {
        targets: [ips[i]],
        labels: {
          job: jobs[i].job,
          role: jobs[i].role
        }
      };
      result.push(obj);
    }
    return result;
  };



  // probably should add styling to this
  // probably could add a delete button
  // key doesn't work if there are duplicates
  const targetMap = targetsArr.map((target) => {
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
        <input type="text" placeholder='Job Name' value={job} onChange={input => setJob(input.target.value)} />
        <select name="Role" value={role} style={style} onChange={input => setRole(input.target.value as Role)}>
          <option value="Manager">Manager</option>
          <option value="Worker">Worker</option>
          <option value="Daemon">Daemon</option>
          <option value="Overall">Overall</option>
        </select>
        <button type="submit"  onClick={() => addTarget()}>SUBMIT</button>
      </form>
      {added && <div>Added node!</div>}

      <p>LIST OF ALL TARGETS</p>
      {targetMap}

    </div>





  );
};

export default Settings;