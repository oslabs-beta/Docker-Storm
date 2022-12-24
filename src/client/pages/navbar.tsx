import React from 'react';
import { EqualizerOutlined, GroupOutlined, LogoutOutlined, SettingsOutlined } from '@mui/icons-material';
import logoWhite from '../../../resources/media/logo-white.png';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className="navbar">
      <img id="navbar-logo" src={logoWhite} alt="" />
      <li>
        <Link to='/app/metrics'>
          <EqualizerOutlined sx={{marginRight:'15px'}}/>
                  Metrics
        </Link>
      </li>
      <li>
        <Link 
          to='/app/settings'>
          <SettingsOutlined sx={{marginRight:'15px'}}/>
                  Settings
        </Link>
      </li>
      <li>
        <Link to='/app/users'>
          <GroupOutlined sx={{marginRight:'15px'}}/>
                  Users
        </Link>
      </li>
      <li id="logout">
        <Link to='/'>
          <LogoutOutlined sx={{marginRight:'15px'}}/>
                  Logout
        </Link>
      </li>
    </div>
  );
};

export default Navbar;