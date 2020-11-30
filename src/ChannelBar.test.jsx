import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import ChannelBar from './ChannelBar';


describe('ChannelBar', () => {
  const mockStore = configureStore();

  test('renders channel bar component', () => {
    const initialState = {
      user: {
        user: {
          photo: 'somePhoto',
          uid: 'someUid'
        }
      },
      app: {
        serverId: 'someServerId',
        serverName: 'someServerName',
        channelId: 'someChannelId'
      }
    };

    const store = mockStore(initialState);
    const { container } = render(<Provider store={store}><ChannelBar /></Provider>);
  
    expect(container.firstChild.classList.contains('channelBar')).toBe(true)
  });
});