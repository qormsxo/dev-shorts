import React from 'react';
import ReactDOM from 'react-dom/client';
import { Popup } from './pages/popup';
import './styles/tailwind.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);