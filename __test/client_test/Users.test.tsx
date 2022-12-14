import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Users from '../../dist/client/pages/users.jsx';


describe('Users Page', () => {

  beforeEach(() => {
    render(<Users />);
  });

  it('should render an Add New User button', () => {
    const buttons = screen.getByRole('button');
    expect(buttons).toHaveTextContent('Add New User');
  }); 

  it('should handle a click when clicking Add New User', () => {
    const mockClick = jest.fn();
    const button = screen.getByText('Add New User');
    console.log(button);
    button.onclick = mockClick;
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
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
});


