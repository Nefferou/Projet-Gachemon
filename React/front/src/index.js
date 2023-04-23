import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { SessionProvider } from 'next-auth/react'

import './Scss/index.scss';
import Login from './Page/Login';
import Register from './Page/Register';
import App from './App';
import Profile from './Composants/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<SessionProvider><Profile/></SessionProvider>} />
          <Route path="/app" element={<SessionProvider><App /></SessionProvider>} />
          <Route path={"/*"} element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
);


