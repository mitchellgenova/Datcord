import React from 'react';
import ChatHeader from './ChatHeader';
import './Chat.scss';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';

function Chat() {
  return (
    <div className="chat">
      <ChatHeader />

      <div className="chat__messages">
        <Message />
        <Message />
        <Message />
      </div>

      <div className="chat__input">
        <AddCircleRoundedIcon />
        <form className="chat__form">
          <input className="chat__formInput" placeholder={`Message #TestChannel`}/>
          <button className="chat__inputButton" type="submit">
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon className="chat__icon" />
          <GifIcon className="chat__icon" />
          <EmojiEmotionsIcon className="chat__icon" />
        </div>
      </div>
    </div>
  )
}

export default Chat
