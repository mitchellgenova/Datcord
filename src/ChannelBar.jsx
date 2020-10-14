import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import ChannelBarChannel from './ChannelBarChannel';
import './ChannelBar.scss';
import { Avatar } from '@material-ui/core';

function ChannelBar() {
  return (
    <div class="channelBar">
      <div className="channelBar__top">
        <h3>Datcord</h3>
        <ExpandMoreIcon />
      </div>
      <div className="channelBar__channels">
        <div className="channelBar__channelsHeader">
          <div className="channelBar__header">
            <ExpandMoreIcon />
            <h4>Text channels</h4>
          </div>
          <AddIcon className="channelBar__addChannel"/>
        </div>
        <div className="channelBar__channelList">
          <ChannelBarChannel />
        </div>
      </div>

      <div className="channelBar__voice">
        <SignalCellularAltIcon className="channelBar__voiceIcon" fontSize="large" />
        <div className="channelBar__voiceInfo">
          <h3 class="channelBar__voiceStatus">Voice Connected</h3>
          <p className="channelBar__channelName">@ChannelName/Server</p>
        </div>

        <div className="channelBar__voiceIcons">
          <InfoOutlinedIcon className="channelBar__icon" />
          <CallIcon className="channelBar__icon" />
        </div>
      </div>

      <div className="channelBar__profile">
        <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Osteolaemus_tetraspis_-_Karlsruhe_Zoo_01.jpg/500px-Osteolaemus_tetraspis_-_Karlsruhe_Zoo_01.jpg" />
        <div className="channelBar__profileInfo">
          <h3 className="channelBar__profileUsername">@Mitchell</h3>
          <p>#thisIsMyId</p>
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