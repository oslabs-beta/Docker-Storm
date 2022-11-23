import React from 'react';
import {useState, useContext} from 'react'; 



// interface Props {
// }


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function confirmCredentials(){
    const body = {
      username: username,
      password: password
    };
    
    fetch('/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    })
      .then((result) => {
        if(result.status === 200)
          alert('success');
        else
          alert('Invalid Password!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input type="text" 
        value={username} 
        onChange={input => setUsername(input.target.value)} 
        placeholder="username"></input>
      <input type="text" 
        value={password} 
        onChange={input => setPassword(input.target.value)} 
        placeholder="password"></input>
      <button type="submit" onClick={confirmCredentials}>LOGIN</button>
    </form>
  );
};



export default Login;