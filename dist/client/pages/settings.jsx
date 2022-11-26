import React, { useState } from 'react';
const Settings = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    function changePassword() {
        if (newPassword !== verifyPassword) {
            alert('Both new passwords need to be the same');
        }
        else {
            const body = { password, newPassword };
            fetch('/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
                .then((result) => {
                if (result.status === 400)
                    alert('Invalid current password');
                else {
                    setPassword('');
                    setNewPassword('');
                    setVerifyPassword('');
                }
            });
        }
    }
    return (<div>
      <p>UPDATE PASSWORD</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="password" placeholder='Current Password' value={password} onChange={input => setPassword(input.target.value)}/>
        <input type="password" placeholder='New Password' value={newPassword} onChange={input => setNewPassword(input.target.value)}/>
        <input type="password" placeholder='New Password' value={verifyPassword} onChange={input => setVerifyPassword(input.target.value)}/>
        <button type="submit" onClick={() => changePassword()}>SUBMIT</button>
      </form>

    </div>);
};
export default Settings;
