import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/People';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import SearchIcon from '@material-ui/icons/Search';
import InboxIcon from '@material-ui/icons/Inbox';
import HelpIcon from '@material-ui/icons/Help';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './Header.scss';

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        Server name goes here <ArrowDropDownIcon/>
      </div>
      <div className="header__middle">
        <div>
          # Channel name goes here
        </div>
        <div className="header__iconGroup">
          <NotificationsIcon/>
          <BookmarkIcon/>
          <PeopleIcon/>
        </div>
      </div>
      <div className="header__right">
        <div className="header__search">
          <input placeholder="Search"></input>
          <SearchIcon className="header_searchIcon"></SearchIcon>
        </div>
        <InboxIcon/>
        <HelpIcon/>
      </div>
    </div>
  )
}

export default Header
