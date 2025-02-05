import React from 'react';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import MetricPage from '../MetricPage/MetricPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/metric' element={<MetricPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
