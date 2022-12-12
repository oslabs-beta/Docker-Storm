import 'whatwg-fetch';
import * as React from 'react';
import '@testing-library/jest-dom';
import App from '../../dist/client/App.jsx';
import { fireEvent, render, screen, } from '@testing-library/react';


describe('Login Page', () => {

  beforeEach(() => {
    render(<App />);
  });

  it('should have input fields for username and password', () => {
    const username = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');
    expect(username);
    expect(password);    
  });

  it('should have buttons for login and signup', () => {
    const login = screen.getByText('LOGIN');
    const signup = screen.getByText('SIGNUP');
    expect(login);
    expect(signup);    
  });  

  it('should respond with click if Signup button is clicked', () => {
    const mockClick = jest.fn();
    const button = screen.getByTestId('sign-up button');
    button.onclick = mockClick;
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should respond with click if Login button is clicked', () => {
    const mockClick = jest.fn();
    const button = screen.getByTestId('login button');
    button.onclick = mockClick;
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });



  // it('should handle a user inputting changes into an input form', () => {
  // const component:any = ReactTestUtils.renderIntoDocument(<Login setApiKey={function (): void {
  //   throw new Error('Function not implemented.');
  // } } apiKey={''} setPgUri={function (): void {
  //   throw new Error('Function not implemented.');
  // } } pgUri={''} />);
  // const input: HTMLInputElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input')
  // ReactTestUtils.Simulate.change(input, { target: { value: 'test'}});
  // expect(input.value).toBe('test');.
  //   render(
  //     <Router>
  //       <Login setApiKey={function (): void {
  //         throw new Error('Function not implemented.');
  //       } } setGrafUrl={function (): void {
  //         throw new Error('Function not implemented.');
  //       } } apiKey={''} openSignup={false} setOpenSignup={function (): void {
  //         throw new Error('Function not implemented.');
  //       } } />
  //     </Router>);
  //   const inputField = document.getElementById('login-form') as HTMLInputElement;
  //   const changeEvent = new Event('change');
  //   Object.defineProperty(changeEvent, 'target', {
  //     value: {value: 'test input'}
  //   });
  //   console.log('input field variable:', inputField);

  //   console.log('input field value before event:', inputField.value);
    
  
  //   inputField.dispatchEvent(changeEvent);
  //   console.log('input field value after event:', inputField.value);
  //   expect(inputField.value).toBe('test input');
  // });  

});