import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

import './Scss/index.scss';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<App />} />
        <Route path="/connect" element={<App />} />
        <Route path={"/*"} element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
