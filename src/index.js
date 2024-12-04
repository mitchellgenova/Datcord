import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import Providers from './app/Providers';

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
);

