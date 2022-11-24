import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import React from 'react';

const App: React.FC = (): JSX.Element => {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
      </Routes>
    </HashRouter>
  );
};

export default App;