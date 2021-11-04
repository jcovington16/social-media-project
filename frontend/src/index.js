import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
<<<<<<< HEAD
import {BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
=======
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router } from 'react-router-dom';
>>>>>>> Bethany


ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

