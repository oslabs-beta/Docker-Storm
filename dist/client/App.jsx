import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import React from 'react';
import RenderViews from './RenderViews.jsx';
const App = () => {
    return (<HashRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/app/*' element={<RenderViews />}/>
      </Routes>
    </HashRouter>);
};
export default App;
