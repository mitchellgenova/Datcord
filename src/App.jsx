import React from 'react';
import './App.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import UserShortcuts from './UserShortcuts';

function App() {

  return (
    <div className="app">
      <Sidebar />
      <div className="app__container">
        <div className="app__header">
          <Header/>
        </div>
        <div className="app__body">
          <div className="app__bodyLeft">
            <UserShortcuts/>
          </div>
          {/* React-Router -> Chat screen */}
        </div>
      </div>
    </div>
  );
}

export default App;
