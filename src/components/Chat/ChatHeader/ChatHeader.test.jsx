import React from 'react';
import { render } from '@testing-library/react';
import ChatHeader from './ChatHeader';


describe('ChatHeader', () => {
  test('renders chat header component', () => {
    const { container } = render(<ChatHeader />);
  
    expect(container.firstChild.classList.contains('chatHeader')).toBe(true)
  });
});