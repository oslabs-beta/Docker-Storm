import React, {useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Settings from './pages/settings.jsx';
import Metrics from './pages/metrics.jsx';
import Swarms from './pages/swarms.jsx';
import Users from './pages/users.jsx';
import {Box} from '@mui/material';
import logoWhite from '../../resources/media/logo-white.png';
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
      <Box display="flex" flexDirection="row" sx={{backgroundColor:'#091931', width: '100%'}}>
        <div className="navbar">
          <img id="navbar-logo" src={logoWhite} alt="" />
          {/* <ul> */}
          <li>
            <Link to='/app/metrics'>
                  Metrics
            </Link>
          </li>
          <li>
            <Link 
              to='/app/settings'
              // style={select === '/app/settings' ? clickedStyle : null}
              // onClick={() => setSelect('/app/settings')}
            >
                  Settings
            </Link>
          </li>
          <li>
            <Link to='/app/users'>
                  Users
            </Link>
          </li>
          <li id="logout">
            <Link to='/'>
                  Logout
            </Link>
          </li>
          {/* </ul> */}
        </div>
        <Box sx={{backgroundColor:'white', width: '100%', borderRadius: '40px'}}>
          <Routes>
            <Route path='/settings' element={<Settings targetsArr={props.targetsArr} setTargetsArr={props.setTargetsArr} />}/>
            <Route path='/metrics' element={<Metrics dashId={props.dashId} grafUrl={props.grafUrl} />}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/swarms' element={<Swarms/>}/>
          </Routes>
        </Box>





        
      </Box>
    </>
  );
};

export default RenderViews;