import 'whatwg-fetch';
import * as React from 'react';
import '@testing-library/jest-dom';
import App from '../../dist/client/App.jsx';
import { MemoryRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import Login from '../../src/client/pages/login.jsx';

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

  it('should respond with error if login with invalid input', () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const errorText = document.getElementsByClassName('login-input');
    console.log(errorText);
    expect(errorText[0]).toContain(
      'Invalid username/password please try again'
    );
  });

  // xit('should handle a user inputting changes into an input form', () => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const component:any = ReactTestUtils.renderIntoDocument(<Login setApiKey={function (): void {
  //     throw new Error('Function not implemented.');
  //   } } apiKey={''} setPgUri={function (): void {
  //     throw new Error('Function not implemented.');
  //   } } pgUri={''} />);
  //   const input: HTMLInputElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input')
  //   ReactTestUtils.Simulate.change(input, { target: { value: 'test'}});
  //   expect(input.value).toBe('test');
  // });  

});