import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './Scss/index.scss';
import Login from './Page/Login';
import Register from './Page/Register';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<App />} />
          <Route path={"/*"} element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
);


