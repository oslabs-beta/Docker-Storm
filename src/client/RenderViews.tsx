import React, {useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Settings from './pages/settings.jsx';
import Metrics from './pages/metrics.jsx';
import Swarms from './pages/swarms.jsx';
import Users from './pages/users.jsx';
import logo from '../../resources/logo-white.png';
import settingsIcon from '../../resources/icons/settings-icon.png';
import userIcon from '../../resources/icons/user-icon.png';
import swarmIcon from '../../resources/icons/swarm-icon.png';
import metricsIcon from '../../resources/icons/metrics-icon.png';
import logoutIcon from '../../resources/icons/logout-icon.png';




interface Props {
  dashId: string;
}

interface style {
  color: string | null;
  borderLeft: string | null;
}

const clickedStyle: style | null = {
  color: '#ffffff',
  borderLeft: '#e1e4e6 8px solid',
  
}


const RenderViews = (props: Props) => {
  const [ select, setSelect ] = useState('/');

  return (
    <>
      <div id="all-seeing-div">
        <div className="navbar">
          <img id="menu-logo" src={logo} alt="" />
          <div className="links">
            <ul>
              <li>
                <Link 
                  to='/app/settings'
                  // style={select === '/app/settings' ? clickedStyle : null}
                  // onClick={() => setSelect('/app/settings')}
                >
                  <img className="menu-icon" src={settingsIcon} alt="" />
                  Settings
                </Link>
              </li>
              <li>
                <Link to='/app/users'>
                  <img className="menu-icon" src={userIcon} alt="" />
                  Users
                </Link>
              </li>
              <li>
                <Link to='/app/swarms'>
                  <img className="menu-icon" src={swarmIcon} alt="" />
                  Swarms
                </Link>
              </li>
              <li>
                <Link to='/app/metrics'>
                  <img className="menu-icon" src={metricsIcon} alt="" />
                  Metrics
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <img className="menu-icon" src={logoutIcon} alt="" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Routes>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/metrics' element={<Metrics dashId={props.dashId} />}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/swarms' element={<Swarms/>}/>
        </Routes>





        
      </div>
    </>
  );
};

export default RenderViews;