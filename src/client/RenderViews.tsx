import React, {useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Settings from './pages/settings.jsx';
import Metrics from './pages/metrics.jsx';
import Swarms from './pages/swarms.jsx';
import Users from './pages/users.jsx';
import logo from '../../resources/logo-white.png'


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
                  style={select === '/app/settings' ? clickedStyle : null}
                  onClick={() => setSelect('/app/settings')}
                >
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
          <Route path='/metrics' element={<Metrics dashId={props.dashId} />}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/swarms' element={<Swarms/>}/>
        </Routes>





        
      </div>
    </>
  );
};

export default RenderViews;