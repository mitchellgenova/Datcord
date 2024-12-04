import React, { useState, useEffect } from 'react';
import './Sidebar.scss';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import db from '../../config/firebase';
import ServerButton from './ServerButton/ServerButton';


function Sidebar() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    // Run this code ONCE when the sidebar component loads
    db.collection('servers').onSnapshot(snapshot => (
      setServers(
        snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          serverImage: doc.data().serverImage,
        })))
    ));
  }, [])

  const handleAddServer = () => {
    const serverName = prompt('Enter a new server name');

    if (serverName) {
      db.collection('servers').add({
        name: serverName,
      })
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar__serverContainer">
        {servers.map(server => (
          <ServerButton key={server.id} name={server.name} id={server.id} image={server.serverImage} />
        ))}
        <AddCircleOutlineRoundedIcon className="sidebar__addServerIcon" onClick={handleAddServer}/>
      </div>
    </div>
  )
}

export default Sidebar
