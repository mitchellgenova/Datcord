import React from 'react';
import './App.scss';
import Header from './Header';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="app__header">
        <Header/>
      </div>
      <div className="app__body">
        {/* React-Router -> Chat screen */}
      </div>
    </div>
  );
}

export default App;
