import 'whatwg-fetch';
import * as React from 'react';
import '@testing-library/jest-dom';
import App from '../../dist/client/App.jsx';
import { MemoryRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen, } from '@testing-library/react';
import Signup from '../../dist/client/pages/signup.jsx';

describe('Login Page', () => {

  beforeEach(() => {
    render(<App />);
  });

  it('should have input fields for username and password', () => {
    const username = screen.getByPlaceholderText('username');
    const password = screen.getAllByPlaceholderText('password');
    expect(username);
    expect(password);    
  });

  it('should have buttons for login and signup', () => {
    const login = screen.getByText('LOGIN');
    const signup = screen.getByText('Signup');
    expect(login);
    expect(signup);    
  });  

  it('should respond with click if Signup button is clicked', () => {
    const mockClick = jest.fn();
    const { getByTestId } = render(
      <Router>
        <Signup setApiKey={function (): void {
          throw new Error('Function not implemented.');
        } } apiKey={''} openSignup={false} setOpenSignup={function (): void {
          throw new Error('Function not implemented.');
        } } />
      </Router>);   
    const button = getByTestId('test-signup-button');
    button.onclick = mockClick;
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should respond with click if Login button is clicked', () => {
    const mockClick = jest.fn();
    const button = screen.getByTestId('test-login-button');
    button.onclick = mockClick;
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

});

// xit('should handle a user inputting changes into an input form', () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const component:any = ReactTestUtils.renderIntoDocument(<Login setApiKey={function (): void {
//     throw new Error('Function not implemented.');
//   } } apiKey={''} setPgUri={function (): void {
//     throw new Error('Function not implemented.');
//   } } pgUri={''} />);
// eslint-disable-next-line indent
//   const input: HTMLInputElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input')
//   ReactTestUtils.Simulate.change(input, { target: { value: 'test'}});
//   expect(input.value).toBe('test');
// });  

