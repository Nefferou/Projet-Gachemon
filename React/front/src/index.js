import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './SCSS/index.scss';
import Login from './Page/Login';
import Register from './Page/Register';
import App from './App';
import theme from './theme';

import { ThemeProvider } from '@material-ui/core/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
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
  </ThemeProvider>
);


