import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';


describe('Login', () => {
  test('renders login component', () => {
    const { container } = render(<Login />);
  
    expect(container.firstChild.classList.contains('login')).toBe(true)
  });
});