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
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress';


function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const serverId = useSelector(selectSeverId);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [showSpinner, setShowSpinner] = useState(false);

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
    if (input.trim() !== "" || imageUrl) {
      db.collection('servers').doc(serverId).collection("channels").doc(channelId).collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user,
        imageUrl: imageUrl,
      });
    }

    setInput("");
    setImageUrl("");
  }

  const clearImageUrl = () => {
    setImageUrl("");
  }

  const handleUploadStart = () => {
    setShowSpinner(true);
  }

  const handleUploadSuccess = filename => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        setImageUrl(url);
      });
      setShowSpinner(false);
  };

  const handleUploadError = () => {
    setShowSpinner(false);
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
            imageUrl={message.data.imageUrl}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat__input">
        <label>
          <AddCircleRoundedIcon/>
          <FileUploader
            accept="image/*"
            storageRef={firebase.storage().ref('images')}
            onUploadStart={handleUploadStart}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            randomizeFilename
            hidden
            disabled={!channelId}
          />
        </label>
        {showSpinner && <CircularProgress className="chat__spinnerProgress" color="secondary"/>}
        {imageUrl && 
          <React.Fragment>
            <img className="chat__imagePreview" alt="preview" src={imageUrl}></img>
            <ClearIcon onClick={clearImageUrl}/>
          </React.Fragment>
        }
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
          <SendRoundedIcon onClick={sendMessage} className="chat__icon"/>
          <GifIcon className="chat__icon" />
          <EmojiEmotionsIcon className="chat__icon" />
        </div>
      </div>
    </div>
  )
}

export default Chat
