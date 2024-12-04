import React from 'react';
import App from './App';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';


describe('MyComponent', () => {
  const mockStore = configureStore();

  test('renders the app component when there is no user', () => {
    const initialState = {
      user: {
        user: null,
      },
      app: {
        serverId: 'someServerId',
        serverName: 'someServerName',
        channelId: 'someChannelId'
      }
    };

    const store = mockStore(initialState);
    const { container } = render(<Provider store={store}><App /></Provider>);
  
    expect(container.firstChild.firstChild.classList.contains('login')).toBe(true)
  });

  // test('renders the app component when there is a user', () => {
  //   const initialState = {
  //     user: {
  //       user: 'someUser',
  //     },
  //     app: {
  //       serverId: 'someServerId',
  //       serverName: 'someServerName',
  //       channelId: 'someChannelId'
  //     }
  //   };

  //   const store = mockStore(initialState);
  //   const { container } = render(<Provider store={store}><App /></Provider>);
  
  //   expect(container.firstChild.firstChild.classList.contains('login')).toBe(false);
  // });
});