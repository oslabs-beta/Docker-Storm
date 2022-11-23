import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Settings from './pages/settings.jsx';
import Metrics from './pages/metrics.jsx';
import Swarms from './pages/swarms.jsx';
import Users from './pages/users.jsx';
import RenderViews from './RenderViews.jsx';
const Navbar = () => {
    return (<div className="navbar">
            <div className="links">
                <ul>
                    <li>
                        <Link to='/settings'>
                            <p>Settings</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/users'>
                            <p>Users</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/swarms'>
                            <p>Swarms</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/metrics'>
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
                <Route path="/home" element={<RenderViews />}/>
                <Route path='/settings' element={<Settings />}/>
                <Route path='/metrics' element={<Metrics />}/>
                <Route path='/users' element={<Users />}/>
                <Route path='/swarms' element={<Swarms />}/>
            </Routes>





        </div>);
};
export default Navbar;
