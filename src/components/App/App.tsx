/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import MetricPage from '../MetricPage/MetricPage';
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../../assets/Icon/123.svg'

function App() {
  return (
    <div className='App'>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <a href='#'> 
            <img
              src={logo}
              alt="logo"
               style={{ height: '65px'}} 
            /> 
          </a>
          <li>
            <Link to="/metric">Metrics</Link>
          </li>
        </ul>
      </nav>

      <Routes >
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/metric' element={<MetricPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
