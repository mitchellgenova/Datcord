import React, { useEffect } from 'react';
import './App.scss';
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from './features/userSlice';
import ChannelBar from './ChannelBar';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { auth, provider } from './firebase';
import { login, logout } from './features/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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
    // do clever google login shizzz....
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  }

  return (
    <div className="app">
      {user ? (
        <React.Fragment>
          <Sidebar />
          <ChannelBar />
          <Chat />
        </React.Fragment>
      ): (
        <Login signIn={signIn} />
      )}
    </div>
  );
}

export default App;
