import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Settings from './pages/settings.jsx';
import Metrics from './pages/metrics.jsx';
import Swarms from './pages/swarms.jsx';
import Users from './pages/users.jsx';
import logoWhite from '../../resources/media/logo-white.png';
import { Target } from '../types.js';


interface Props {
  dashId: string;
  targetsArr: Target[];
  setTargetsArr: React.Dispatch<React.SetStateAction<Target[]>>;
  grafUrl: string;
}


const RenderViews = (props: Props) => {

  return (
    <>
      <div id="all-seeing-div">
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
        <Routes>
          <Route path='/settings' element={<Settings targetsArr={props.targetsArr} setTargetsArr={props.setTargetsArr} />}/>
          <Route path='/metrics' element={<Metrics dashId={props.dashId} grafUrl={props.grafUrl} />}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/swarms' element={<Swarms/>}/>
        </Routes>





        
      </div>
    </>
  );
};

export default RenderViews;