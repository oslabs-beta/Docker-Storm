import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import React from 'react';
import RenderViews from './RenderViews.jsx';

const App = (): JSX.Element => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/app/*' element={<RenderViews/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
