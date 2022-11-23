import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import React from 'react';
const App = () => {
    return (<BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
      </Routes>
    </BrowserRouter>);
};
export default App;
