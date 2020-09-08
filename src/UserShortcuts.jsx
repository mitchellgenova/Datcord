import React from 'react'
import  { Avatar } from '@material-ui/core'
import './UserShortcuts.scss';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


function UserShortcuts() {
  return (
    <div className="userShortcuts">
      <Avatar
        className="userShortcuts__avatar"
        alt="Display name"
        src=""
      ></Avatar>
      <FiberManualRecordIcon className="userShortcuts__status"/>
    </div>
  )
}

export default UserShortcuts
