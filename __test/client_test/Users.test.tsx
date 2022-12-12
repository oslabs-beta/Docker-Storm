import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Users from '../../dist/client/pages/users.jsx';

describe('Users Page', () => {

  beforeEach(() => {
    render(<Users />);
  });

  it('should render an Add New User button', () => {
    const buttons = screen.getByRole('button');
    expect(buttons).toHaveTextContent('Add New User');
  }); 

  it('should have four input fields to add new user' , () => {
    const username = screen.getByPlaceholderText('Username');
    const role = screen.getByPlaceholderText('Role');
    const password = screen.getByPlaceholderText('Password');
    const confirm = screen.getByPlaceholderText('Confirm Password');
    expect(username);
    expect(role);
    expect(password);
    expect(confirm);    
  });

  it('should render a list of all the users', () => {
    const list = screen.getByText('List of all users');
    expect(list).toBeInTheDocument();
  });

  // xit('should handle a user inputting changes into an input form', () => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const component:any = ReactTestUtils.renderIntoDocument(<Users />);
  //   const input: Element = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input')
  //   ReactTestUtils.Simulate.change(input, { target: { value: 'test'}});
  //   expect(input.value).toBe('test');
  // });

});

