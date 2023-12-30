import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { FailedLogin } from './components/FailedLogin';
import Home from './components/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/app' Component={App}/>
        <Route path='/fail_login' Component={FailedLogin} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);