import React, { useState, useEffect } from 'react';
import './Sidebar.scss';
import db from './firebase';


function Sidebar() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    // Run this code ONCE when the sidebar component loads
    db.collection('rooms').onSnapshot(snapshot => (
      setServers(
        snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          serverImage: doc.data().serverImage,
        })))
    ));
  }, [])

  return (
    <div className="sidebar">
      Channels go here
      {servers.map(server => (
        <div>
          {/* {server.id} */}
          {server.name}
          <img src={server.serverImage}></img>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
