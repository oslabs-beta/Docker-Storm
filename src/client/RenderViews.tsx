import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Settings from './pages/settings.jsx';
import Metrics from './pages/metrics.jsx';
import Users from './pages/users.jsx';
import {Box} from '@mui/material';
import logoWhite from '../../resources/media/logo-white.png';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined.js';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined.js';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined.js';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined.js';
import { Job, JobArray, Target, TargetIpArray, Role } from '../types.js';


interface Props {
  dashId: string;
  targetsArr: Target[];
  setTargetsArr: React.Dispatch<React.SetStateAction<Target[]>>;
  grafUrl: string;
}


const RenderViews = (props: Props) => {

  return (
    <>
      <Box display="flex" flexDirection="row" sx={{backgroundColor:'#091931', width: '100%', paddingLeft: '20px'}}>
        <div className="navbar">
          <img id="navbar-logo" src={logoWhite} alt="" />
          <li>
            <Link to='/app/metrics'>
              <EqualizerOutlinedIcon sx={{marginRight:'15px'}}/>
                  Metrics
            </Link>
          </li>
          <li>
            <Link 
              to='/app/settings'>
              <SettingsOutlinedIcon sx={{marginRight:'15px'}}/>
                  Settings
            </Link>
          </li>
          <li>
            <Link to='/app/users'>
              <GroupOutlinedIcon sx={{marginRight:'15px'}}/>
                  Users
            </Link>
          </li>
          <li id="logout">
            <Link to='/'>
              <LogoutOutlinedIcon sx={{marginRight:'15px'}}/>
                  Logout
            </Link>
          </li>
        </div>
        <Box sx={{backgroundColor:'#F7F8FC', width: '100%', height:'100vh', borderRadius: '40px 0px 0px 40px', paddingTop: '30px'}}>
          <Routes>
            <Route path='/settings' element={<Settings targetsArr={props.targetsArr} setTargetsArr={props.setTargetsArr} />}/>
            <Route path='/metrics' element={<Metrics dashId={props.dashId} grafUrl={props.grafUrl} />}/>
            <Route path='/users' element={<Users/>}/>
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default RenderViews;