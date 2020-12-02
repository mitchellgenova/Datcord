import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';


describe('Login', () => {
  test('renders login component', () => {
    const { container } = render(<Login />);
  
    expect(container.firstChild.classList.contains('login')).toBe(true)
  });

  const Button = ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  )

  test('handles button click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('loads items eventually', async () => {
    const signIn = jest.fn();
    const { getByText } = render(<Login signIn={signIn} />)
  
    // Click button
    const button = getByText('Sign In');
    fireEvent.click(button);

    expect(signIn).toHaveBeenCalledTimes(1);
  })
});