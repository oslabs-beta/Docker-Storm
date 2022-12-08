import React, {useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Settings from './pages/settings.jsx';
import Metrics from './pages/metrics.jsx';
import Swarms from './pages/swarms.jsx';
import Users from './pages/users.jsx';
import { Job, JobArray, Target, TargetIpArray, Role } from '../types.js';

interface Props {
  dashId: string;
  targetsArr: Target[];
  setTargetsArr: React.Dispatch<React.SetStateAction<Target[]>>;
}


const RenderViews = (props: Props) => {

  return (
    <>
      <h1>DOCKER STORM</h1>
      <div className="navbar">
        <div className="links">
          <ul>
            <li>
              <Link to='/app/settings'>
                <p>Settings</p>
              </Link>
            </li>
            <li>
              <Link to='/app/users'>
                <p>Users</p>
              </Link>
            </li>
            <li>
              <Link to='/app/swarms'>
                <p>Swarms</p>
              </Link>
            </li>
            <li>
              <Link to='/app/metrics'>
                <p>Metrics</p>
              </Link>
            </li>
            <li>
              <Link to='/'>
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path='/settings' element={<Settings targetsArr={props.targetsArr} setTargetsArr={props.setTargetsArr} />}/>
          <Route path='/metrics' element={<Metrics dashId={props.dashId} />}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/swarms' element={<Swarms/>}/>
        </Routes>





      </div>
    </>
  );
};

export default RenderViews;