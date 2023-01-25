import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './pages/navbar.jsx';
import Settings from './pages/settings.jsx';
import Metrics from './pages/metrics.jsx';
import Users from './pages/users.jsx';
import {Box} from '@mui/material';
import logoWhite from '../../resources/media/logo-white.png';
import { EqualizerOutlined, GroupOutlined, LogoutOutlined, SettingsOutlined } from '@mui/icons-material';
import { Job, JobArray, Target, TargetIpArray, Role } from '../types.js';


interface Props {
  dashId: string;
  targetsArr: Target[];
  setTargetsArr: React.Dispatch<React.SetStateAction<Target[]>>;
  grafUrl: string;
}


const RenderViews = ({dashId, targetsArr, setTargetsArr, grafUrl}: Props) => {

  return (
    <Box display="flex" flexDirection="row" sx={{backgroundColor:'#091931', width: '100%', paddingLeft: '20px'}}>
      <Navbar/>
      <Box sx={{backgroundColor:'#F7F8FC', width: '100%', height:'100vh', borderRadius: '40px 0px 0px 40px', paddingTop: '30px'}}>
        <Routes>
          <Route path='/settings' element={<Settings targetsArr={targetsArr} setTargetsArr={setTargetsArr} />}/>
          <Route path='/metrics' element={<Metrics dashId={dashId} />}/>
          <Route path='/users' element={<Users/>}/>
        </Routes>
      </Box>
    </Box>
  );
};

export default RenderViews;