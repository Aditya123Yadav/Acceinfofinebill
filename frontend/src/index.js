import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import logo1 from '../src/Components/assests/logo1.png'
import reportWebVitals from './reportWebVitals';
<link href="https://fonts.googleapis.com/css?family=Bungee+Inline" rel="stylesheet"></link>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
