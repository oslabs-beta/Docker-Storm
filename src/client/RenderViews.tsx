import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Settings from './pages/settings.jsx';
import Metrics from './pages/metrics.jsx';
import Swarms from './pages/swarms.jsx';
import Users from './pages/users.jsx';

interface Props {
  ApiKey: string;
}

const clickedStyle = {
  color: '#ffffff',
  borderLeft: '#e1e4e6 8px solid',


}

const RenderViews = (props: Props) => {

  return (
    <>
      <div id="all-seeing-div">
        <div className="navbar">
          <h1>DOCKER STORM</h1>
          <div className="links">
            <ul>
              <li>
                <Link to='/app/settings'>
                  Settings
                </Link>
              </li>
              <li>
                <Link to='/app/users'>
                  Users
                </Link>
              </li>
              <li>
                <Link to='/app/swarms'>
                  Swarms
                </Link>
              </li>
              <li>
                <Link to='/app/metrics'>
                  Metrics
                </Link>
              </li>
              <li>
                <Link to='/'>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Routes>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/metrics' element={<Metrics ApiKey={props.ApiKey} />}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/swarms' element={<Swarms/>}/>
        </Routes>





        
      </div>
    </>
  );
};

export default RenderViews;