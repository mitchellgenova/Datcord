import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from "react-redux";
import { selectUser } from './features/userSlice';
import Popover from '@material-ui/core/Popover';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import './Message.scss'
import { selectChannelId, selectSeverId } from './features/appSlice';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    background: 'var(--discord-color-accent)'
  },
}));

function Message({timestamp, user, message, id, edited, imageUrl}) {
  const currentUser = useSelector(selectUser);
  const serverId = useSelector(selectSeverId);
  const channelId = useSelector(selectChannelId);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [input, setInput] = React.useState(message);
  const [editMessageBoolean, setEditMessageBoolean] = React.useState(false);
  const classes = useStyles();
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (editMessageBoolean) {
      inputRef.current.focus();
    }
  }, [editMessageBoolean]);

  let docRef = db.collection("servers").doc(serverId)
  .collection("channels").doc(channelId)
  .collection("messages").doc(id);

  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isMessageSender = () => {
    // Check if the user that is hovering the message, has the same user id as the person that sent the message
    return user.uid === currentUser.uid;
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const deleteMessage = () => {
    docRef.delete().then(() => {
      console.log('Message deleted');
    });
  };


  const editMessage = () => {
    handlePopoverClose();
    setEditMessageBoolean(true);
  };

  const sendEditedMessage = e => {
    e.preventDefault();
    if (input.trim() !== "") {
      docRef.update({
        message: input,
        edited: true,
      }).then(function() {
        console.log("Document successfully edited!");
      }).catch(function(error) {
        console.error("Error editing document: ", error);
      });
    }

    setEditMessageBoolean(false);
  }
  

  return (
    <React.Fragment>
      <div className="message">
        <Avatar src={user.photo} />
        <div className="message__info">
          <h4>
            {user.displayName}
            <span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span>
          </h4>
          {editMessageBoolean ? (
            <form className="message__form">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                className="message__input"
                ref={inputRef}
              />
              <button onClick={sendEditedMessage} className="chat__inputButton" type="submit">
                Send Message
              </button>
            </form>
          ):
            <React.Fragment>
              <p>{message} {edited && <span className="message__editedText">(edited)</span>}</p>
              {imageUrl && <img alt="message uploaded" src={imageUrl}></img>}
            </React.Fragment>
          } 
        </div>
        <Popover
          id="mouse-over-popover"
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div>
            <DeleteRoundedIcon className="message__delete" onClick={deleteMessage} />
            <CreateRoundedIcon className="message__edit" onClick={editMessage} />
          </div>
        </Popover>
        {isMessageSender() ? <MoreHorizIcon className="message__contextMenu" onClick={handlePopoverOpen} /> : null}
      </div>
    </React.Fragment>
  )
}

export default Message
