import React from 'react';
import './App.scss';
import ChannelBar from './ChannelBar';
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat';

function App() {

  return (
    <div className="app">
      <Sidebar />
      <ChannelBar />
      <Chat />
      {/* <div className="app__container">
        <div className="app__header">
          <Header/>
        </div>
        <div className="app__body">
          <div className="app__bodyLeft">
            <UserShortcuts/>
          </div>
          React-Router -> Chat screen
        </div>
      </div> */}
    </div>
  );
}

export default App;
