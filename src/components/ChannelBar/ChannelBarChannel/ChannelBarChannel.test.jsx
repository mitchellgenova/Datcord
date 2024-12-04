import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import ChannelBarChannel from '.';


describe('ChannelBarChannel', () => {
  const mockStore = configureStore();

  test('renders channel bar channel component', () => {
    const initialState = {
      app: {
        channelName: 'someChannelName',
        channelId: 'someChannelId'
      }
    };

    const store = mockStore(initialState);
    const { container } = render(<Provider store={store}><ChannelBarChannel /></Provider>);
  
    expect(container.firstChild.classList.contains('channelBarChannel')).toBe(true)
  });
});