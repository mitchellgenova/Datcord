import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { selectChannelName, setServerInfo } from './features/appSlice';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import ChannelBarChannel from './ChannelBarChannel';
import { useSelector } from "react-redux";
import { selectUser } from './features/userSlice';
import { Avatar } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './ChannelBar.scss';
import db, { auth } from './firebase';
import Ping from 'ping.js';
import { selectServerName, selectSeverId } from './features/appSlice';

let ping = 0;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function ChannelBar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const serverName = useSelector(selectServerName);
  const channelName = useSelector(selectChannelName);
  const serverId = useSelector(selectSeverId);
  const [channels, setChannels] = useState([]);
  const [isShown, setIsShown] = useState(false);
  
  var p = new Ping();
  p.ping("https://firebase.google.com/", (err, data) => {
    if(err) {
      console.log("error loading resource", err);
    }
    console.log(data);
    ping = data;
  });

  // Gets the channels for the specified server
  useEffect(() => {
    if (serverId) {
      db.collection('servers').doc(serverId).collection('channels').onSnapshot(snapshot =>
        setChannels(
          snapshot.docs.map(doc => ({
            id: doc.id,
            channel: doc.data(),
          }))
        )
      );
    }
  }, [serverId]);

  const handleAddChannel = () => {
    const channelName = prompt('Enter a new channel name');

    if (channelName) {
      db.collection('servers').doc(serverId).collection('channels').add({
        channelName: channelName,
      })
    }
  }
  
  // Modal Functions
  const useStyles = makeStyles(() => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: 'var(--discord-color)',
      color: 'white',
      padding: 10,
      border: '1px solid #000000',
      borderRadius: 5,
    },
  }));

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    if (serverId) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    db.collection('servers').doc(serverId).set({
      name: newServerName,
      serverImage: newServerImage,
    });
    dispatchServerInfo();
  }

  const dispatchServerInfo = () => {
    dispatch(
      setServerInfo({
        serverId: serverId,
        serverName: newServerName,
      }
    ))
  }

  let [newServerName, setNewServerName] = React.useState('');
  const handleServerNameChange = (event) => {
    setNewServerName(event.target.value);
  };

  let [newServerImage, setNewServerImage] = React.useState('');
  const handleServerImageChange = (event) => {
    setNewServerImage(event.target.value);
  };
  // End Modal Functions

  return (
    <div className="channelBar">
      <div className="channelBar__top">
        <h3>{serverName}</h3>
        <ExpandMoreIcon className="channelBar__modalExpand" onClick={handleOpen} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="channelBar__settingsForm" noValidate autoComplete="off">
              <label className="channelBar__settingsLabel" htmlFor="serverNameField">Enter New Server Name:</label>
              <TextField id="serverNameField" label="Server Name"  value={newServerName} onChange={handleServerNameChange} />
              <label className="channelBar__settingsLabel" htmlFor="serverImageField">Enter New Server Image:</label>
              <TextField id="serverImageField" label="Server Image" value={newServerImage} onChange={handleServerImageChange}/>
              <div className="channelBar__buttonContainer">
                <Button variant="contained" color="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div className="channelBar__channels">
        <div className="channelBar__channelsHeader">
          <div className="channelBar__header">
            <ExpandMoreIcon className="channelBar__expandIcon"/>
            <h4>Text channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="channelBar__addChannel"/>
        </div>
        <div className="channelBar__channelList">
          {channels.map(({id, channel}) => (
            <ChannelBarChannel key={id} id={id} channelName={channel.channelName} />
          ))}
        </div>
      </div>

      <div className="channelBar__voice">
        <SignalCellularAltIcon 
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          className="channelBar__voiceIcon" fontSize="large" />
            {isShown && (
              <div className="channelBar__pingLabel"
              >{ping}</div>
            )}
        <div className="channelBar__voiceInfo">
          <h3 className="channelBar__voiceStatus">Voice Connected</h3>
          <p className="channelBar__channelName">{`${channelName}/${serverName}`}</p>
        </div>

        <div className="channelBar__voiceIcons">
          <InfoOutlinedIcon className="channelBar__icon" />
          <CallIcon className="channelBar__icon" />
        </div>
      </div>

      <div className="channelBar__profile">
        <Avatar onClick={() => auth.signOut()} src={user.photo} className="channelBar__profileAvatar"/>
        <div className="channelBar__profileInfo">
          <h3 className="channelBar__profileUsername">{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className="channelBar__profileIcons">
          <MicIcon className="channelBar__icon" />
          <HeadsetIcon className="channelBar__icon" />
          <SettingsIcon className="channelBar__icon" />
        </div>
      </div>
    </div>
  )
}

export default ChannelBar