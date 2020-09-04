import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/People';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import SearchIcon from '@material-ui/icons/Search';
import InboxIcon from '@material-ui/icons/Inbox';
import HelpIcon from '@material-ui/icons/Help';
import  { Avatar } from '@material-ui/core'
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        { /* Avatars for logged in user | for us we gonna do the # icon */ }
        {/* <Avatar
          className="header__avatar"
          alt="Display name"
          src=""
        ></Avatar> */}
        { /* Time | for us we gonna show the channel name */ }
        { /* Show mute button? Show pinned messages? Toggle members list buttons? */ }
        <div>
          # Channel name goes here
        </div>
        <div className="header__iconGroup">
          <NotificationsIcon></NotificationsIcon>
          <BookmarkIcon></BookmarkIcon>
          <PeopleIcon></PeopleIcon>
        </div>
      </div>
      <div className="header__right">
        <div className="header__search">
          <input placeholder="Search Datcord"></input>
          <SearchIcon className="header_searchIcon"></SearchIcon>
        </div>
        <InboxIcon></InboxIcon>
        <HelpIcon></HelpIcon>
      </div>
    </div>
  )
}

export default Header
