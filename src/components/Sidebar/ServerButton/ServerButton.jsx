import React from 'react'
import { useDispatch } from "react-redux";
import './ServerButton.scss'
import { setServerInfo } from '../../../stores/appSlice';


function ServerButton({id, name, image}) {
  const dispatch = useDispatch();
  const defaultImageSrc = "https://www.vhv.rs/dpng/d/26-261299_discord-icon-png-transparent-png.png";

  const dispatchServerInfo = () => {
    dispatch(
      setServerInfo({
        serverId: id,
        serverName: name,
      }
    ))
  }
  return (
    <div className="serverButton" onClick={dispatchServerInfo}>
      <div className="serverButton__serverContainer">
        <img className="serverButton__serverImage" alt="Server icon" src={image || defaultImageSrc}></img>
      </div>
    </div>
  )
}

export default ServerButton
