import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import { useSelector } from "react-redux";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import GifIcon from '@material-ui/icons/Gif';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { selectChannelId, selectChannelName, selectSeverId } from './features/appSlice';
import { selectUser } from './features/userSlice';
import Message from './Message';
import './Chat.scss';
import db from './firebase';
import firebase, { app } from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import handleUploadStart from './firebase';
import handleUploadSuccess from './firebase';
import App from './firebase';


function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const serverId = useSelector(selectSeverId);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (serverId && channelId) {
      db.collection("servers")
      .doc(serverId)
      .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp")
        .onSnapshot((snapshot) => 
          setMessages(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
          })))
        );
    }
  }, [serverId, channelId]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = e => {
    e.preventDefault();
    if (input.trim() !== "") {
      db.collection('servers').doc(serverId).collection("channels").doc(channelId).collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user,
      });
    }

    setInput("");
  }


  const fileUpload = () => {
    
  }

  return (
    <div className="chat">
      
      <ChatHeader channelName={channelName} />
      
      <div className="chat__messages">
          {messages.map((message) => (
            <Message
              timestamp={message.data.timestamp}
              message={message.data.message}
              user={message.data.user}
              edited={message.data.edited}
              id={message.id}
              key={message.id}
              // file={App.state.image}
            />
          ))}
          <div ref={messagesEndRef} />
      </div>
      
      <div className="chat__input">
      <FileUploader
          accept="image/*"
          name='image'
          storageRef={firebase.storage().ref('images')}
          onUploadStart={handleUploadStart}
          onUploadSuccess={handleUploadSuccess}
        />
        <form className="chat__form">
          <input
            value={input}
            disabled={!channelId}
            onChange={e => setInput(e.target.value)}
            className="chat__formInput"
            placeholder={`Message #${channelName}`}
          />
          <button onClick={sendMessage} className="chat__inputButton" type="submit">
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <SendRoundedIcon onClick={sendMessage} className="chat__icon"
            Send Message
          />
          <GifIcon className="chat__icon" />
          <EmojiEmotionsIcon className="chat__icon" />
        </div>
      </div>
    </div>
  )
}

export default Chat
