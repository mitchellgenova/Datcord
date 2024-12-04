import React, { useEffect } from 'react';
import './index.scss';
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from '../stores/userSlice';
import ChannelBar from '../components/ChannelBar/ChannelBar';
import Sidebar from '../components/Sidebar/Sidebar';
import Chat from '../components/Chat/Chat';
import Login from '../components/Login/Login';
import { auth, provider } from '../config/firebase';
import { login, logout } from '../stores/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = !!user;

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch]);

  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  }

  return (
    <div className="app">
      {isAuthenticated && (
        <React.Fragment>
          <Sidebar />
          <ChannelBar />
          <Chat />
        </React.Fragment>
      )}
      {!isAuthenticated && (
        <Login signIn={signIn} />
      )}
    </div>
  );
}

export default App;
