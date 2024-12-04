import React from 'react'
import { useDispatch } from "react-redux";
import './ChannelBarChannel.scss'
import { setChannelInfo } from '../../../stores/appSlice';

function ChannelBarChannel({ id, channelName }) {
  const dispatch = useDispatch()

  const dispatchChannelInfo = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName
      }
    ))
  }

  return (
    <div className="channelBarChannel" onClick={dispatchChannelInfo}>
      <h4 className="channelBarChannel__channelContainer">
        <span className="channelBarChannel__hash">#</span>
        {channelName}
      </h4>
    </div>
  )
}

export default ChannelBarChannel
