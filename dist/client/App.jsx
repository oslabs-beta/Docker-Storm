import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import React from 'react';
const App = () => {
    return (<HashRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
      </Routes>
    </HashRouter>);
};
export default App;
