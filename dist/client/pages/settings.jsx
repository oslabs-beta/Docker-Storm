import React, { useState } from 'react';
import Shay from '../../../resources/million-dollar-smile.png';
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
    return (<div className="page-wrapper" id="settings-page">
      <div className="page-inner-wrapper-div">
        <div id="setting-inner-container">
          <div id="setting-left">
            <div id="img-div">
              <div>
                <img src={Shay} id="user-img" alt=""/>
              </div>
              <div>
                <h3>Hi, shay.</h3>
              </div>
            </div>
            <div id="setting-menu-div">
              <ul>
                <li id="selected">Account Settings</li>
                <li>Application Settings</li>
                <li>Notifications</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div id="setting-right">
            <span className="page-title-span"><h2 className='page-title dark-text'>Settings</h2></span>
            <h3>Change Account Settings</h3>
            <form id="fake-form" action="">
              <input type="text" placeholder='Name'/>
              <input type="text" placeholder='Email'/>
              <input type="text" placeholder='Phone Number'/>
              <input type="text" placeholder='Company'/>
            </form>
            <form id="setting-form" onSubmit={(e) => e.preventDefault()}>
              <input type="password" placeholder='Current Password' value={password} onChange={input => setPassword(input.target.value)}/>
              <input type="password" placeholder='New Password' value={newPassword} onChange={input => setNewPassword(input.target.value)}/>
              <input type="password" placeholder='New Password' value={verifyPassword} onChange={input => setVerifyPassword(input.target.value)}/>
              <div id="submit-div"><button type="submit" id="settings-submit-btn" className="blue-button" onClick={() => changePassword()}>Change Password</button></div>
            </form>
          </div>
        </div>
      </div>
    </div>);
};
export default Settings;
