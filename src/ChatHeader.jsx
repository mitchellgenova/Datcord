import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationRoundedIcon from '@material-ui/icons/EditLocationRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import './ChatHeader.scss'

function ChatHeader({channelName}) {

  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3 className="chatHeader__channelNameContainer">
          <span className="chatHeader__hash">
            #
          </span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeader__right">
        <NotificationsIcon className="chatHeader__icon" />
        <EditLocationRoundedIcon className="chatHeader__icon" />
        <PeopleAltRoundedIcon className="chatHeader__icon" />

        <div className="chatHeader__search">
          <input className="chatHeader__searchInput" placeholder="Search"/>
          <SearchRoundedIcon />
        </div>

        <SendRoundedIcon className="chatHeader__icon" />
        <HelpRoundedIcon className="chatHeader__icon" />
      </div>
    </div>
  )
}

export default ChatHeader
