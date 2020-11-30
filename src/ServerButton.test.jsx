import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ServerButton from './ServerButton';


describe('ServerButton', () => {
  const mockStore = configureStore();

  test('renders server button component', () => {
    const store = mockStore();
    const { container } = render(<Provider store={store}><ServerButton /></Provider>);

    expect(container.firstChild.classList.contains('serverButton')).toBe(true)
  });
});