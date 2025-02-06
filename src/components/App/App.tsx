import React from 'react';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import MetricPage from '../MetricPage/MetricPage';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
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
