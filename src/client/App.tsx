import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import React from 'react';

const App = (): JSX.Element => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
