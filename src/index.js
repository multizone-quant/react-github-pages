import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'firebase/firestore'
import { initializeApp } from "firebase/app";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Initialize Firebase for client
initializeApp({
  projectId: process.env.REACT_APP_projectId,
});

/*
// Initialize Firebase for server
firebase.initializeApp({ 
//  apiKey: process.env.REACT_APP_apiKey,
  apiKey: '',
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
})
*/
